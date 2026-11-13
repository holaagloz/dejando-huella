import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas E2E contra el build estático (el mismo que se publica en GitHub Pages).
 * Requiere `npm run build` antes. Uso: npm run e2e
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4300', trace: 'on-first-retry' },
  webServer: {
    command: 'node scripts/servir-dist.mjs 4300',
    url: 'http://localhost:4300',
    reuseExistingServer: !process.env['CI'],
  },
  projects: [
    { name: 'celular', use: { ...devices['Pixel 7'] } },
    {
      name: 'escritorio',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
});
