import * as React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { Hamburger } from '@Components';

const setup = () => {
  const { getByTestId } = render(
    <Hamburger
      width={24}
      height={8}
      strokeWidth={3}
      animationDuration={6}
      rotate={0}
      borderRadius={64}
      color={'#000'}  
    />
  )
  const hamburgerNode = getByTestId('hamburger')

  return { hamburgerNode }
}

afterEach(cleanup)

describe('<Hamburger />', () => {
  test('it should render in a closed state', () => {
    const { hamburgerNode } = setup()


    expect(hamburgerNode.classList.contains('hamburgerLineOpen')).toBeFalsy()
    expect(hamburgerNode.classList.contains('hamburgerLineClose')).toBeTruthy()
  })

  test('it should transform to an open state when it is clicked', () => {
    const { getByTestId } = render(<Hamburger />)

    const hamburgerNode = getByTestId('hamburger')

    fireEvent.click(hamburgerNode, 'click')

    expect(hamburgerNode.classList.contains('hamburgerLineClose')).toBeFalsy()
    expect(hamburgerNode.classList.contains('hamburgerLineOpen')).toBeTruthy()
  })
})