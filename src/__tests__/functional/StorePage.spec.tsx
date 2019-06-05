import * as React from 'react'
import { Provider } from 'react-redux';
import { render, cleanup, wait } from 'react-testing-library'
import withRedux from 'next-redux-wrapper';

import StoreEndpoints from '@Store/Store/endpoints'
import StorePage from '../../../pages/store';
import storeMain from '@Store'

let App:any = ({ store, ...props }:any) => (
  <Provider store={store}>
    <StorePage isLoadingStore={false} router={{  query: { slug: 'store-1' } }} />
  </Provider>
)

App = withRedux(storeMain)(App)

const setup = () => {
  const { container, debug, getByText, queryByTestId, queryAllByTestId } = render(<App />)

  return {
    getByText,
    container,
    queryByTestId,
    queryAllByTestId,
    debug
  }
}

const storeProductData = require('../../__mocks__/store.json')
const storeData = require('../../__mocks__/stores.json').stores[0]

beforeEach(() => {
  global.fetch.resetMocks()
})

describe('Store tests', () => {
  test('it should make a request, receive fulfillment and display a list of products on the page', async () => {
    const responsePayload = JSON.stringify(storeData)
    global.fetch.mockResponseOnce(responsePayload)

    const { queryAllByTestId } = setup();

    await wait(() => {
      expect(queryAllByTestId('store-merchant-product').length).toBeGreaterThan(1);
    });

  })

  afterEach(cleanup)
});