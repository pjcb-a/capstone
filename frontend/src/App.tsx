import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'

const portfolioEmail = 'hello@averymorgan.dev'

type ContactForm = {
  name: string
  email: string
  project: string
  message: string
}

const emptyForm: ContactForm = { name: '', email: '', project: '', message: '' }

function App() {
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [isPreparing, setIsPreparing] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setIsReady(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPreparing(true)

    const subject = form.project || `Hello from ${form.name}`
    const body = [
      'Hi Avery,',
      '',
      form.message,
      '',
      'Best,',
      form.name,
      form.email,
    ].join('\n')

    window.setTimeout(() => {
      window.location.href = `mailto:${portfolioEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setIsPreparing(false)
      setIsReady(true)
    }, 250)
  }

  return (
    <main className="contact-page">
      <header className="site-header">
        <a className="wordmark" href="#contact" aria-label="Avery Morgan contact page">
          AM<span>.</span>
        </a>
        <p className="availability"><span /> Available for select projects</p>
      </header>

      <section className="contact-layout" id="contact" aria-labelledby="contact-title">
        <div className="intro">
          <p className="eyebrow">Get in touch</p>
          <h1 id="contact-title">Have a good idea?<br />Let&apos;s make it real.</h1>
          <p className="intro-copy">
            I partner with thoughtful teams to design and build digital experiences that feel clear, useful, and memorable.
          </p>

          <div className="contact-details" aria-label="Contact details">
            <a href={`mailto:${portfolioEmail}`}>{portfolioEmail}</a>
            <a href="tel:+15550148692">+1 555 014 8692</a>
          </div>

          <div className="location-note">
            <span className="location-mark" aria-hidden="true" />
            <p>Based in New York<br />Working worldwide</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <p>Start a conversation</p>
            <span>Fields marked * are required</span>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Your name <b>*</b></span>
              <input name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Jane Smith" required />
            </label>
            <label className="field">
              <span>Email address <b>*</b></span>
              <input type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="jane@company.com" required />
            </label>
          </div>

          <label className="field">
            <span>What are you working on?</span>
            <input name="project" value={form.project} onChange={updateField} placeholder="A new brand, site, product..." />
          </label>

          <label className="field message-field">
            <span>Tell me a little more <b>*</b></span>
            <textarea name="message" value={form.message} onChange={updateField} placeholder="A few details about your project, timeline, and goals." rows={5} required />
          </label>

          <div className="form-footer">
            <p className={isReady ? 'form-status is-ready' : 'form-status'} role="status">
              {isReady ? 'Your email draft is ready to send.' : 'I usually reply within two business days.'}
            </p>
            <button type="submit" disabled={isPreparing}>
              {isPreparing ? 'Preparing...' : 'Send message'}
              <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </form>
      </section>

      <footer className="site-footer">
        <p>© 2026 Avery Morgan</p>
        <div>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer">Behance</a>
        </div>
      </footer>
    </main>
  )
}

export default App
