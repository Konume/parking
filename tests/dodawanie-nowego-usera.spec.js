import { test, expect } from '@playwright/test';

test('dodadowanie-nowego-użytkownika', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('zs@example.com');
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await expect(page.getByText('Miejsca ParkingoweRezerwacjaAnulowanie RezerwacjiUżytkownicyPowiadomieniaMapaWyloguj')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Użytkownicy' })).toBeVisible();
  await page.getByRole('button', { name: 'Użytkownicy' }).click();
  await expect(page.getByRole('textbox', { name: 'Wprowadź imię i nazwisko' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Wprowadź imię i nazwisko' }).fill('Tester Niedzwiedź');
  await expect(page.getByRole('textbox', { name: 'Wprowadź e-mail' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Wprowadź e-mail' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź e-mail' }).fill('tester@example.com');
  await expect(page.getByRole('textbox', { name: 'Wprowadź hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Wprowadź hasło' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Dodaj użytkownika' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^Dodaj użytkownika$/ }).click();
  await expect(page.getByRole('button', { name: 'Wyloguj' })).toBeVisible();
  await page.getByRole('button', { name: 'Wyloguj' }).click();
  await page.getByRole('button', { name: 'Zaloguj', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tester@example.com');
  await expect(page.getByRole('textbox', { name: 'Hasło' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill('qaz123');
  await expect(page.getByRole('button', { name: 'Zaloguj się' })).toBeVisible();
  await page.getByRole('button', { name: 'Zaloguj się' }).click();
  await expect(page.getByText('Miejsca ParkingoweRezerwacjaAnulowanie RezerwacjiPowiadomieniaMapaWyloguj')).toBeVisible();

});