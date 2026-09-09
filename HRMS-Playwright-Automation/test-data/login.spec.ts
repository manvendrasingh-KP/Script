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