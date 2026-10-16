// Fails when modules depend on each other in a cycle, or a lower layer reaches up.
// Layers: app → features → domain → shared (see docs/architecture.md). ESLint guards single imports;
// this checks the whole graph between modules.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const RANK = { app: 3, features: 2, domain: 1, shared: 0 };
const moduleOf = (path) => {
  const [layer, name] = path.replace(/^src\//, '').split('/');
  return layer === 'app' ? 'app' : `${layer}/${name}`;
};
const files = execSync("find src -name '*.ts' -o -name '*.tsx'").toString().trim().split('\n');
const graph = {};
const problems = [];
for (const file of files) {
  const from = moduleOf(file);
  if (!(from.split('/')[0] in RANK)) continue;
  for (const [, spec] of readFileSync(file, 'utf8').matchAll(/from '@\/([^']+)'/g)) {
    const to = moduleOf(spec);
    if (to === from) continue;
    (graph[from] ||= new Set()).add(to);
    if (RANK[to.split('/')[0]] > RANK[from.split('/')[0]]) problems.push(`${file}: ${from} must not depend on ${to}`);
  }
}
// cycle search over the module graph
const state = {};
const stack = [];
function visit(m) {
  state[m] = 'open';
  stack.push(m);
  for (const n of graph[m] ?? []) {
    if (state[n] === 'open') problems.push(`cycle: ${[...stack.slice(stack.indexOf(n)), n].join(' → ')}`);
    else if (!state[n]) visit(n);
  }
  stack.pop();
  state[m] = 'done';
}
for (const m of Object.keys(graph)) if (!state[m]) visit(m);

for (const m of Object.keys(graph).sort()) console.log(`${m.padEnd(24)} → ${[...graph[m]].sort().join(', ')}`);
if (problems.length) {
  console.error('\n' + problems.join('\n'));
  process.exitCode = 1;
} else console.log('\nno cycles, no upward dependencies');
