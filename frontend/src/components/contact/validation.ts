export type ContactField = 'name' | 'email' | 'message'

export type ContactValues = Record<ContactField, string>

export type ContactErrors = Partial<Record<ContactField, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactField(
  field: ContactField,
  value: string,
): string | undefined {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return `${field.charAt(0).toUpperCase()}${field.slice(1)} is required.`
  }

  if (field === 'email' && !emailPattern.test(trimmedValue)) {
    return 'Enter a valid email address.'
  }

  if (field === 'message' && trimmedValue.length < 10) {
    return 'Message must be at least 10 characters.'
  }

  return undefined
}

export function validateContact(values: ContactValues): ContactErrors {
  return (Object.keys(values) as ContactField[]).reduce<ContactErrors>(
    (errors, field) => {
      const error = validateContactField(field, values[field])

      if (error) {
        errors[field] = error
      }

      return errors
    },
    {},
  )
}
