import { test, expect } from '@playwright/test';

test('logowanie - proces walidacji - test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await page.getByText('Proszę wypełnić oba pola').click();
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz1234');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await page.getByText('Nieprawidłowe hasło.').click();
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  
});