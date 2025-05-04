import { test, expect } from '@playwright/test';

test('logowanie test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await page.getByRole('button', { name: 'Powiadomienia (1)' }).click();
  await page.getByRole('button', { name: 'Zamknij' }).click();
  await page.getByRole('button', { name: 'Ukryj powiadomienia' }).click();
  
});