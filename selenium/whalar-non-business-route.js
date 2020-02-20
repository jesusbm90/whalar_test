const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function non_business_route() {
    // driver definition
    const driver = new Builder().forBrowser('chrome').build();

    // constants and variable block definition
    const password = 'whalar1234';
    const passwordWhalar = 'Whalar1234';
    const titleContentCreator = 'Content Creator Registration | Whalar';
    const titleInstagramMainPage = 'Iniciar sesión • Instagram';
    const titleMainPage = 'Influencer marketing done right. Creators with influence. | Whalar';
    const titleSignUp = 'Sign Up';
    const username = 'jesus.whalar.test+3@gmail.com';

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

        // fills the form (username, password, check terms and clicks continue)
        await driver.sleep(1000)
        await driver.findElement(By.xpath('//*[@id="email-field"]')).sendKeys(username);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div/input')).sendKeys(passwordWhalar);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[6]/div/div/label')).click();
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[2]/div[2]/button/div[1]')).click();

        // asserts, with the title page, we continue in the sign up page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleSignUp, "error assertion title: " + titleSignUp);
        });

        // selects the 'non-business' route; it is necessary waits since it cannot find the element
        await driver.sleep(2000)
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[2]/div[1]/div[2]')).click();
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[3]/a[2]/div[1]')).click()

        // asserts, with the title page, we are in the instagram log in page
        await driver.sleep(500)
        driver.getTitle().then(function(title){
            assert.strictEqual(title, titleInstagramMainPage, "error assertion title: " + titleInstagramMainPage);
        });

        // logs in instagram application; it is necessary waits since it cannot find the elements
        await driver.sleep(2000)
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[2]/div/label/input')).sendKeys(username);
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[3]/div/label/input')).sendKeys(password);
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[4]/button')).click();

        // authorises instagram to use this account
        await driver.sleep(2000)
        await driver.findElement(By.xpath('/html/body/div/section/div/form/ul/li[2]/button')).click();
    } finally {
        driver.quit();
    }
})();