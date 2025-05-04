import { test, expect } from '@playwright/test';

test('wyświetlanie mapy parkingu', async ({ page }) => {

await page.goto('http://localhost:3000/');
await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
await page.getByRole('button', { name: 'Zaloguj się' }).click();
await expect(page.getByRole('button', { name: 'Mapa' })).toBeVisible();
await page.getByRole('button', { name: 'Mapa' }).click();
await page.getByText('Powiadomienia (1)+− Leaflet').click();
  await page.locator('div').filter({ hasText: '+− Leaflet | © OpenStreetMap' }).nth(2).click();
  await expect(page.locator('div').filter({ hasText: '+− Leaflet | © OpenStreetMap' }).nth(2)).toBeVisible();
  await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible();
  await page.locator('.leaflet-marker-icon').first().click();
    await expect(page.getByText('Miejsce')).toBeVisible();
    await expect(page.getByText('Wolne')).toBeVisible();
  await page.getByRole('button', { name: 'Close popup' }).click();

  });
  