import { spawn } from 'node:child_process';

const api = spawn(process.execPath, ['server/index.mjs'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '5342', HOST: '127.0.0.1', NODE_ENV: 'development' },
});

const web = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--port', '5340', '--host', '127.0.0.1', '--strictPort'], {
  stdio: 'inherit',
  env: process.env,
});

function stop() {
  api.kill('SIGTERM');
  web.kill('SIGTERM');
}

process.on('SIGINT', () => {
  stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  stop();
  process.exit(0);
});

for (const child of [api, web]) {
  child.on('exit', (code) => {
    stop();
    process.exit(code ?? 0);
  });
}
