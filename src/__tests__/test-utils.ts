import puppeteer from 'puppeteer';
/**
 * Setup Puppeteer.
 * 
 * @param  {string} url   - Headless instance URL
 * @param  {any} callback - Callback method
 */
export const setupPuppeteer = async (url:string, callback:any) => {
  // launch browser	
  const browser = await puppeteer.launch({
    headless: true, // headless mode set to false so browser opens up with visual feedback
  })

  // creates a new page in the opened browser	
  const page = await browser.newPage()

  // Track events. We may bail out of a recursive navigation loop through this.
  var responseEventOccurred = false;
  const responseHandler = () => { responseEventOccurred = true }

  const responseWatcher = new Promise(function(resolve){
    setTimeout(function(){
      if (!responseEventOccurred) {
        resolve(true); 
      } else {
        setTimeout(function(){ resolve(true); }, 30000);
      }

      page.removeListener('response', responseHandler);
    }, 500);
  });

  await page.goto(url, {
    timeout: 0,
    waitUntil: 'networkidle2'
  });

  page.on('response', responseHandler);
  let navigationWatcher = page.waitForNavigation();  
  await Promise.race([responseWatcher, navigationWatcher]);

  await callback(page)

  // Avoid memory leaks. Close headless browser instance.
  await browser.close();
}