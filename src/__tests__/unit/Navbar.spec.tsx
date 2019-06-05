import * as React from 'react'
import {render, cleanup} from 'react-testing-library'
import { Navbar } from '@Components';

const setup = () => {
  const { getByTestId } = render(<Navbar />)
  const searchBar = getByTestId('search-bar')
  const navMenuToggle = getByTestId('navbar-menu-toggle')
  const navBrand = getByTestId('navbar-brand')

  return {
    searchBar,
    navMenuToggle,
    navBrand
  }
}

afterEach(cleanup)

describe('<Navbar />', () => {
  test('it should render a searchbar', () => {
    const { searchBar } = setup();
  
    expect(searchBar).toBeInstanceOf(HTMLElement);
  })

  test('it should render a menu toggle', () => {
    const { navMenuToggle } = setup();
  
    expect(navMenuToggle).toBeInstanceOf(HTMLElement);
  })

  test('it should render a brand', () => {
    const { navBrand } = setup();
  
    expect(navBrand).toBeInstanceOf(HTMLElement);
  })
})