import { useState, type ChangeEvent, type FormEvent } from 'react'
import './ContactForm.css'
import {
  type ContactErrors,
  type ContactField,
  type ContactValues,
  validateContact,
  validateContactField,
} from './validation'

const initialValues: ContactValues = {
  name: '',
  email: '',
  message: '',
}

const fields: Array<{
  name: ContactField
  label: string
  type?: 'email' | 'text'
  placeholder: string
}> = [
  { name: 'name', label: 'Name', placeholder: 'Your name' },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
  },
]

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField
    const value = event.target.value

    setValues((currentValues) => ({ ...currentValues, [field]: value }))

    if (errors[field]) {
      const error = validateContactField(field, value)
      setErrors((currentErrors) => ({ ...currentErrors, [field]: error }))
    }
  }

  function validateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField
    const error = validateContactField(field, event.target.value)
    setErrors((currentErrors) => ({ ...currentErrors, [field]: error }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitted(true)
  }

  function resetForm() {
    setValues(initialValues)
    setErrors({})
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <section className="contact-card contact-success" aria-labelledby="success-title">
        <p className="contact-kicker">Message received</p>
        <h1 id="success-title">Thanks for reaching out.</h1>
        <p className="contact-success-copy">Your note is ready to be read. I will get back to you soon.</p>
        <button className="contact-button" type="button" onClick={resetForm}>
          Send another message
        </button>
      </section>
    )
  }

  return (
    <section className="contact-card" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="contact-kicker">Portfolio contact</p>
        <h1 id="contact-title">Let&apos;s make something good.</h1>
        <p className="contact-intro">Share a little about your idea, project, or opportunity.</p>
      </div>

      <form className="contact-form" aria-label="Contact form" noValidate onSubmit={handleSubmit}>
        {fields.map((field) => {
          const error = errors[field.name]
          const errorId = `${field.name}-error`

          return (
            <div className="form-field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                aria-describedby={error ? errorId : undefined}
                aria-invalid={Boolean(error)}
                id={field.name}
                name={field.name}
                onBlur={validateField}
                onChange={updateValue}
                placeholder={field.placeholder}
                required
                type={field.type ?? 'text'}
                value={values[field.name]}
              />
              {error && (
                <p className="field-error" id={errorId} role="alert">
                  {error}
                </p>
              )}
            </div>
          )
        })}

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={Boolean(errors.message)}
            id="message"
            minLength={10}
            name="message"
            onBlur={validateField}
            onChange={updateValue}
            placeholder="What would you like to create?"
            required
            rows={5}
            value={values.message}
          />
          {errors.message && (
            <p className="field-error" id="message-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button className="contact-button" type="submit">
          Send message
        </button>
      </form>
    </section>
  )
}
