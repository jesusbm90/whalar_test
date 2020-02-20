const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function non_business_route() {
    // driver definition
    const driver = new Builder().forBrowser('chrome').build();

    // constants and variable block definition
    const titleContentCreator = 'Content Creator Registration | Whalar';
    const titleMainPage = 'Influencer marketing done right. Creators with influence. | Whalar';
    const titleSignUp = 'Sign Up';

    try {
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

        // checks wrong format emails entered
        const emailField = '//*[@id="email-field"]';
        const keyTab = Key.TAB;
        const messageError = '[data-test-id="field-email"] [data-test-id="error-message"]';

        await driver.sleep(500)
        await driver.findElement(By.xpath(emailField)).sendKeys('jesus.whalar.test', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('jesus.whalar.test@', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('jesus.whalar.test.com', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('jesus.whalar.test@.com', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('@gmail.com', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('gmail.com', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();
        
        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('.com', keyTab);
        await driver.findElement(By.css(messageError)).isDisplayed();
        
        // this is a correct email
        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(emailField)).sendKeys('jesus.whalar.test@gmail.com', keyTab);
        assert.equal(0, await driver.findElements(By.css(messageError)));

    } finally {
        driver.quit();
    }
})();