import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const file = join(process.cwd(), 'server', 'data', 'store.json');

function empty() {
  return { admin: null, refreshTokens: [], visits: [], geo: {} };
}

let state = empty();
let chain = Promise.resolve();

export function loadStore() {
  mkdirSync(dirname(file), { recursive: true });
  if (!existsSync(file)) return;
  try {
    state = { ...empty(), ...JSON.parse(readFileSync(file, 'utf8')) };
  } catch {
    state = empty();
  }
}

function persist() {
  const next = `${file}.tmp`;
  writeFileSync(next, JSON.stringify(state));
  renameSync(next, file);
}

/** Runs store writes one at a time so two visits cannot overwrite each other. */
export function updateStore(change) {
  const run = chain.then(() => {
    const result = change(state);
    persist();
    return result;
  });
  chain = run.then(
    () => {},
    () => {},
  );
  return run;
}

export function readStore() {
  return state;
}
