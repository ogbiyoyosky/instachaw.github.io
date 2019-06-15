import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { StoreMerchantBrief } from '@Components';

const setup = () => {
  const { getByText, getByAltText } = render(
    <StoreMerchantBrief
      title={'Instachaw, Choba'}
      storeOpenFrom={'8 AM - 9 PM'}
      serviceFee={'N300'}
      brandSrc={'/static/img/instachaw-brand.png'}
    />
  )

  return {
    getByAltText,
    getByText
  }
}

afterEach(cleanup)

describe('<StoreMerchantBrief />', () => {
  test('it should contain the store title', () => {
    const { getByText } = setup();
  
    expect(getByText('Instachaw, Choba')).toBeInstanceOf(HTMLElement);
  })

  test('it should contain the store opening times', () => {
    const { getByText } = setup();
  
    expect(getByText('8 AM - 9 PM')).toBeInstanceOf(HTMLElement);
  })

  test('it should contain the store brand logo with correct src', () => {
    const { getByAltText } = setup();
    const brandLogo = getByAltText(`Brand logo for Instachaw, Choba`);

    expect(brandLogo).toBeInstanceOf(HTMLElement);
    expect(brandLogo.getAttribute('src')).toBe('/static/img/instachaw-brand.png');
  })
})