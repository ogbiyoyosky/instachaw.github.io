import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { StoresFeedItem } from '@Components/StoresFeed/StoresFeedItem';

const setup = ({ isVerified }: { isVerified: boolean}) => {
  const { queryByTestId } = render(
    <StoresFeedItem
      id={1}
      description={'We are a fancy eatery out in Nigeria'}
      title={'Instachaw, Choba'}
      isVerified={isVerified}
      serviceHours={'8AM - 9PM'}
      serviceFee={'N300'}
      thumbnailImageSrc={'/static/img/instachaw-brand.png'}
    />
  )
  const verificationSign = queryByTestId('verification-mark')

  return {
    verificationSign    
  }
}

afterEach(cleanup)

describe('<VerificationMark />', () => {
  test('it should render a verification mark if a store is verified', () => {
    const { verificationSign } = setup({ isVerified: true });
  
    expect(verificationSign).toBeInstanceOf(HTMLElement);
  })
  
  test('it should not render a verification mark if a store is not verified.', () => {
    const { verificationSign } = setup({ isVerified: false });
  
    expect(verificationSign).toBeNull()
  })
})