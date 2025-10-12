import { useState } from 'react';

type Status = { type: 'idle' | 'sending' | 'success' | 'error'; message?: string };

// flip this to false later if you wire a real API
const DEMO_CONTACT = true;
// if you want to keep messages locally while demoing:
const SAVE_LOCALLY = false;

const Contact = () => {
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '', // honeypot
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const saveLocally = () => {
    try {
      const key = 'mg_contact_drafts';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      current.unshift({
        ...form,
        date: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(current.slice(0, 200)));
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !validEmail(form.email) || !form.message) {
      setStatus({ type: 'error', message: 'Please fill name, a valid email, and a message.' });
      return;
    }
    if (form.company) {
      // honeypot hit
      setStatus({ type: 'success', message: 'Thanks! (No action taken.)' });
      return;
    }

    setStatus({ type: 'sending' });

    if (DEMO_CONTACT) {
      // FAKE SEND — no API call
      await new Promise((r) => setTimeout(r, 800));
      if (SAVE_LOCALLY) saveLocally();
      setStatus({
        type: 'success',
        message: SAVE_LOCALLY ? 'Message saved locally (demo).' : 'Demo mode: message acknowledged (not sent).',
      });
      setForm({ name: '', email: '', subject: '', message: '', company: '' });
      return;
    }

    // REAL SEND (hook this up when ready)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' });
      setForm({ name: '', email: '', subject: '', message: '', company: '' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || 'Could not send message.' });
    }
  };

  return (
    <section className="contact page-stack">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">Contact</h1>
        <span className="contact__meta">
          {DEMO_CONTACT ? 'Demo mode: messages are not sent.' : 'We usually reply within 1–2 business days.'}
        </span>
      </header>

      <article className="surface-dark contact__panel">
        <form className="contact__form" onSubmit={onSubmit} noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
            className="hp"
            aria-hidden="true"
          />

          <div className="form__row">
            <div className="form__field">
              <label htmlFor="name">
                Name<span aria-hidden="true"> *</span>
              </label>
              <input id="name" name="name" type="text" value={form.name} onChange={onChange} required />
            </div>

            <div className="form__field">
              <label htmlFor="email">
                Email<span aria-hidden="true"> *</span>
              </label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={onChange}
              placeholder="How can we help?"
            />
          </div>

          <div className="form__field">
            <label htmlFor="message">
              Message<span aria-hidden="true"> *</span>
            </label>
            <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} required />
          </div>

          <div className="form__actions">
            <button className="btn btn--brand" type="submit" disabled={status.type === 'sending'}>
              {status.type === 'sending' ? 'Sending…' : DEMO_CONTACT ? 'Send (Demo)' : 'Send Message'}
            </button>

            {status.type === 'error' && (
              <p className="form__status form__status--error" role="alert">
                {status.message}
              </p>
            )}
            {status.type === 'success' && (
              <p className="form__status form__status--success" role="status">
                {status.message}
              </p>
            )}
          </div>
        </form>
      </article>

      <article className="surface-dark contact__panel">
        <h2 className="contact__h2">Other ways to reach us</h2>
        <ul className="contact__list">
          <li>
            <strong>Address:</strong> 123 Misty Lane, Fogtown
          </li>
          <li>
            <strong>Email:</strong> info@mistgate.com
          </li>
          <li>
            <strong>Phone:</strong> +1 (234) 567-89
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Contact;
