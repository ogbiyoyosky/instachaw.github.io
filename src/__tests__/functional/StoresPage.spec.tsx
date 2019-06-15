import * as React from 'react'
import { Provider } from 'react-redux';
import { render, cleanup, wait, fireEvent, getByTestId } from 'react-testing-library'
import withRedux from 'next-redux-wrapper';

import StoresPage from '../../../pages/stores';
import storeMain from '@Store'

let App:any = ({ store, ...props }:any) => (
  <Provider store={store}>
    <StoresPage router={props.router} />
  </Provider>
)

App = withRedux(storeMain)(App)

const setup = () => {
  const { container, getByTestId, queryByTestId, queryAllByTestId } = render(<App />)

  return {
    container,
    queryByTestId,
    queryAllByTestId,
    getByTestId
  }
}

describe('Store tests', () => {
  const responsePayload = JSON.stringify(require('../../__mocks__/stores.json'))

  beforeEach(() => {
    global.fetch.resetMocks()
  })

  test('it should fulfill a request, display a list of stores on the page and load more stores', async () => {
    global.fetch.mockResponseOnce(responsePayload)

    const { queryAllByTestId } = setup();

    await wait(async () => {
      expect(queryAllByTestId('stores-feed-item').length).toBeGreaterThan(1);
    });
  })

  afterEach(cleanup)
});