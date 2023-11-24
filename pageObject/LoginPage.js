class LoginPage {

  constructor(page) {
    this.page = page;
    this.username = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginBtn=page.locator("[value='Login']");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async ValidLogin(username, password) {
    await this.username.fill(username);
    await this.password.type(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState("networkidle");
  }

}

module.exports= {LoginPage};
