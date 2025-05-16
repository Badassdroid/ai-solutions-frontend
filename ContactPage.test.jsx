import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactPage from './ContactPage'

describe('ContactPage Component', () => {
  test('renders all required input fields', () => {
    render(<ContactPage />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/i agree to the processing/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit message/i })).toBeInTheDocument()
  })

  test('shows error if required fields are missing', () => {
    render(<ContactPage />)

    fireEvent.click(screen.getByRole('button', { name: /submit message/i }))
    expect(screen.getByText(/please fill out all required fields/i)).toBeInTheDocument()
  })

  test('submits form when all required fields are filled', async () => {
    render(<ContactPage />)

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'General Question' },
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'I am interested in your services.' },
    })
    fireEvent.click(screen.getByLabelText(/i agree to the processing/i))

    fireEvent.click(screen.getByRole('button', { name: /submit message/i }))

    // Wait for simulated async success (setTimeout)
    await waitFor(() => {
      expect(
        screen.getByText(/thank you for your message!/i)
      ).toBeInTheDocument()
    })
  })
})
