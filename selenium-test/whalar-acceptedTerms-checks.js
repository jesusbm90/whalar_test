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

        // checks accepted terms is not checked
        const error = 'x_aix_ai3 x_kx_bf x_kx_gt checkbox-inline';
        const acceptedTermsCheckbox = '/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[6]/div/div/label';

        await driver.sleep(500)
        await driver.findElement(By.css('button[data-test-id="btn-submit"]')).click();
        await driver.sleep(500)
        assert.notEqual(0, await driver.findElement(By.className(error)).isDisplayed());

        // accepted terms is checked
        await driver.sleep(500)
        await driver.navigate().refresh();
        await driver.findElement(By.xpath(acceptedTermsCheckbox)).click();
        await driver.sleep(500)
        assert.equal(0, await driver.findElements(By.className(error)));

    } finally {
        driver.quit();
    }
})();