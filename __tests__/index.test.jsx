// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders main content', () => {
    render(<Home />)

    const mainContent = document.getElementsByClassName('list-group');

    expect(mainContent).toBeTruthy();
  })
})