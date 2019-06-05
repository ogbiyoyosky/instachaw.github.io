import * as React from 'react'
import { render, cleanup } from 'react-testing-library'
import { StoreMerchandiseFeed } from '@Components';

const storeProducts = require('../../__mocks__/store.json').items;

const setup = ({
  storeProducts = [],
  isFetchingStoreProducts=false,
  canLoadStoreProducts=false
}) => {
  const {
    queryByTestId,
    queryAllByTestId,
    getByTestId
  } = render(
    <StoreMerchandiseFeed
      storeId={2}
      storeTitle={'Genesis, Choba'}
      storeProducts={storeProducts}
      isFetchingStoreProducts={isFetchingStoreProducts}
      canLoadStoreProducts={canLoadStoreProducts}
      handleNextStoreMerchandiseFetch={() => {}}
    />
  )

  return {
    queryByTestId,
    queryAllByTestId,
    getByTestId
  }
}

afterEach(cleanup)

describe('Store merchandise feed', () => {
  describe('Skeletal placeholder', () => {
    test('should render a skeletal placeholder if no merchandise is provided', () => {
      const { queryByTestId } = setup({
        storeProducts: [],
        isFetchingStoreProducts: true
      });
      
      expect(queryByTestId('store-merchandise-skeletal')).toBeInstanceOf(HTMLElement);
    })
  
    test('the skeletal placeholder container should have more than one skeleton entry', () => {
      const { queryAllByTestId } = setup({
        storeProducts: [],
        isFetchingStoreProducts: true
      });
      
      expect(queryAllByTestId('store-product-item-skeleton').length).toBeGreaterThan(1);
    })
  })

  describe('Merchandise feed', () => {
    test('should render 5 entries', () => {
      const { queryAllByTestId } = setup({
        storeProducts: storeProducts
      });
      
      expect(queryAllByTestId('store-merchant-product').length).toBe(5);
    })
  })

  describe('Load more button', () => {
    test('should be disabled if loading', () => {
      const { getByTestId } = setup({
        storeProducts: storeProducts,
        canLoadStoreProducts: true,
        isFetchingStoreProducts: true
      });

      const loadStoreProductsBtn = getByTestId('load-store-products-btn');
      
      expect(loadStoreProductsBtn.hasAttribute('disabled')).toBeTruthy();
    })
    test('should not be disabled if not loading', () => {
      const { getByTestId } = setup({
        storeProducts: storeProducts,
        canLoadStoreProducts: true,
        isFetchingStoreProducts: false
      });

      const loadStoreProductsBtn = getByTestId('load-store-products-btn');
      
      expect(loadStoreProductsBtn.hasAttribute('disabled')).toBeFalsy();
    })
  })
})