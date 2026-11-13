import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WHATSAPP = 'https://wa.me/50664781319';

/** Recorre la página para cargar imágenes diferidas e hidratar todas las secciones. */
async function recorrer(page: import('@playwright/test').Page) {
  const alto = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alto; y += 600) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe('Accesibilidad', () => {
  test.use({ reducedMotion: 'reduce' }); // estado final, sin animaciones a medio camino

  for (const ruta of ['/', '/privacidad/', '/no-existe']) {
    test(`sin violaciones de axe (WCAG 2.2 AA) en ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      await recorrer(page);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      const resumen = violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.nodes
            .map((n) => n.target.join(' '))
            .slice(0, 3)
            .join(' | ')}`,
      );
      expect(resumen).toEqual([]);
    });
  }
});

test.describe('SEO y prerender', () => {
  test('el HTML se lee completo sin JavaScript', async ({ browser }) => {
    const contexto = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexto.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Donde cada pequeño paso cuenta');
    await expect(page.locator('h1')).toContainText('Ciudad Quesada');
    expect(await page.locator('main h2').count()).toBeGreaterThanOrEqual(10);
    await expect(page.getByRole('table').first()).toContainText('₡185.000');
    // Las piezas de la firma no quedan ocultas sin JS
    const ocultas = await page
      .locator('[data-pieza]')
      .evaluateAll(
        (els) =>
          els.filter(
            (e) => getComputedStyle(e).display !== 'none' && getComputedStyle(e).opacity === '0',
          ).length,
      );
    expect(ocultas).toBe(0);
    // Las fotos traen src y srcset reales en el HTML
    const img = page.locator('main img').first();
    await expect(img).toHaveAttribute('src', /^media\/.+\.webp$/);
    await expect(img).toHaveAttribute('srcset', /\.webp \d+w/);
    await contexto.close();
  });

  test('metadatos, canonical y datos estructurados', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Guardería y centro infantil en Ciudad Quesada/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://dejandohuellacr.com/',
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://dejandohuellacr.com/og-dejando-huella.jpg',
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index/);
    const jsonLd = JSON.parse((await page.locator('#datos-estructurados').textContent()) ?? '{}');
    expect(jsonLd['@graph'].map((n: { '@type': string }) => n['@type'])).toEqual([
      'ChildCare',
      'WebSite',
      'FAQPage',
    ]);
  });

  test('una ruta inexistente responde 404 y no se indexa', async ({ page }) => {
    const respuesta = await page.goto('/no-existe');
    expect(respuesta?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('se nos perdió');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('robots.txt y sitemap.xml', async ({ request }) => {
    expect(await (await request.get('/robots.txt')).text()).toContain(
      'Sitemap: https://dejandohuellacr.com/sitemap.xml',
    );
    expect(await (await request.get('/sitemap.xml')).text()).toContain(
      '<loc>https://dejandohuellacr.com/</loc>',
    );
  });
});

test.describe('Contacto por WhatsApp', () => {
  test('todos los enlaces van al número del centro con un mensaje escrito', async ({ page }) => {
    await page.goto('/');
    await recorrer(page);
    const enlaces = await page
      .locator(`a[href^="${WHATSAPP}"]`)
      .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    expect(enlaces.length).toBeGreaterThanOrEqual(8);
    for (const enlace of enlaces) {
      expect(new URL(enlace).searchParams.get('text')?.length ?? 0, enlace).toBeGreaterThan(10);
    }
  });

  test('el formulario valida y arma el mensaje', async ({ page }) => {
    await page.goto('/#visitanos');
    await page.evaluate(() => {
      (window as unknown as { abiertos: string[] }).abiertos = [];
      window.open = (url) => {
        (window as unknown as { abiertos: string[] }).abiertos.push(String(url));
        return null;
      };
    });
    const formulario = page.locator('form');
    await formulario.scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Enviar por WhatsApp' }).click();
    await expect(page.getByRole('alert')).toContainText('Escribe tu nombre y elige la edad');
    await expect(page.locator('#f-nombre')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#f-nombre')).toBeFocused();

    await page.locator('#f-nombre').fill('Ana Rodríguez');
    await page.locator('#f-edad').selectOption({ index: 2 });
    await page.getByRole('button', { name: 'Enviar por WhatsApp' }).click();
    const abiertos = await page.evaluate(
      () => (window as unknown as { abiertos: string[] }).abiertos,
    );
    expect(abiertos).toHaveLength(1);
    const texto = new URL(abiertos[0]).searchParams.get('text') ?? '';
    expect(texto).toContain('Nombre: Ana Rodríguez');
    expect(texto).toContain('Edad de mi hijo o hija: 2 a 3 años (Pasitos)');
  });
});

test.describe('Navegación', () => {
  test('menú del celular: abre, atrapa el foco y cierra con Esc', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'El menú es solo para celular');
    await page.goto('/');
    const boton = page.getByRole('button', { name: 'Menú' });
    await boton.click();
    const menu = page.getByRole('dialog', { name: 'Menú' });
    await expect(menu).toBeVisible();
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await expect(boton).toBeFocused();
  });

  // Regresión: con el desplazamiento suave activo, tocar un enlace del menú cerraba el menú
  // pero la página no se movía (Lenis seguía detenido cuando se pedía el salto).
  test('menú del celular: tocar un enlace lleva a su sección', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'El menú es solo para celular');
    await page.goto('/');
    await page.waitForTimeout(1500); // que cargue el movimiento (Lenis)
    await page.getByRole('button', { name: 'Menú' }).tap();
    await page.locator('dialog#menu a[href="#horarios"]').tap();
    await expect(page.getByRole('dialog', { name: 'Menú' })).toBeHidden();
    await expect
      .poll(
        () => page.evaluate(() => document.getElementById('horarios')!.getBoundingClientRect().top),
        {
          timeout: 5000,
        },
      )
      .toBeLessThan(200);
  });

  test('el visor de fotos abre en grande y cierra con Esc', async ({ page }) => {
    await page.goto('/#espacios');
    const primera = page.getByRole('button', { name: /Ver en grande: Aula del espacio/ });
    await primera.scrollIntoViewIfNeeded();
    await primera.click();
    const visor = page.locator('dialog.visor');
    await expect(visor).toBeVisible();
    await expect(visor.locator('img')).toHaveAttribute('alt', /cohetes y planetas/);
    await page.keyboard.press('Escape');
    await expect(visor).toBeHidden();
  });

  test('sin errores de consola', async ({ page }) => {
    const errores: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    page.on('pageerror', (e) => errores.push(e.message));
    await page.goto('/');
    await recorrer(page);
    expect(errores).toEqual([]);
  });
});
