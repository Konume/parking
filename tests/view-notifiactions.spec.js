import { test, expect } from '@playwright/test';

test('wyświetlanie powiadomień', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await expect(page.getByRole('button', { name: 'Powiadomienia', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Powiadomienia', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Powiadomienia' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Numer miejsca parkingowego' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Numer miejsca parkingowego' }).click();
  await expect(page.getByRole('textbox', { name: 'Treść powiadomienia' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Treść powiadomienia' }).click();
  await expect(page.getByRole('button', { name: 'Dodaj powiadomienie' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Numer miejsca parkingowego' }).click();
  await page.getByRole('textbox', { name: 'Numer miejsca parkingowego' }).fill('2');
  await page.getByRole('textbox', { name: 'Treść powiadomienia' }).click();
  await page.getByRole('textbox', { name: 'Treść powiadomienia' }).fill('Przesuń auto');
  await page.getByRole('button', { name: 'Dodaj powiadomienie' }).click();
  await expect(page.getByText('Miejsce parkingowe: 2 -')).toBeVisible();
  await page.getByText('Miejsce parkingowe: 2 - Przesuń autoZamknij').click();
  await expect(page.getByRole('button', { name: 'Powiadomienia (1)' })).toBeVisible();
  await page.getByRole('button', { name: 'Powiadomienia (1)' }).click();
  await expect(page.getByText('Miejsce parkingowe: 2 -').first()).toBeVisible();
  await page.getByText('Miejsce parkingowe: 2 - Przesuń autoZamknij').first().click();
  await expect(page.getByText('Miejsce parkingowe: 2 - Przesuń autoZamknij').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Zamknij' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Zamknij' }).first().click();
  await page.getByRole('button', { name: 'Ukryj powiadomienia' }).click();
  await expect(page.getByText('Brak powiadomień')).toBeVisible();
  await page.getByRole('button', { name: 'Powiadomienia (0)' }).click();
  await expect(page.getByText('Brak powiadomień.')).toBeVisible();
});