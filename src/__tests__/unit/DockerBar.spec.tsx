import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { DockerBar } from '@Components';

const setup = () => {
  const { getByTestId } = render(<DockerBar />)
  const homeIcon = getByTestId('dockerbar-home-icon')
  const basketIcon = getByTestId('dockerbar-basket-icon')
  const accountIcon = getByTestId('dockerbar-account-icon')

  return {
    homeIcon,
    basketIcon,
    accountIcon
  }
}

afterEach(cleanup)

describe('<DockerBar />', () => {
  test('it should render a home icon', () => {
    const { homeIcon } = setup();
  
    expect(homeIcon).toBeInstanceOf(HTMLElement);
  })

  test('it should render a basket icon', () => {
    const { basketIcon } = setup();
  
    expect(basketIcon).toBeInstanceOf(HTMLElement);
  })

  test('it should render an account icon', () => {
    const { accountIcon } = setup();
  
    expect(accountIcon).toBeInstanceOf(HTMLElement);
  })
})