import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { StoreMerchantProduct } from '@Components/StoreMerchant/StoreMerchantProduct';

const setup = () => {
  const { getByText} = render(
    <StoreMerchantProduct
      productId={1}
      productTitle={'Hamburger'}
      productPrice={200}
      productDesc={''}
      photo={'hamburger.jpg'}
      storePath={'/store/kilimanjaro-choba-1'}
      storeId={1}
    />
  )

  return {
    getByText
  }
}

afterEach(cleanup)

describe('<StoreMerchantProduct />', () => {
  test('it should contain the product title', () => {
    const { getByText } = setup();
  
    expect(getByText('Hamburger')).toBeInstanceOf(HTMLElement);
  })

  test('it should contain the product price', () => {
    const { getByText } = setup();
  
    expect(getByText('N200')).toBeInstanceOf(HTMLElement);
  })
})