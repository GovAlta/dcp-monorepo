/**
 * Component Sync Tool
 *
 * Parses Svelte component files from ui-components and syncs their props/events/slots
 * to MCP component JSONs. Uses regex-based parsing for simplicity.
 *
 * Usage:
 *   npx tsx scripts/sync-components.ts                    # Diff report (dry run)
 *   npx tsx scripts/sync-components.ts --apply            # Apply changes
 *   npx tsx scripts/sync-components.ts --component=button # Single component
 *
 * @see /tasks/mcp/06-mcp-2.0-rebuild/TASK-BRIEFS.md Brief 12
 */

import * as fs from "fs";
import * as path from "path";

// =============================================================================
// Configuration
// =============================================================================

const UI_COMPONENTS_PATH =
  "/Users/tom/Projects/Design-system/ui-components/libs/web-components/src/components";
const MCP_COMPONENTS_PATH =
  "/Users/tom/Projects/Design-system/goa-design-system-mcp/data/development/components";

// =============================================================================
// Types
// =============================================================================

interface ParsedProp {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
  allowedValues?: string[];
  deprecated?: boolean;
  isBooleanProp?: boolean;
}

interface ParsedEvent {
  name: string;
  payload?: string;
}

interface ParsedSlot {
  name: string;
}

interface ParsedComponent {
  name: string;
  tagName: string;
  props: ParsedProp[];
  events: ParsedEvent[];
  slots: ParsedSlot[];
  customElementProps?: Record<string, any>; // Props defined in svelte:options
}

interface MCPProp {
  name: string;
  type: string;
  required: boolean;
  default?: any;
  description?: string;
  frameworks?: {
    webComponent: string;
    react: string;
    angular: string;
  };
}

interface MCPEvent {
  name: string;
  type?: string;
  payload?: string;
  description?: string;
  frameworks?: Record<string, string>;
}

interface MCPSlot {
  name: string;
  description?: string;
}

interface MCPComponent {
  name: string;
  category?: string;
  summary?: string;
  import?: string;
  customElement: {
    tagName: string;
    reactName: string;
    angularSelector: string;
  };
  props: MCPProp[];
  events: MCPEvent[];
  slots: MCPSlot[];
  criticalNotes?: string[];
  commonMistakes?: any[];
  strictPropertyEnforcement?: Record<string, any>;
  basicUsage?: Record<string, string>;
  relatedExamples?: string[];
  relatedComponents?: string[];
  [key: string]: any; // Allow other fields
}

interface PropDiff {
  type: "added" | "removed" | "changed";
  name: string;
  source?: ParsedProp;
  mcp?: MCPProp;
  changes?: string[];
}

interface EventDiff {
  type: "added" | "removed" | "changed";
  name: string;
  source?: ParsedEvent;
  mcp?: MCPEvent;
}

interface SlotDiff {
  type: "added" | "removed";
  name: string;
}

interface ComponentDiff {
  componentName: string;
  propDiffs: PropDiff[];
  eventDiffs: EventDiff[];
  slotDiffs: SlotDiff[];
  hasChanges: boolean;
}

// =============================================================================
// Svelte Parser (Regex-based)
// =============================================================================

/**
 * Parse a Svelte component file and extract props, events, and slots
 */
function parseSvelteComponent(filePath: string): ParsedComponent | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const componentName = path.basename(path.dirname(filePath));

  // Extract tag name from svelte:options
  const tagName = extractTagName(content);
  if (!tagName) {
    return null; // Not a custom element
  }

  // Extract props from svelte:options if defined there
  const customElementProps = extractCustomElementProps(content);

  // Extract validators (for allowed values)
  const validators = extractValidators(content);

  // Extract props (pass componentName for contextual filtering)
  const props = extractProps(content, validators, customElementProps, componentName);

  // Extract events (filter internal events with :: in name)
  const events = extractEvents(content).filter(e => !isInternalEvent(e.name));

  // Extract slots
  const slots = extractSlots(content);

  return {
    name: componentName,
    tagName,
    props,
    events,
    slots,
    customElementProps,
  };
}

/**
 * Extract the custom element tag name from svelte:options
 */
function extractTagName(content: string): string | null {
  // Pattern 1: customElement="goa-tag"
  const simpleMatch = content.match(
    /customElement\s*=\s*["']([^"']+)["']/
  );
  if (simpleMatch) {
    return simpleMatch[1];
  }

  // Pattern 2: customElement={{ tag: "goa-tag", ... }}
  const objectMatch = content.match(
    /customElement\s*=\s*\{\{\s*tag:\s*["']([^"']+)["']/
  );
  if (objectMatch) {
    return objectMatch[1];
  }

  return null;
}

/**
 * Extract props defined in svelte:options customElement={{ props: {...} }}
 */
function extractCustomElementProps(
  content: string
): Record<string, any> | undefined {
  // Match the props object in svelte:options
  const optionsMatch = content.match(
    /<svelte:options[\s\S]*?customElement\s*=\s*\{\{[\s\S]*?props:\s*\{([\s\S]*?)\}\s*,?\s*\}\}/
  );
  if (!optionsMatch) return undefined;

  const propsBlock = optionsMatch[1];
  const props: Record<string, any> = {};

  // Parse individual prop definitions like: propName: { type: "String", attribute: "prop-name" }
  const propMatches = propsBlock.matchAll(
    /(\w+):\s*\{([^}]+)\}/g
  );
  for (const match of propMatches) {
    const propName = match[1];
    const propDef = match[2];
    props[propName] = {
      attribute: propDef.match(/attribute:\s*["']([^"']+)["']/)?.[1],
      type: propDef.match(/type:\s*["']?(\w+)["']?/)?.[1],
      reflect: propDef.includes("reflect: true"),
    };
  }

  return Object.keys(props).length > 0 ? props : undefined;
}

/**
 * Extract typeValidator definitions to get allowed values for props
 */
function extractValidators(
  content: string
): Map<string, { values: string[]; deprecated?: string[] }> {
  const validators = new Map<
    string,
    { values: string[]; deprecated?: string[] }
  >();

  // Pattern: const [Name, validateName] = typeValidator(
  //   "description",
  //   ["value1", "value2"],
  //   { options }
  // );
  // Must handle multiline and various formatting
  const validatorMatches = content.matchAll(
    /const\s+\[(\w+),\s*validate\w+\]\s*=\s*typeValidator\s*\([\s\S]*?\[([\s\S]*?)\][\s\S]*?\);/g
  );

  for (const match of validatorMatches) {
    const name = match[1];
    const valuesStr = match[2];

    // Extract values from the array
    const values = valuesStr
      .split(",")
      .map((v) => v.trim().replace(/["']/g, ""))
      .filter((v) => v.length > 0);

    // Check for deprecated values in the full match
    const fullMatch = match[0];
    let deprecated: string[] | undefined;
    const deprecatedMatch = fullMatch.match(/deprecated:\s*\[([\s\S]*?)\]/);
    if (deprecatedMatch) {
      deprecated = deprecatedMatch[1]
        .split(",")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0);
    }

    validators.set(name, { values, deprecated });
  }

  // Also extract local type definitions: type TypeName = (typeof ValidatorName)[number];
  const typeAliasMatches = content.matchAll(
    /type\s+(\w+)\s*=\s*\(\s*typeof\s+(\w+)\s*\)\s*\[\s*number\s*\]/g
  );
  for (const match of typeAliasMatches) {
    const typeName = match[1];
    const validatorName = match[2];
    const validatorData = validators.get(validatorName);
    if (validatorData) {
      // Map the type name to the same values
      validators.set(typeName, validatorData);
    }
  }

  return validators;
}

/**
 * Extract exported props from Svelte component
 * @param componentName - Name of the component (used for filtering contextual internal props)
 */
function extractProps(
  content: string,
  validators: Map<string, { values: string[]; deprecated?: string[] }>,
  customElementProps?: Record<string, any>,
  componentName?: string
): ParsedProp[] {
  const props: ParsedProp[] = [];

  // Match: export let propName: Type = defaultValue;
  // Also handles: export let propName = defaultValue;
  const propMatches = content.matchAll(
    /export\s+let\s+(\w+)(?:\s*:\s*([^=;]+?))?(?:\s*=\s*([^;]+?))?;/g
  );

  for (const match of propMatches) {
    const rawName = match[1];
    let type = match[2]?.trim() || "any";
    const defaultStr = match[3]?.trim();

    // Skip private props (starting with _)
    if (rawName.startsWith("_")) continue;

    // Skip internal props (version, publicFormSummaryOrder, etc.)
    if (componentName && isInternalProp(rawName, componentName)) continue;

    // Convert to proper camelCase name for React/Angular usage
    const name = toReactPropName(rawName);

    // Parse the default value
    let defaultValue: string | null = null;
    if (defaultStr !== undefined) {
      defaultValue = parseDefaultValue(defaultStr);
    }

    // Check if this prop has a validator for allowed values
    let allowedValues: string[] | undefined;

    // Direct match on type name (e.g., ButtonType, Size, Variant)
    if (validators.has(type)) {
      const validatorData = validators.get(type)!;
      allowedValues = validatorData.values;
      type = allowedValues.map((v) => `"${v}"`).join(" | ");
    } else {
      // Try matching patterns: Type -> Types, Size -> Sizes
      for (const [validatorName, validatorData] of validators) {
        if (
          type === validatorName ||
          type.toLowerCase() === validatorName.toLowerCase()
        ) {
          allowedValues = validatorData.values;
          type = allowedValues.map((v) => `"${v}"`).join(" | ");
          break;
        }
      }
    }

    // Handle special types
    if (type.includes("GoAIconType") || type.includes("GoaIconType")) {
      type = "GoAIconType";
    } else if (type === "Spacing" || type.includes("Spacing")) {
      type = "Spacing";
    } else if (type.includes("Record<")) {
      // Keep Record types as-is
    } else if (type === "string" || type === "number" || type === "boolean") {
      // Keep primitive types as-is
    }

    // Detect boolean props: string type with "true"/"false" default
    // These are serialized booleans in web components - show as boolean for devs
    let isBooleanProp = false;
    if (type === "string" && (defaultValue === "true" || defaultValue === "false")) {
      type = "boolean";
      isBooleanProp = true;
      // Convert string default to actual boolean
      defaultValue = defaultValue === "true" ? "true" : "false";
    }

    // Check for inline union types that aren't from validators
    if (!allowedValues && type.includes("|") && !type.includes("typeof")) {
      allowedValues = type
        .split("|")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0 && !v.includes("("));
    }

    // Check if deprecated (look for @deprecated comment above)
    const deprecatedPattern = new RegExp(
      `(?:\\/\\/|\\*)\\s*@deprecated[^\\n]*\\n[\\s\\S]*?export\\s+let\\s+${rawName}`,
      "m"
    );
    const deprecated = deprecatedPattern.test(content);

    props.push({
      name,
      type: cleanType(type),
      required: defaultStr === undefined,
      default: defaultValue,
      allowedValues,
      deprecated,
      isBooleanProp,
    });
  }

  // Add props from customElement definition that aren't already in the list
  // Also filter internal props from customElement definition
  if (customElementProps) {
    for (const [propName, propDef] of Object.entries(customElementProps)) {
      // Skip internal props
      if (componentName && isInternalProp(propName, componentName)) continue;

      const camelCaseName = toReactPropName(propName);
      if (!props.find((p) => p.name.toLowerCase() === camelCaseName.toLowerCase())) {
        props.push({
          name: camelCaseName,
          type: propDef.type?.toLowerCase() || "string",
          required: false,
          default: null,
        });
      }
    }
  }

  return props;
}

/**
 * Clean up a type string for display
 */
function cleanType(type: string): string {
  return type
    .replace(/\s+/g, " ")
    .replace(/\(\s*typeof\s+\w+\s*\)\s*\[\s*number\s*\]/g, "")
    .trim();
}

/**
 * Parse a default value string
 */
function parseDefaultValue(str: string): string | null {
  if (str === "null" || str === "undefined") return null;
  if (str.startsWith('"') || str.startsWith("'")) {
    return str.replace(/["']/g, "");
  }
  if (str === "true" || str === "false") return str;
  if (!isNaN(Number(str))) return str;
  if (str === "{}") return "{}";
  if (str === "[]") return "[]";
  return str;
}

/**
 * Extract custom events dispatched by the component
 */
function extractEvents(content: string): ParsedEvent[] {
  const events: ParsedEvent[] = [];
  const eventNames = new Set<string>();

  // Pattern 1: dispatch(element, "_eventName", payload, options)
  const dispatchMatches = content.matchAll(
    /dispatch\s*\(\s*[^,]+,\s*["']([^"']+)["'](?:\s*,\s*([^,)]+))?/g
  );
  for (const match of dispatchMatches) {
    const eventName = match[1];
    const payload = match[2]?.trim();

    // Skip internal events (like "help-text::announce", "error::change")
    if (eventName.includes("::")) continue;

    if (!eventNames.has(eventName)) {
      eventNames.add(eventName);
      events.push({
        name: eventName,
        payload: payload && payload !== "null" ? payload : undefined,
      });
    }
  }

  // Pattern 2: dispatchEvent(new CustomEvent("_eventName", ...))
  const customEventMatches = content.matchAll(
    /dispatchEvent\s*\(\s*new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g
  );
  for (const match of customEventMatches) {
    const eventName = match[1];
    if (!eventNames.has(eventName)) {
      eventNames.add(eventName);
      events.push({ name: eventName });
    }
  }

  // Pattern 3: _rootEl?.dispatchEvent(new CustomEvent("_eventName", ...))
  const rootElMatches = content.matchAll(
    /_rootEl\??\s*\.?\s*dispatchEvent\s*\(\s*new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g
  );
  for (const match of rootElMatches) {
    const eventName = match[1];
    if (!eventNames.has(eventName)) {
      eventNames.add(eventName);
      events.push({ name: eventName });
    }
  }

  return events;
}

/**
 * Extract slots from the component template
 */
function extractSlots(content: string): ParsedSlot[] {
  const slots: ParsedSlot[] = [];
  const slotNames = new Set<string>();

  // Pattern: <slot name="slotName">
  const namedSlotMatches = content.matchAll(
    /<slot\s+name\s*=\s*["']([^"']+)["']/g
  );
  for (const match of namedSlotMatches) {
    const name = match[1];
    if (!slotNames.has(name)) {
      slotNames.add(name);
      slots.push({ name });
    }
  }

  // Pattern: <slot> or <slot /> (default slot)
  const defaultSlotMatch = content.match(/<slot\s*(?:\/?>|>[^<]*<\/slot>)/);
  if (defaultSlotMatch && !slotNames.has("default")) {
    slots.push({ name: "default" });
  }

  return slots;
}

// =============================================================================
// MCP JSON Loader
// =============================================================================

/**
 * Load an MCP component JSON file
 * Looks for hyphenated filename first (e.g., button-group.json), then non-hyphenated as fallback
 */
function loadMCPComponent(componentName: string): MCPComponent | null {
  // Try hyphenated filename first (preferred format)
  const hyphenatedPath = path.join(MCP_COMPONENTS_PATH, `${toKebabCase(componentName)}.json`);
  if (fs.existsSync(hyphenatedPath)) {
    const content = fs.readFileSync(hyphenatedPath, "utf-8");
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error(`Error parsing ${hyphenatedPath}:`, e);
      return null;
    }
  }

  // Fallback to non-hyphenated for backwards compatibility
  const legacyPath = path.join(MCP_COMPONENTS_PATH, `${componentName.toLowerCase()}.json`);
  if (fs.existsSync(legacyPath)) {
    const content = fs.readFileSync(legacyPath, "utf-8");
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error(`Error parsing ${legacyPath}:`, e);
      return null;
    }
  }

  return null;
}

/**
 * Save an MCP component JSON file
 * Uses hyphenated filename (e.g., button-group.json)
 */
function saveMCPComponent(component: MCPComponent): void {
  const filePath = path.join(
    MCP_COMPONENTS_PATH,
    `${toKebabCase(component.name)}.json`
  );
  const content = JSON.stringify(component, null, 2);
  fs.writeFileSync(filePath, content);
}

// =============================================================================
// Diff Generator
// =============================================================================

/**
 * Compare parsed source component with MCP component
 */
function diffComponent(
  source: ParsedComponent,
  mcp: MCPComponent | null
): ComponentDiff {
  const propDiffs: PropDiff[] = [];
  const eventDiffs: EventDiff[] = [];
  const slotDiffs: SlotDiff[] = [];

  if (!mcp) {
    // All source data is new
    for (const prop of source.props) {
      propDiffs.push({ type: "added", name: prop.name, source: prop });
    }
    for (const event of source.events) {
      eventDiffs.push({ type: "added", name: event.name, source: event });
    }
    for (const slot of source.slots) {
      slotDiffs.push({ type: "added", name: slot.name });
    }
  } else {
    // Compare props
    const mcpPropMap = new Map(mcp.props.map((p) => [p.name.toLowerCase(), p]));
    const sourcePropMap = new Map(source.props.map((p) => [p.name.toLowerCase(), p]));

    for (const sourceProp of source.props) {
      const mcpProp = mcpPropMap.get(sourceProp.name.toLowerCase());
      if (!mcpProp) {
        propDiffs.push({ type: "added", name: sourceProp.name, source: sourceProp });
      } else {
        // Check for changes
        const changes: string[] = [];

        // Compare types (normalize for comparison)
        const sourceType = normalizeType(sourceProp.type);
        const mcpType = normalizeType(mcpProp.type);
        if (sourceType !== mcpType) {
          changes.push(`type: "${mcpType}" → "${sourceType}"`);
        }

        // Compare defaults
        const sourceDefault = String(sourceProp.default ?? "");
        const mcpDefault = String(mcpProp.default ?? "");
        if (sourceDefault !== mcpDefault && sourceProp.default !== null) {
          changes.push(`default: "${mcpDefault}" → "${sourceDefault}"`);
        }

        if (changes.length > 0) {
          propDiffs.push({
            type: "changed",
            name: sourceProp.name,
            source: sourceProp,
            mcp: mcpProp,
            changes,
          });
        }
      }
    }

    // Check for removed props (in MCP but not in source)
    for (const mcpProp of mcp.props) {
      if (!sourcePropMap.has(mcpProp.name.toLowerCase())) {
        propDiffs.push({ type: "removed", name: mcpProp.name, mcp: mcpProp });
      }
    }

    // Compare events
    const mcpEventMap = new Map(mcp.events.map((e) => [e.name, e]));
    const sourceEventSet = new Set(source.events.map((e) => e.name));

    for (const sourceEvent of source.events) {
      if (!mcpEventMap.has(sourceEvent.name)) {
        eventDiffs.push({ type: "added", name: sourceEvent.name, source: sourceEvent });
      }
    }

    for (const mcpEvent of mcp.events) {
      if (!sourceEventSet.has(mcpEvent.name)) {
        eventDiffs.push({ type: "removed", name: mcpEvent.name, mcp: mcpEvent });
      }
    }

    // Compare slots
    const mcpSlotMap = new Map(mcp.slots.map((s) => [s.name, s]));
    const sourceSlotSet = new Set(source.slots.map((s) => s.name));

    for (const sourceSlot of source.slots) {
      if (!mcpSlotMap.has(sourceSlot.name)) {
        slotDiffs.push({ type: "added", name: sourceSlot.name });
      }
    }

    for (const mcpSlot of mcp.slots) {
      if (!sourceSlotSet.has(mcpSlot.name)) {
        slotDiffs.push({ type: "removed", name: mcpSlot.name });
      }
    }
  }

  return {
    componentName: source.name,
    propDiffs,
    eventDiffs,
    slotDiffs,
    hasChanges:
      propDiffs.length > 0 || eventDiffs.length > 0 || slotDiffs.length > 0,
  };
}

/**
 * Normalize a type string for comparison
 */
function normalizeType(type: string): string {
  return type
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/["']/g, "")
    .split("|")
    .map((t) => t.trim())
    .sort()
    .join(" | ");
}

// =============================================================================
// Merger
// =============================================================================

/**
 * Merge source data into MCP component
 */
function mergeComponent(
  source: ParsedComponent,
  mcp: MCPComponent | null
): MCPComponent {
  if (!mcp) {
    // Create a new MCP component
    const reactName = `Goab${capitalize(toCamelCase(source.name))}`;
    const angularSelector = `goab-${source.name}`;

    return {
      name: capitalize(toCamelCase(source.name)),
      category: "component",
      summary: "",
      import: `import { ${reactName} } from '@abgov/react-components'`,
      customElement: {
        tagName: source.tagName,
        reactName,
        angularSelector,
      },
      props: source.props.map((p) => {
        const reactPropName = toReactPropName(p.name);
        const webComponentAttr = toKebabCase(p.name);
        return {
          name: p.name,
          type: p.type,
          required: p.required,
          default: p.default,
          description: "",
          frameworks: {
            webComponent: p.isBooleanProp
              ? `${webComponentAttr}="true"`
              : `${webComponentAttr}="..."`,
            react: p.isBooleanProp
              ? `${reactPropName}={true}`
              : `${reactPropName}={...}`,
            angular: p.isBooleanProp
              ? `[${reactPropName}]="true"`
              : `[${reactPropName}]="..."`,
          },
        };
      }),
      events: source.events.map((e) => {
        const eventName = e.name.replace(/^_/, "");
        const reactEventName = `on${capitalize(eventName)}`;
        return {
          name: e.name,
          type: "(event) => void",
          description: "",
          frameworks: {
            webComponent: `${e.name} custom event`,
            react: `${reactEventName} prop`,
            angular: `(${reactEventName}) event binding`,
          },
        };
      }),
      slots: source.slots.map((s) => ({
        name: s.name,
        description: "",
      })),
      criticalNotes: [],
      commonMistakes: [],
      basicUsage: {
        webComponent: "",
        react: "",
        angular: "",
      },
      relatedExamples: [],
      relatedComponents: [],
    };
  }

  // Update existing MCP component
  const updated = { ...mcp };

  // Update props (preserve descriptions and other metadata)
  const mcpPropMap = new Map(mcp.props.map((p) => [p.name.toLowerCase(), p]));
  updated.props = source.props.map((sourceProp) => {
    const existingProp = mcpPropMap.get(sourceProp.name.toLowerCase());
    const reactPropName = toReactPropName(sourceProp.name);
    const webComponentAttr = toKebabCase(sourceProp.name);

    return {
      name: sourceProp.name,
      type: sourceProp.type,
      required: sourceProp.required,
      default: sourceProp.default,
      description: existingProp?.description || "",
      frameworks: {
        webComponent: sourceProp.isBooleanProp
          ? `${webComponentAttr}="true"`
          : `${webComponentAttr}="..."`,
        react: sourceProp.isBooleanProp
          ? `${reactPropName}={true}`
          : `${reactPropName}={...}`,
        angular: sourceProp.isBooleanProp
          ? `[${reactPropName}]="true"`
          : `[${reactPropName}]="..."`,
      },
    };
  });

  // Update events (preserve descriptions and framework mappings)
  const mcpEventMap = new Map(mcp.events.map((e) => [e.name, e]));
  updated.events = source.events.map((sourceEvent) => {
    const existingEvent = mcpEventMap.get(sourceEvent.name);
    const eventName = sourceEvent.name.replace(/^_/, "");
    const reactEventName = `on${capitalize(eventName)}`;

    return {
      name: sourceEvent.name,
      type: existingEvent?.type || "(event) => void",
      payload: sourceEvent.payload,
      description: existingEvent?.description || "",
      frameworks: {
        webComponent: `${sourceEvent.name} custom event`,
        react: `${reactEventName} prop`,
        angular: `(${reactEventName}) event binding`,
      },
    };
  });

  // Update slots (preserve descriptions)
  const mcpSlotMap = new Map(mcp.slots.map((s) => [s.name, s]));
  updated.slots = source.slots.map((sourceSlot) => {
    const existingSlot = mcpSlotMap.get(sourceSlot.name);
    return {
      name: sourceSlot.name,
      description: existingSlot?.description || "",
    };
  });

  // Update customElement tag name
  updated.customElement.tagName = source.tagName;

  return updated;
}

// =============================================================================
// Utilities
// =============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((part, index) => (index === 0 ? part : capitalize(part)))
    .join("");
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Convert prop name to React naming convention
 * e.g., leadingicon -> leadingIcon, arialabel -> ariaLabel
 */
function toReactPropName(name: string): string {
  // Handle known patterns
  const mappings: Record<string, string> = {
    leadingicon: "leadingIcon",
    trailingicon: "trailingIcon",
    arialabel: "ariaLabel",
    arialabelledby: "ariaLabelledBy",
    testid: "testId",
    maxwidth: "maxWidth",
    maxheight: "maxHeight",
    maxlength: "maxLength",
    minlength: "minLength",
    autocomplete: "autoComplete",
    autocapitalize: "autoCapitalize",
    textalign: "textAlign",
    calloutvariant: "calloutVariant",
    handletrailingiconclick: "handleTrailingIconClick",
    trailingiconarialabel: "trailingIconAriaLabel",
    disableglobalclosepopover: "disableGlobalClosePopover",
    labelsize: "labelSize",
    helptext: "helpText",
    errormessage: "errorMessage",
    inputmode: "inputMode",
    readonly: "readOnly",
    tabindex: "tabIndex",
    steppertext: "stepperText",
    counterstep: "counterStep",
    relativecontent: "relativeContent",
    mindate: "minDate",
    maxdate: "maxDate",
    headingsize: "headingSize",
    maxcount: "maxCount",
    relativeto: "relativeTo",
    padded: "padded",
  };

  return mappings[name.toLowerCase()] || name;
}

/**
 * Internal props that should be filtered out (not useful for developers)
 * All lowercase for case-insensitive matching
 */
const INTERNAL_PROPS = new Set([
  "version",
  "publicformsummaryorder",
  "action",
  "actionarg",
  "actionargs",
  "type", // Only for FormItem - it's an internal prop used by public forms
  "name", // Only for FormItem - ditto
]);

/**
 * Props that are contextual - only filter if component is specific type
 * Key is the directory name (e.g., "form-item" not "formitem")
 */
const CONTEXTUAL_INTERNAL_PROPS: Record<string, string[]> = {
  "form-item": ["type", "name"],
};

/**
 * Check if a prop should be filtered out
 */
function isInternalProp(propName: string, componentName: string): boolean {
  const lowerName = propName.toLowerCase();
  const lowerComponent = componentName.toLowerCase();

  // Check global internal props (excluding type and name which are contextual)
  if (INTERNAL_PROPS.has(lowerName) && lowerName !== "type" && lowerName !== "name") {
    return true;
  }

  // Check contextual internal props
  const contextualProps = CONTEXTUAL_INTERNAL_PROPS[lowerComponent];
  if (contextualProps && contextualProps.includes(lowerName)) {
    return true;
  }

  return false;
}

/**
 * Check if an event should be filtered out
 * Internal events use namespaced patterns like:
 * - "component::action" (double colon)
 * - "component:type:action" (colon-separated namespaces)
 */
function isInternalEvent(eventName: string): boolean {
  // Filter events with double colon (e.g., "help-text::announce")
  if (eventName.includes("::")) return true;

  // Filter namespaced events with multiple colons (e.g., "sidemenu:current:change")
  // These are internal component communication events
  const colonCount = (eventName.match(/:/g) || []).length;
  if (colonCount >= 2) return true;

  return false;
}

// =============================================================================
// Report Generation
// =============================================================================

function printDiffReport(diffs: ComponentDiff[]): void {
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║                  Component Sync Report                        ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  let totalAdded = 0;
  let totalRemoved = 0;
  let totalChanged = 0;
  let componentsWithChanges = 0;

  for (const diff of diffs) {
    if (!diff.hasChanges) continue;

    componentsWithChanges++;
    console.log(`\n📦 ${diff.componentName}`);
    console.log("─".repeat(50));

    // Props
    for (const propDiff of diff.propDiffs) {
      if (propDiff.type === "added") {
        totalAdded++;
        const prop = propDiff.source!;
        console.log(
          `  + prop: ${prop.name} (type: ${prop.type}${prop.default ? `, default: "${prop.default}"` : ""}) [NEW]`
        );
      } else if (propDiff.type === "removed") {
        totalRemoved++;
        console.log(`  - prop: ${propDiff.name} [REMOVED]`);
      } else if (propDiff.type === "changed") {
        totalChanged++;
        console.log(`  ~ prop: ${propDiff.name}`);
        for (const change of propDiff.changes!) {
          console.log(`      ${change}`);
        }
      }
    }

    // Events
    for (const eventDiff of diff.eventDiffs) {
      if (eventDiff.type === "added") {
        totalAdded++;
        console.log(`  + event: ${eventDiff.name} [NEW]`);
      } else if (eventDiff.type === "removed") {
        totalRemoved++;
        console.log(`  - event: ${eventDiff.name} [REMOVED]`);
      }
    }

    // Slots
    for (const slotDiff of diff.slotDiffs) {
      if (slotDiff.type === "added") {
        totalAdded++;
        console.log(`  + slot: ${slotDiff.name} [NEW]`);
      } else if (slotDiff.type === "removed") {
        totalRemoved++;
        console.log(`  - slot: ${slotDiff.name} [REMOVED]`);
      }
    }
  }

  // Summary
  console.log("\n" + "═".repeat(60));
  console.log(
    `Summary: ${diffs.length} components scanned, ${componentsWithChanges} have changes`
  );
  console.log(
    `         ${totalAdded} additions, ${totalRemoved} removals, ${totalChanged} modifications`
  );
  console.log("═".repeat(60));

  if (componentsWithChanges > 0) {
    console.log("\nRun with --apply to update MCP component JSONs");
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const applyChanges = args.includes("--apply");
  const componentArg = args.find((a) => a.startsWith("--component="));
  const targetComponent = componentArg?.split("=")[1];

  // Get list of component directories
  const componentDirs = fs.readdirSync(UI_COMPONENTS_PATH);

  const diffs: ComponentDiff[] = [];
  const mergedComponents: MCPComponent[] = [];

  for (const componentDir of componentDirs) {
    // Filter to single component if specified
    if (targetComponent && componentDir !== targetComponent) continue;

    const componentPath = path.join(UI_COMPONENTS_PATH, componentDir);
    if (!fs.statSync(componentPath).isDirectory()) continue;

    // Find the main Svelte file (capitalized name)
    const svelteFileName = `${capitalize(toCamelCase(componentDir))}.svelte`;
    const svelteFilePath = path.join(componentPath, svelteFileName);

    if (!fs.existsSync(svelteFilePath)) {
      // Try alternate names
      const files = fs.readdirSync(componentPath);
      const sveltefile = files.find((f) => f.endsWith(".svelte"));
      if (!sveltefile) continue;

      const altPath = path.join(componentPath, sveltefile);
      const parsed = parseSvelteComponent(altPath);
      if (!parsed) continue;

      const mcp = loadMCPComponent(componentDir);
      const diff = diffComponent(parsed, mcp);
      diffs.push(diff);

      if (applyChanges && diff.hasChanges) {
        const merged = mergeComponent(parsed, mcp);
        mergedComponents.push(merged);
      }
    } else {
      const parsed = parseSvelteComponent(svelteFilePath);
      if (!parsed) continue;

      const mcp = loadMCPComponent(componentDir);
      const diff = diffComponent(parsed, mcp);
      diffs.push(diff);

      if (applyChanges && diff.hasChanges) {
        const merged = mergeComponent(parsed, mcp);
        mergedComponents.push(merged);
      }
    }
  }

  // Print report
  printDiffReport(diffs);

  // Apply changes if requested
  if (applyChanges && mergedComponents.length > 0) {
    console.log("\n🔄 Applying changes...\n");
    for (const component of mergedComponents) {
      saveMCPComponent(component);
      console.log(`  ✓ Updated ${toKebabCase(component.name)}.json`);
    }
    console.log("\n✅ Changes applied successfully!");
  }
}

main().catch(console.error);
