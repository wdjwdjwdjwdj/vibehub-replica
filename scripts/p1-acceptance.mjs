import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const root = process.cwd();
const serverRoot = `${root}/server`;

const isPortFree = (port) => new Promise((resolve) => {
  const probe = createServer();
  probe.once('error', () => resolve(false));
  probe.listen(port, '127.0.0.1', () => probe.close(() => resolve(true)));
});

const findPort = async (preferred) => {
  for (let port = preferred; port < preferred + 50; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free port found near ${preferred}`);
};

const waitFor = async (url, label) => {
  let lastError = null;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`${label} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await delay(250);
  }
  throw new Error(`${label} did not become ready: ${lastError?.message || 'unknown error'}`);
};

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32', ...options });
  child.once('error', reject);
  child.once('exit', (code, signal) => {
    if (code === 0) resolve();
    else reject(new Error(`${command} ${args.join(' ')} exited with ${signal || code}`));
  });
});

const childProcesses = [];
const stopChildren = () => {
  for (const child of childProcesses.splice(0)) {
    if (!child.killed) child.kill();
  }
};
process.once('SIGINT', () => { stopChildren(); process.exit(130); });
process.once('SIGTERM', () => { stopChildren(); process.exit(143); });

const backendPort = await findPort(3000);
const frontendPort = await findPort(5174);
const backendUrl = `http://127.0.0.1:${backendPort}`;
const frontendUrl = `http://127.0.0.1:${frontendPort}`;
const commonEnv = { ...process.env, FORCE_COLOR: '0' };

const backend = spawn(process.execPath, ['src/index.js'], {
  cwd: serverRoot,
  stdio: 'inherit',
  env: {
    ...commonEnv,
    HOST: '127.0.0.1',
    PORT: String(backendPort),
    BETTER_AUTH_URL: backendUrl,
    CORS_ORIGIN: frontendUrl,
  },
});
const frontend = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', String(frontendPort)], {
  cwd: root,
  stdio: 'inherit',
  env: { ...commonEnv, VITE_API_BASE_URL: backendUrl },
});
childProcesses.push(backend, frontend);

try {
  await Promise.all([waitFor(`${backendUrl}/api/health`, 'backend'), waitFor(`${frontendUrl}/en`, 'Vite frontend')]);
  console.log(`P1 services ready: frontend=${frontendUrl}, backend=${backendUrl}`);

  await run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build:vibehub'], { env: commonEnv });
  await run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['test'], {
    cwd: serverRoot,
    env: { ...commonEnv, TEST_BASE_URL: backendUrl, TEST_ORIGIN: frontendUrl },
  });
  await run(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['--no-install', 'playwright', 'test', 'tests/backend-sync.spec.js', '--reporter=line'], {
    env: { ...commonEnv, VIBEHUB_BASE_URL: frontendUrl },
  });
  await run(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['--no-install', 'playwright', 'test', 'tests/p1-frontend.spec.js', '--reporter=line'], {
    env: { ...commonEnv, VIBEHUB_BASE_URL: frontendUrl },
  });
  console.log('P1 acceptance passed.');
} finally {
  stopChildren();
}
