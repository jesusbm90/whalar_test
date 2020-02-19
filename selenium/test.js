const {Builder, By, Key, until} = require('selenium-webdriver');
const username = 'jesus.whalar.test6@gmail.com';
const password = 'whalar1234';
const passwordWhalar = 'Whalar1234';
const biography = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

(async function non_business_route() {
    // declaration of the driver we are going to work with
    const driver = new Builder().forBrowser('chrome').build();

    // accesses to the webpage and maximizes the window
    driver.get('http://whalar.com');
    driver.manage().window().maximize();

    // goes to the influencer application
    await driver.findElement(By.xpath('//*[@id="dropdownMenuLink"]')).click();
    await driver.findElement(By.xpath('//*[@id="navbar"]/ul[1]/li[1]/div/ul/li[2]/a')).click();

    // clicks on 'apply'
    await driver.findElement(By.xpath('//*[@id="navbar"]/ul[2]/li[1]/a')).click();

    // fills the form (username, password, check terms and clicks continue)
    await driver.sleep(1000);
    await driver.findElement(By.xpath('//*[@id="email-field"]')).sendKeys(username);
    await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div/input')).sendKeys(passwordWhalar);
    await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[6]/div/div/label')).click();
    await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[2]/div[2]/button/div[1]')).click();

    // connect with facebook
    await driver.sleep(2000);
    await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[3]/button')).click();

    // log in facebook
    //await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys('fdsfs')

})();