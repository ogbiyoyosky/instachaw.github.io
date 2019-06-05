import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { StoresFeed } from '@Components';

const stores = require('../../__mocks__/stores.json').stores

const setup = ({
  isFetchingStores,
  storesList
}: any) => {
  const { getByText, queryAllByTestId } = render(
    <StoresFeed
      isFetchingStores={isFetchingStores}
      stores={storesList}
    />
  )

  return {
    getByText,
    queryAllByTestId
  }
}

afterEach(cleanup)

describe('<StoresFeedItem />', () => {
  test('it should contain more than one store', () => {
    const { queryAllByTestId } = setup({
      storesList: stores,
      isFetchingStores: false
    });
  
    expect(queryAllByTestId('stores-feed-item').length).toBeGreaterThan(1);
  })

  test('it should render a skeleton screen when empty', () => {
    const { queryAllByTestId } = setup({
      storesList: [],
      isFetchingStores: true
    });
  
    expect(queryAllByTestId('stores-feed-item-skeleton').length).toBeGreaterThan(1);
  })
})