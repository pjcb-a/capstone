import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactForm } from './ContactForm'

function submitForm() {
  fireEvent.submit(screen.getByRole('form', { name: 'Contact form' }))
}

describe('ContactForm', () => {
  it('shows required field errors for an empty submission', () => {
    render(<ContactForm />)

    submitForm()

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email is required.')).toBeInTheDocument()
    expect(screen.getByText('Message is required.')).toBeInTheDocument()
    expect(screen.queryByText('Thanks for reaching out.')).not.toBeInTheDocument()
  })

  it('rejects an invalid email address', () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } })
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'A considered project proposal.' },
    })
    submitForm()

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.queryByText('Thanks for reaching out.')).not.toBeInTheDocument()
  })

  it('rejects a message shorter than 10 characters', () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } })
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Too short' } })
    submitForm()

    expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument()
    expect(screen.queryByText('Thanks for reaching out.')).not.toBeInTheDocument()
  })

  it('shows a success state for valid submission', () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } })
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'I would love to discuss a new project.' },
    })
    submitForm()

    expect(screen.getByRole('heading', { name: 'Thanks for reaching out.' })).toBeInTheDocument()
  })
})
