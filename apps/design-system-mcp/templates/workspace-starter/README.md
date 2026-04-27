# GoA Workspace Starter Template

A ready-to-use React starter template for building Government of Alberta workspace applications. Includes all infrastructure for scroll-aware headers, responsive layouts, and GoA Design System components.

## Quick Start

```bash
# 1. Copy this template to your project location
cp -r workspace-starter my-app

# 2. Navigate to the new directory
cd my-app

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open http://localhost:5173 to view your app.

## What's Included

### Infrastructure

- **Scroll-aware page headers** - Headers collapse when scrolling, show shadows, adapt to content
- **WorkSideMenu integration** - Side navigation with user account menu
- **Mobile-responsive layout** - Automatic mobile/desktop detection and layout switching
- **Context providers** - Menu state, page headers, notifications, scroll state

### Wireframe Mode

This template includes **wireframe mode** for early-stage stakeholder feedback. Wireframe mode converts all GoA components to a grayscale, sketch-like appearance that signals "this is a draft, let's shape it together."

**Toggle wireframe mode:**
- **Keyboard shortcut:** `Cmd+.` (Mac) or `Ctrl+.` (Windows)
- **Click:** Small overlay on the right edge of the screen

**Why use wireframe mode?**
- Visual fidelity signals commitment. Polished UI says "this is decided."
- Wireframe says "let's discuss structure and flow first."
- Get feedback on layout and user flows without stakeholders fixating on colors and fonts.

**What changes in wireframe mode:**
- All colors become grayscale
- Brand logos and images become desaturated placeholders
- Shadows and rounded corners are minimized
- A subtle grid background and "WIREFRAME" indicator appear
- Layout and spacing remain accurate

### Example Pages

| Page | Path | Description |
|------|------|-------------|
| Dashboard | `/` | Stats overview, urgent items, quick actions |
| My Items | `/my-items` | Filtered list of user's assigned items |
| All Items | `/items` | Full list with filters, sort, search |
| Item Detail | `/items/:id` | Detail view with tabs |
| Search | `/search` | Full-text search |
| Notifications | `/notifications` | Notification center |
| Settings | `/settings` | User preferences |

### Utilities

- **Date utilities** - `formatDate()`, `formatRelativeDate()`, `isOverdue()`, `isDueSoon()`
- **Badge utilities** - `getStatusBadgeProps()`, `getPriorityBadgeProps()`
- **Search utilities** - `filterData()`, `sortData()`
- **Mock API** - `mockFetch()` for simulating async data

## Project Structure

```
src/
├── main.tsx                # Entry point - imports @abgov/web-components
├── App.tsx                 # Routes and providers
├── App.css                 # Scroll infrastructure CSS
├── index.css               # Base styles
├── components/
│   ├── AppLayout.tsx       # Main layout with WorkSideMenu
│   ├── PageHeader.tsx      # Scroll-aware page header
│   └── ScrollContainer.tsx # Horizontal scroll with shadows
├── contexts/
│   ├── MenuContext.tsx     # Menu open/close state
│   ├── ScrollStateContext.tsx  # Scroll position tracking
│   ├── PageHeaderContext.tsx   # Page header state
│   └── NotificationContext.tsx # Notification state
├── routes/
│   ├── DashboardPage.tsx
│   ├── ItemsPage.tsx
│   ├── ItemDetailPage.tsx
│   ├── SearchPage.tsx
│   ├── NotificationsPage.tsx
│   └── SettingsPage.tsx
├── types/
│   └── index.ts            # Type definitions
├── data/
│   └── mockData.ts         # Sample data
└── utils/
    ├── dateUtils.ts
    ├── badgeUtils.ts
    ├── searchUtils.ts
    └── mockApi.ts
```

## Customization Guide

### 1. Update App Name

Edit `src/components/AppLayout.tsx`:
```tsx
<GoabxWorkSideMenu
  heading="Your App Name"  // Change this
  ...
```

### 2. Update Navigation

Edit `src/components/AppLayout.tsx` - modify the `primaryContent`, `secondaryContent`, and `accountContent` props:

```tsx
primaryContent={
  <>
    <GoabxWorkSideMenuItem
      icon="home"
      label="Dashboard"
      url="/"
      onClick={() => handleNavigate('/')}
    />
    {/* Add your navigation items */}
  </>
}
```

### 3. Update Data Types

Edit `src/types/index.ts` to match your domain:

```tsx
// Rename Item to your entity (e.g., Application, Case, Request)
export interface Application {
  id: string;
  applicantName: string;
  // ... your fields
}
```

### 4. Connect to Real API

Replace `mockFetch` calls with your actual API:

```tsx
// Before
const items = await mockFetch(mockItems);

// After
const items = await fetch('/api/items').then(r => r.json());
```

### 5. Update Routes

Edit `src/App.tsx` to match your URL structure:

```tsx
<Routes>
  <Route path="/" element={<DashboardPage />} />
  <Route path="/applications" element={<ApplicationsPage />} />
  {/* Your routes */}
</Routes>
```

## Key Patterns

### Setting Page Headers

Use `usePageHeader` in your page components:

```tsx
// Simple title
usePageHeader('Dashboard');

// Title with actions
const headerActions = useMemo(() => (
  <GoabButton type="primary">Create New</GoabButton>
), []);
usePageHeader('Items', headerActions);
```

### Using Badge Utilities

```tsx
import { getStatusBadgeProps, getPriorityBadgeProps } from '../utils/badgeUtils';

// Spread props directly on GoabBadge
<GoabBadge {...getStatusBadgeProps(item.status)} />
<GoabBadge {...getPriorityBadgeProps(item.priority)} />
```

### Scroll-Aware Layouts

The scroll infrastructure is automatic. Key classes:

- `.content-padding` - Standard page content padding
- `.desktop-card-container` - Gets `data-scroll-state` attribute
- `.page-header` - Automatically collapses/expands

### Loading States

Use skeleton classes for loading:

```tsx
{isLoading ? (
  <div className="skeleton skeleton--text" />
) : (
  <span>{data}</span>
)}
```

## Critical Setup Requirements

These are already configured in this template, but important to know:

### 1. Web Components Import (main.tsx)

```tsx
import '@abgov/web-components'  // MUST be imported for components to render
```

### 2. Ionicons CDN (index.html)

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
```

### 3. GoA CSS (App.tsx)

```tsx
import '@abgov/web-components/index.css';
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run build:check  # Type check + build
npm run preview   # Preview production build
```

## Dependencies

This template uses the local ui-components build from the Design System monorepo to access experimental components like WorkSideMenu.

| Package | Purpose |
|---------|---------|
| @abgov/react-components | GoA React components |
| @abgov/web-components | GoA web components (required for rendering) |
| @abgov/ui-components-common | Shared types and utilities |
| react | React framework |
| react-router-dom | Routing |

### For Use Outside the Design System Monorepo

If you're using this template outside the Design System monorepo, update `package.json` to use npm versions:

```json
{
  "dependencies": {
    "@abgov/react-components": "^6.5.0",
    "@abgov/ui-components-common": "^1.5.0",
    "@abgov/web-components": "^1.35.0"
  }
}
```

**Note:** The WorkSideMenu (`GoabxWorkSideMenu`) is an experimental component. If it's not available in your npm version, you may need to:
1. Build from source using the latest ui-components
2. Wait for the next release that includes experimental exports
3. Use an alternative layout approach

## Troubleshooting

### Components not rendering

- Ensure `@abgov/web-components` is imported in `main.tsx`
- Ensure Ionicons CDN scripts are in `index.html`

### Icons not showing

- Verify Ionicons CDN scripts are loaded
- Use valid Ionicon names (see https://ionic.io/ionicons)

### TypeScript errors

- Use `import type { TypeName }` for type-only imports
- Types are in `@abgov/ui-components-common`

### Scroll behavior not working

- Ensure `.desktop-card-container` has proper styling
- Check that `ScrollStateProvider` wraps content

## Related Resources

- [GoA Design System Documentation](https://design.alberta.ca)
- [GoA React Components](https://www.npmjs.com/package/@abgov/react-components)
- [Ionicons](https://ionic.io/ionicons)

---

*Generated from the GoA Design System MCP workspace archetype.*
