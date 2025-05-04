import { test, expect } from '@playwright/test';

test('rezerwacja test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();  
  await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await expect(page.getByRole('heading')).toContainText('Status miejsc parkingowych');
  await page.locator('div').filter({ hasText: /^Miejsce 3Wolne$/ }).getByRole('img').click();
  await expect(page.locator('div').filter({ hasText: /^Miejsce 3ZajęteZarezerwowane przez: Zuzanna$/ }).getByRole('img')).toBeVisible();
  await expect(page.getByText('Miejsce 3')).toHaveText('Miejsce 3');
  await page.getByText('Miejsce 3').click();

  await expect(page.getByText('Zajęte')).toHaveText('Zajęte');
  await expect(page.getByText('Zarezerwowane przez: Zuzanna')).toHaveText('Zarezerwowane przez: Zuzanna');
  
});