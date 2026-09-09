import { Page, Locator } from "@playwright/test";
export class LoginPage{
private page: Page;
private username: Locator;
private password: Locator;
private organizationCode: Locator;
private loginButton: Locator;

constructor(page: Page){
    this.page = page;
    this.username = page.locator("//input[@placeholder='Enter your work email or mobile number']");
    this.password = page.locator("//input[@placeholder='Enter your password']");
    this.organizationCode = page.locator("//input[@placeholder='Enter your organization code']");
    this.loginButton = page.locator("//button[text()='Login']");
}
 async login(username: string, password: string, orgCode: string ) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.organizationCode.fill(orgCode);
    await this.loginButton.click();
  }
} 