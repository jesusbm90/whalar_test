const { Builder, By, Key, until } = require('selenium-webdriver');
const username = 'jesus.whalar.test+3@gmail.com';
const password = 'whalar1234';
const passwordWhalar = 'Whalar1234';
const biography = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';

(async function non_business_route() {
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // accesses to the webpage and maximizes the window
        driver.get('http://whalar.com');
        driver.manage().window().maximize();

        // goes to the influencer application
        await driver.findElement(By.xpath('//*[@id="dropdownMenuLink"]')).click();
        await driver.findElement(By.xpath('//*[@id="navbar"]/ul[1]/li[1]/div/ul/li[2]/a')).click();

        // clicks on 'apply'
        await driver.findElement(By.xpath('//*[@id="navbar"]/ul[2]/li[1]/a')).click();

        // fills the form (username, password, check terms and clicks continue)
        await driver.sleep(1000)
        await driver.findElement(By.xpath('//*[@id="email-field"]')).sendKeys(username);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[2]/div/div/div/input')).sendKeys(passwordWhalar);
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[1]/div[6]/div/div/label')).click();
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/form/div[2]/div[2]/button/div[1]')).click();

        // selects the 'non-business' route; it is necessary waits since it cannot find the element
        await driver.sleep(2000)
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[2]/div[1]/div[2]')).click();
        await driver.findElement(By.xpath('/html/body/div[3]/div[2]/div[1]/div/div/div/div/div/div/div[3]/a[2]/div[1]')).click()

        // logs in instagram application; it is necessary waits since it cannot find the elements
        await driver.sleep(2000)
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[2]/div/label/input')).sendKeys(username);
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[3]/div/label/input')).sendKeys(password);
        await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/div/article/div/div/div/form/div[4]/button')).click();

        // authorises instagram to use this account
        await driver.sleep(2000)
        await driver.findElement(By.xpath('/html/body/div/section/div/form/ul/li[2]/button')).click();

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