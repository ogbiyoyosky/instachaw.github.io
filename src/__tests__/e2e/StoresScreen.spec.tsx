import { setupPuppeteer } from '../test-utils';
import { wait } from 'react-testing-library';

const { getDocument, queries } = require('pptr-testing-library')
const { queryAllByTestId } = queries;

const storesUrl = 'http://localhost:3000/stores';

describe('Stores Page', () => {  
  test('Contains more than one store', async (done) => {
    await setupPuppeteer(storesUrl, async (page:any) => {
      const storesSelector = '[data-testid="stores-feed-item"]';

      const $document = await getDocument(page);
      await page.waitForSelector(storesSelector);

      await wait(async () => {
        const storesFeedItems = await queryAllByTestId($document, 'stores-feed-item')

        expect(storesFeedItems.length).toBeGreaterThan(1)
      })

      done()
    })
  }, 160000);
});