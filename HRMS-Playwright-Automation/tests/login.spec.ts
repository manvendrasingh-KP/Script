import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/login');

  await loginPage.login('gaurav.kashyap@karpragati.com', '12345','AMG8548');
  await expect(page.locator("//h2[normalize-space()='Dashboard']")
  ).toBeVisible();
  await expect(
    page.locator("//p[normalize-space()=\"Welcome back! Here's what's happening today\"]")
  ).toBeVisible();
});
test('Verify login fails with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/login');

  await loginPage.login(
    'gaurav.kashyap@karpragati.com',
    'wrongpassword',
    'AMG8548'
  );

  await expect(
    page.getByText('Invalid credentials')
  ).toBeVisible();

  await expect(
    page.locator("//h2[normalize-space()='Dashboard']")
  ).not.toBeVisible();
});

test('Verify login fails with invalid organization code', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/login');

  await loginPage.login(
    'gaurav.kashyap@karpragati.com',
    '12345',
    'INVALID123'
  );

  await expect(
    page.getByText('Invalid organization code')
  ).toBeVisible();

  await expect(
    page.locator("//h2[normalize-space()='Dashboard']")
  ).not.toBeVisible();
});