import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  
  // Header Elements
  readonly dashboardTitle: Locator;
  readonly analyticsDashboardHeading: Locator;
  readonly userName: Locator;
  readonly userRole: Locator;
  readonly manageHubsButton: Locator;
  readonly refreshButton: Locator;

  // Financial Summary Elements
  readonly activeRiderOutstandingCard: Locator;
  readonly activeRiderOutstandingValue: Locator;
  readonly inactiveRiderOutstandingCard: Locator;
  readonly inactiveRiderOutstandingValue: Locator;

  // Hub Selection Elements
  readonly allHubsTab: Locator;
  readonly badshahpurHubTab: Locator;
  readonly wazirabadHubTab: Locator;

  // Overview & Metrics Elements
  readonly activeFleetText: Locator;
  readonly totalRidersText: Locator;
  readonly activeRidersCount: Locator;
  readonly newThisMonthRidersCount: Locator;
  readonly inactiveRidersCount: Locator;
  readonly assignedVehiclesCount: Locator;
  readonly unassignedVehiclesCount: Locator;
  readonly fleetUtilizationValue: Locator;

  // Sidebar Links
  readonly sidebarLinks: { [key: string]: Locator };

  constructor(page: Page) {
    this.page = page;

    // Header Initializations
    this.dashboardTitle = page.locator('h1, h2, div').filter({ hasText: 'Dashboard' }).first();
    this.analyticsDashboardHeading = page.getByRole('heading', { name: 'Analytics Dashboard' });
    this.userName = page.getByText('Manvendra Singh');
    this.userRole = page.getByText('ADMIN');
    this.manageHubsButton = page.getByRole('button', { name: 'Manage Hubs' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });

    // Financial Cards Initializations
    this.activeRiderOutstandingCard = page.getByText('ACTIVE RIDER OUTSTANDING');
    this.activeRiderOutstandingValue = page.getByRole('heading', { name: '- ₹2,991,845.00' });
    this.inactiveRiderOutstandingCard = page.getByText('INACTIVE RIDER OUTSTANDING');
    this.inactiveRiderOutstandingValue = page.getByRole('heading', { name: '- ₹1,948,767.60' });

    // Hub Tabs
    this.allHubsTab = page.getByRole('heading', { name: 'All Hubs Combined' });
    this.badshahpurHubTab = page.getByRole('heading', { name: 'Badshahpur HUB' });
    this.wazirabadHubTab = page.getByRole('heading', { name: 'Wazirabad HUB' });

    // Status & Metrics
    this.activeFleetText = page.getByText('Active fleet: 449');
    this.totalRidersText = page.getByText('Total Riders: 2263');
    this.activeRidersCount = page.getByText('546');
    this.newThisMonthRidersCount = page.getByText('0');
    this.inactiveRidersCount = page.getByText('1717');
    this.assignedVehiclesCount = page.getByText('278');
    this.unassignedVehiclesCount = page.getByText('171');
    this.fleetUtilizationValue = page.getByText('62 %');

    // Sidebar Items
    this.sidebarLinks = {
      dashboard: page.getByRole('link', { name: 'Dashboard' }),
      userManagement: page.getByRole('link', { name: 'User Management' }),
      employeeAttendance: page.getByRole('link', { name: 'Employee Attendance' }),
      vehicleMaster: page.getByRole('link', { name: 'Vehicle Master' }),
      vehicleCount: page.getByRole('link', { name: 'Vehicle Count' }),
      vehicleMaintenance: page.getByRole('link', { name: 'Vehicle Maintenance' }),
      assignmentAnalytics: page.getByRole('link', { name: 'Assignment Analytics' }),
      vehicleTracking: page.getByRole('link', { name: 'Vehicle Tracking' }),
      vehicleRecovery: page.getByRole('link', { name: 'Vehicle Recovery' }),
    };
  }

  // Page Actions
  async navigateToDashboard() {
    await this.page.goto('https://admin-dev.aameego.com/dashboard');
  }

  async selectHub(hubName: 'Badshahpur' | 'Wazirabad' | 'All') {
    if (hubName === 'Badshahpur') {
      await this.badshahpurHubTab.click();
    } else if (hubName === 'Wazirabad') {
      await this.wazirabadHubTab.click();
    } else {
      await this.allHubsTab.click();
    }
  }

  async verifyUserInfo() {
    await expect(this.userName).toBeVisible();
    await expect(this.userRole).toBeVisible();
  }

  async verifyOutstandingAmounts() {
    await expect(this.activeRiderOutstandingCard).toBeVisible();
    await expect(this.activeRiderOutstandingValue).toBeVisible();
    await expect(this.inactiveRiderOutstandingCard).toBeVisible();
    await expect(this.inactiveRiderOutstandingValue).toBeVisible();
  }
}