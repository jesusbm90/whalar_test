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

        // checks wrong format password entered
        const error = 'x_aix_ai9 x_aup_e x_aup_akj';
        const keyEnter = Key.ENTER;
        const passwordField = '[name="password"]';

        await driver.sleep(500)
        await driver.findElement(By.css(passwordField)).sendKeys('A', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('a', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('0', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('ABCDEFGH', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('abcdefgh', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('01234567', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('ABCdef0', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('ABCD1234', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('abcd1234', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('ABCDefgh', keyEnter);
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        // valid password
        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.css(passwordField)).sendKeys('Whalar1234', keyEnter);
        assert.equal(0, await driver.findElements(By.className(error)));

    } finally {
        driver.quit();
    }
})();