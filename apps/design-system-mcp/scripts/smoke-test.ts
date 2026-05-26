// Smoke test for the design-system-mcp data-loader.
// Loads the synced flat data and exercises the key code paths the MCP
// tools and external diagnostics hit. Not a unit test, just an end-to-end
// sanity check.

import { DataLoader } from '../src/data-loader';

let failures = 0;

function assertFound<T>(label: string, value: T | undefined | null): void {
  if (value === undefined || value === null) {
    console.error(`  ✗ assertion failed: ${label} returned no result`);
    failures += 1;
  }
}

function assertAtLeast(label: string, actual: number, min: number): void {
  if (actual < min) {
    console.error(`  ✗ assertion failed: ${label} expected >= ${min}, got ${actual}`);
    failures += 1;
  }
}

function assertAllEqual(label: string, values: number[]): void {
  if (!values.every((v) => v === values[0])) {
    console.error(
      `  ✗ assertion failed: ${label} expected all equal, got ${values.join(', ')}`,
    );
    failures += 1;
  }
}

function assertNull<T>(label: string, value: T | undefined | null): void {
  if (value !== undefined && value !== null) {
    console.error(`  ✗ assertion failed: ${label} expected null, got a result`);
    failures += 1;
  }
}

async function main(): Promise<void> {
  const loader = new DataLoader();
  await loader.initialize();
  const stats = loader.getStats();
  process.stdout.write(`\nLoaded ${stats.totalItems} items.\n`);
  // Sanity floor: the current pipeline ships hundreds of records. A single-
  // digit count means the data dir didn't resolve.
  assertAtLeast('initial load', stats.totalItems, 100);

  console.log('\n--- search("accordion") top 3 ---');
  const r1 = await loader.search('accordion', { maxResults: 3 });
  for (const r of r1) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }
  assertAtLeast('search("accordion")', r1.length, 1);

  console.log('\n--- search("button") collection=components top 3 ---');
  const r2 = await loader.search('button', {
    collection: 'components',
    maxResults: 3,
  });
  for (const r of r2) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }
  assertAtLeast('search("button", components)', r2.length, 1);

  console.log('\n--- search("error page") collection=examples top 3 ---');
  const r3 = await loader.search('error page', {
    collection: 'examples',
    maxResults: 3,
  });
  for (const r of r3) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }
  assertAtLeast('search("error page", examples)', r3.length, 1);

  console.log('\n--- get("accordion") ---');
  const g1 = loader.get('accordion');
  if (g1) {
    console.log(`  resolved_via: ${g1.resolved_via}`);
    console.log(`  collection: ${g1.collection}`);
    console.log(`  name: ${g1.data.name}`);
    console.log(`  webComponentTag: ${g1.data.webComponentTag}`);
    console.log(`  relatedGuidance: ${(g1.data.relatedGuidance || []).slice(0, 3).join(', ')}...`);
  } else console.log('  NOT FOUND');
  assertFound('get("accordion")', g1);

  console.log('\n--- get("GoabAppFooter") — alias resolution ---');
  const g2 = loader.get('GoabAppFooter');
  if (g2) {
    console.log(`  resolved_via: ${g2.resolved_via}`);
    console.log(`  id: ${g2.id}`);
    console.log(`  collection: ${g2.collection}`);
  } else console.log('  NOT FOUND');
  assertFound('get("GoabAppFooter")', g2);

  console.log('\n--- get("question-page") ---');
  const g3 = loader.get('question-page');
  if (g3) {
    console.log(`  resolved_via: ${g3.resolved_via}`);
    console.log(`  id: ${g3.id}`);
    console.log(`  collection: ${g3.collection}`);
    console.log(`  aliases: ${(g3.data.aliases || []).join(', ')}`);
  } else console.log('  NOT FOUND');
  assertFound('get("question-page")', g3);

  console.log('\n--- get("ask-a-user-one-question-at-a-time") — alias of question-page ---');
  const g4 = loader.get('ask-a-user-one-question-at-a-time');
  if (g4) {
    console.log(`  resolved_via: ${g4.resolved_via}`);
    console.log(`  id: ${g4.id}`);
  } else console.log('  NOT FOUND');
  assertFound('get(alias of question-page)', g4);

  console.log('\n--- get("confirm-that-an-application-was-submitted") — alias of result-page ---');
  const g5 = loader.get('confirm-that-an-application-was-submitted');
  if (g5) {
    console.log(`  resolved_via: ${g5.resolved_via}`);
    console.log(`  id: ${g5.id}`);
  } else console.log('  NOT FOUND');
  assertFound('get(alias of result-page)', g5);

  console.log('\n--- get("designers/designing-with-ds") — nested id ---');
  const g6 = loader.get('designers/designing-with-ds');
  if (g6) {
    console.log(`  resolved_via: ${g6.resolved_via}`);
    console.log(`  collection: ${g6.collection}`);
    console.log(`  title: ${g6.data.title}`);
  } else console.log('  NOT FOUND');
  assertFound('get("designers/designing-with-ds")', g6);

  console.log('\n--- get("anti-patterns") — foundation ---');
  const g7 = loader.get('anti-patterns');
  if (g7) {
    console.log(`  resolved_via: ${g7.resolved_via}`);
    console.log(`  collection: ${g7.collection}`);
    console.log(`  title: ${g7.data.title}`);
  } else console.log('  NOT FOUND');
  assertFound('get("anti-patterns")', g7);

  console.log('\n--- search "checkbox" — guidance match ---');
  const r4 = await loader.search('checkbox content', {
    collection: 'guidance',
    maxResults: 3,
  });
  for (const r of r4) {
    console.log(`  ${r.collection}/${r.id}`);
  }
  assertAtLeast('search("checkbox", guidance)', r4.length, 1);

  console.log('\n--- component filter normalizes spellings (notification guidance) ---');
  const componentForms = [
    'notification',
    'notification-banner',
    'GoabNotificationBanner',
    'goa-notification',
  ];
  const formCounts: number[] = [];
  for (const form of componentForms) {
    const hits = await loader.search('notification', {
      component: form,
      collection: 'guidance',
      maxResults: 50,
    });
    console.log(`  component="${form}" -> ${hits.length} guidance hits`);
    formCounts.push(hits.length);
  }
  assertAtLeast('component filter (canonical name)', formCounts[0], 1);
  assertAllEqual('component filter matches every spelling', formCounts);

  console.log('\n--- get scopes by collection ---');
  const buttonInComponents = loader.get('button', { collection: 'components' });
  const buttonInGuidance = loader.get('button', { collection: 'guidance' });
  console.log(
    `  get("button", components) -> ${buttonInComponents ? buttonInComponents.id : 'null'}`,
  );
  console.log(
    `  get("button", guidance)   -> ${buttonInGuidance ? buttonInGuidance.id : 'null'}`,
  );
  assertFound('get("button", collection=components)', buttonInComponents);
  assertNull('get("button", collection=guidance)', buttonInGuidance);

  if (failures > 0) {
    console.error(`\n${failures} assertion(s) failed.`);
    process.exit(1);
  }

  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
