import { render, screen } from '@testing-library/react'
import App from './App'
import { prestamoService } from './services/prestamoService'

describe('App', () => {

  beforeEach(() => {
    vi.spyOn(prestamoService, 'getPrestamosPendientes').mockImplementation(() => [])
  })

  test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/Préstamos/i)
    expect(linkElement).toBeInTheDocument()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

})