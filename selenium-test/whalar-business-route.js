const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function business_route() {
    // driver definition
    const driver = new Builder().forBrowser('chrome').build();

    // constants and variable block definition
    const biography = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const password = 'whalar1234';
    const passwordWhalar = 'Whalar1234';
    const titleContentCreator = 'Content Creator Registration | Whalar';
    const titleFacebookContinueAs = 'Iniciar sesión con Facebook';
    const titleFacebookMainPage = 'Facebook';
    const titleMainPage = 'Influencer marketing done right. Creators with influence. | Whalar';
    const titleSignUp = 'Sign Up';
    const username = 'jesus.whalar.test+3@gmail.com';
    const usernameFacebook = 'jesus.whalar.test@gmail.com';

    try {
        const originalWindow = await driver.getWindowHandle();

        // accesses to the webpage and maximizes the window
        driver.get('http://whalar.com');
        driver.manage().window().maximize();

        // asserts, with the title page, we are in the main page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleMainPage, "error assertion title: " + titleMainPage);
        });

        // goes to the influencer application
        await driver.findElement(By.xpath('//*[@id="dropdownMenuLink"]')).click();
        await driver.findElement(By.xpath('//*[@id="navbar"]/ul[1]/li[1]/div/ul/li[2]/a')).click();

        // asserts, with the title page, we are in the content creator registration
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleContentCreator, "error assertion title: " + titleContentCreator);
        });

        // clicks on 'apply'
        await driver.findElement(By.xpath('//*[@id="navbar"]/ul[2]/li[1]/a')).click();

        // asserts, with the title page, we are in the sign up page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleSignUp, "error assertion title: " + titleSignUp);
        });

        // fills the form (username, password, check terms and clicks continue)
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="email-field"]')).sendKeys(username);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div/input')).sendKeys(passwordWhalar);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[6]/div/div/label')).click();
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[2]/div[2]/button/div[1]')).click();

        // asserts, with the title page, we continue in the sign up page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleSignUp, "error assertion title: " + titleSignUp);
        });

        // connect with facebook
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[3]/button')).click();

        // facebook will be open in a separate window
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
        );

        // block to continue in the new opened window
        const windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
            if (handle !== originalWindow) {
                await driver.switchTo().window(handle);
            }
        });

        // asserts, with the title page, we are in the facebook log in page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleFacebookMainPage, "error assertion title: " + titleFacebookMainPage);
        });

        // log in facebook
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys(usernameFacebook);
        await driver.findElement(By.xpath('//*[@id="pass"]')).sendKeys(password);
        await driver.findElement(By.xpath('//*[@id="u_0_0"]')).click();
        await driver.findElement(By.xpath('//*[@id="platformDialogForm"]/div/div/div/div/div/div[3]/div[1]/div[1]/div[2]')).click();

        // asserts, with the title page, we are in the facebook continue as page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleFacebookContinueAs, "error assertion title: " + titleFacebookContinueAs);
        });

        // form to complete the process; fills the mandatory fields
        await driver.sleep(2000);

        // biography
        await driver.findElement(By.xpath('//*[@id="profile-description"]')).sendKeys(biography);

        // tag
        await driver.findElement(By.xpath('button[data-tag="DIY"]')).click();

        // fee
        await driver.findElement(By.xpath('//*[@id="lowPrice"]')).sendKeys(1);

        // first name, last name
        await driver.findElement(By.xpath('//*[@id="profile-name"]')).sendKeys('firstName');
        await driver.findElement(By.xpath('//*[@id="profile-lastname"]')).sendKeys('lastName');

        // date of birth
        await driver.findElement(By.xpath('//*[@id="profile-age-day"]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-age-day"]/option[2]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-age-month"]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-age-month"]/option[2]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-age-year"]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-age-year"]/option[15]')).click();

        // gender
        await driver.findElement(By.xpath('//*[@id="profile-gender"]')).click();
        await driver.findElement(By.xpath('//*[@id="profile-gender"]/option[2]')).click();

        // city
        await driver.findElement(By.xpath('//*[@id="citycontainer"]/span/input')).sendKeys('city');
        await driver.findElement(By.xpath('.tt-suggestion:nth-child(1)')).click();

        // timezone
        await driver.findElement(By.xpath('select[name="timeZone"]')).click();
        await driver.findElement(By.xpath('//*[@id="profileform"]/ul[3]/li[3]/div[3]/div/div/select/option[2]')).click();

        // phone number
        await driver.findElement(By.xpath('//*[@id="web-phone"]')).sendKeys(123456789);

        // notification email
        await driver.findElement(By.xpath('//*[@id="profile-contact-email"]')).sendKeys(username);

        // applies the form
        await driver.findElement(By.xpath('//*[@id="profileSubmit"]')).click();

    } finally {
        driver.quit();
    }
})();