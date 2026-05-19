// Smoke test for the design-system-mcp data-loader.
// Loads the synced flat data and exercises the key code paths the MCP
// tools and external diagnostics hit. Not a unit test, just an end-to-end
// sanity check.

import { DataLoader } from '../src/data-loader';

async function main(): Promise<void> {
  const loader = new DataLoader();
  await loader.initialize();
  const stats = loader.getStats();
  process.stdout.write(`\nLoaded ${stats.totalItems} items.\n`);

  console.log('\n--- search("accordion") top 3 ---');
  const r1 = await loader.search('accordion', { maxResults: 3 });
  for (const r of r1) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }

  console.log('\n--- search("button") collection=components top 3 ---');
  const r2 = await loader.search('button', {
    collection: 'components',
    maxResults: 3,
  });
  for (const r of r2) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }

  console.log('\n--- search("error page") collection=examples top 3 ---');
  const r3 = await loader.search('error page', {
    collection: 'examples',
    maxResults: 3,
  });
  for (const r of r3) {
    console.log(`  ${r.collection}/${r.id}: ${r.name} (score: ${r.score})`);
  }

  console.log('\n--- get("accordion") ---');
  const g1 = loader.get('accordion');
  if (g1) {
    console.log(`  resolved_via: ${g1.resolved_via}`);
    console.log(`  collection: ${g1.collection}`);
    console.log(`  name: ${g1.data.name}`);
    console.log(`  webComponentTag: ${g1.data.webComponentTag}`);
    console.log(`  relatedGuidance: ${(g1.data.relatedGuidance || []).slice(0, 3).join(', ')}...`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("GoabAppFooter") — alias resolution ---');
  const g2 = loader.get('GoabAppFooter');
  if (g2) {
    console.log(`  resolved_via: ${g2.resolved_via}`);
    console.log(`  id: ${g2.id}`);
    console.log(`  collection: ${g2.collection}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("question-page") ---');
  const g3 = loader.get('question-page');
  if (g3) {
    console.log(`  resolved_via: ${g3.resolved_via}`);
    console.log(`  id: ${g3.id}`);
    console.log(`  collection: ${g3.collection}`);
    console.log(`  aliases: ${(g3.data.aliases || []).join(', ')}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("ask-a-user-one-question-at-a-time") — alias of question-page ---');
  const g4 = loader.get('ask-a-user-one-question-at-a-time');
  if (g4) {
    console.log(`  resolved_via: ${g4.resolved_via}`);
    console.log(`  id: ${g4.id}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("confirm-that-an-application-was-submitted") — alias of result-page ---');
  const g5 = loader.get('confirm-that-an-application-was-submitted');
  if (g5) {
    console.log(`  resolved_via: ${g5.resolved_via}`);
    console.log(`  id: ${g5.id}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("designers/designing-with-ds") — nested id ---');
  const g6 = loader.get('designers/designing-with-ds');
  if (g6) {
    console.log(`  resolved_via: ${g6.resolved_via}`);
    console.log(`  collection: ${g6.collection}`);
    console.log(`  title: ${g6.data.title}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- get("anti-patterns") — foundation ---');
  const g7 = loader.get('anti-patterns');
  if (g7) {
    console.log(`  resolved_via: ${g7.resolved_via}`);
    console.log(`  collection: ${g7.collection}`);
    console.log(`  title: ${g7.data.title}`);
  } else console.log('  NOT FOUND');

  console.log('\n--- search "checkbox" — guidance match ---');
  const r4 = await loader.search('checkbox content', {
    collection: 'guidance',
    maxResults: 3,
  });
  for (const r of r4) {
    console.log(`  ${r.collection}/${r.id}`);
  }

  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
