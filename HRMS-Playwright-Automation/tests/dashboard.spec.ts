import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Aameego Analytics Dashboard Functionality', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToDashboard();
  });

  test('Verify Header and Logged-In User Details', async ({ page }) => {
    await expect(page).toHaveTitle(/Aameego/i);
    await dashboardPage.verifyUserInfo();
  });

  test('Verify Active and Inactive Rider Outstanding Cards', async () => {
    await dashboardPage.verifyOutstandingAmounts();
  });

  test('Verify Hub Selection Tabs are Clickable and Functional', async () => {
    await expect(dashboardPage.allHubsTab).toBeVisible();
    await expect(dashboardPage.badshahpurHubTab).toBeVisible();
    await expect(dashboardPage.wazirabadHubTab).toBeVisible();

    // Select Hub Action
    await dashboardPage.selectHub('Badshahpur');
  });

  test('Verify Activity Overview Metrics', async () => {
    await expect(dashboardPage.activeFleetText).toBeVisible();
    await expect(dashboardPage.totalRidersText).toBeVisible();
    await expect(dashboardPage.activeRidersCount).toBeVisible();
    await expect(dashboardPage.inactiveRidersCount).toBeVisible();
    await expect(dashboardPage.fleetUtilizationValue).toBeVisible();
  });

  test('Verify Sidebar Navigation Options Visibility', async () => {
    for (const [key, locator] of Object.entries(dashboardPage.sidebarLinks)) {
      await expect(locator).toBeVisible();
    }
  });
});