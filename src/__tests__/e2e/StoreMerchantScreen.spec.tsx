import { setupPuppeteer } from '../test-utils';
import { wait } from 'react-testing-library';

const { getDocument, queries } = require('pptr-testing-library')
const { queryAllByTestId, getByTestId, getByText } = queries;

const storeUrl = 'http://localhost:3000/store/genesis-choba-2';
const storeInfo = {
  title: 'Genesis, Choba',
  storeHours: '9 AM - 9 PM',
}

describe('Store Product Page', () => {
  describe('Store merchant brief', () => {
    test('Displays correct information for the store', async (done) => {
      await setupPuppeteer(storeUrl, async (page:any) => {
        const storeBriefTestId = 'store-merchant-brief';
        const storeBriefSelector = `[data-testid="${storeBriefTestId}"]`;
  
        await page.waitForSelector(storeBriefSelector);  
        const $document = await getDocument(page);

        const storeTitleNode = await getByText($document, storeInfo.title)
        const storeHoursNode = await getByText($document, storeInfo.title)

        expect(storeTitleNode).toBeDefined()
        expect(storeHoursNode).toBeDefined()

        done()
      })
    }, 1600000);
  })

  describe('Store merchant products', () => {
    test('Displays a list of store merchant products', async (done) => {
      await setupPuppeteer(storeUrl, async (page:any) => {
        const storeProductSelector = '[data-testid="store-merchant-product"]';
  
        await page.waitForSelector(storeProductSelector);
  
        const $document = await getDocument(page);
  
        const storeMerchantProducts = await queryAllByTestId($document, 'store-merchant-product')
  
        expect(storeMerchantProducts.length).toBeGreaterThan(4)
  
        done()
      })
    }, 1600000);
  
    test('Loads more store merchant products', async (done) => {    
      await setupPuppeteer(storeUrl, async (page:any) => {
        const storeProductTestId = 'store-merchant-product';
        const loadStoreBtnProductTestId = 'load-store-products-btn';
        const storeProductSelector = `[data-testid="${storeProductTestId}"]`; 
        
        const $document = await getDocument(page);
        await page.waitForSelector(storeProductSelector);
  
        // Store the number of merchant products loaded
        let storeMerchantProducts = await queryAllByTestId($document, storeProductTestId)
        const storeMerchantProductsCount = storeMerchantProducts.length;
  
        // Load more products...
        const loadStoreBtn = await getByTestId($document, loadStoreBtnProductTestId);
        await loadStoreBtn.click()
  
        // Expect new products to have been loaded
        await wait(async () => {
          storeMerchantProducts = await queryAllByTestId($document, storeProductTestId)
          expect(storeMerchantProducts.length).toBeGreaterThan(storeMerchantProductsCount)
        })
      })
  
      done()
    }, 1600000);  
  })
});