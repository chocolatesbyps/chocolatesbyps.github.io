import { useRef, useState } from 'react';
import SEO from '../components/SEO';
import { ArrowDown, Check, Facebook, Instagram, Mail, MapPin, MessageCircleHeart, Music2, Phone, Send, Sparkles } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const errorSummaryRef = useRef(null);

    const validate = () => {
        const nextErrors = {};
        if (!formData.name.trim()) nextErrors.name = 'Please tell us your name.';
        if (!formData.email.trim()) nextErrors.email = 'Please share your email address.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.';
        if (!formData.subject.trim()) nextErrors.subject = 'Please add a subject.';
        if (!formData.message.trim()) nextErrors.message = 'Please include a message.';
        return nextErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
        if (submitError) setSubmitError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }
        setIsSubmitting(true);
        setSubmitError('');
        try {
            const response = await fetch('https://formsubmit.co/ajax/pramitshrest@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message, _subject: `New Contact Form Submission: ${formData.subject}`, _template: 'table' })
            });
            if (!response.ok) throw new Error('Form submission failed');
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError('We could not send your note just now. Please try again, or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fieldProps = (name) => ({ id: name, name, value: formData[name], onChange: handleChange, required: true, 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });

    return (
        <>
            <SEO title="Contact Us" />
            <section className="contact-hero contact-hero--rich" aria-labelledby="contact-heading">
                <div className="contact-hero__orb contact-hero__orb--one" aria-hidden="true" /><div className="contact-hero__orb contact-hero__orb--two" aria-hidden="true" />
                <div className="contact-hero__truffle contact-hero__truffle--one" aria-hidden="true" /><div className="contact-hero__truffle contact-hero__truffle--two" aria-hidden="true" /><div className="contact-hero__ribbon" aria-hidden="true" />
                <div className="contact-hero__inner container mx-auto px-4">
                    <div>
                        <p className="contact-hero__eyebrow"><Sparkles aria-hidden="true" /> A little note can start something sweet</p>
                        <h1 id="contact-heading"><em>Let’s make</em><br /><em>something delicious.</em></h1>
                        <p>From a thoughtful gift to a custom chocolate moment, tell us what you have in mind. We’re all ears—and cocoa.</p>
                        <a className="contact-hero__cta" href="#contact-form">Write to us <ArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className="contact-hero__promise" aria-label="Service promise"><MessageCircleHeart aria-hidden="true" /><p>Personal answers,<br /><strong>made with care.</strong></p><span>Usually within 1–2 business days</span></div>
                </div>
            </section>

            <main className="contact-page contact-page--redesigned">
                <div className="contact-layout container mx-auto px-4">
                    <aside className="contact-details" aria-labelledby="contact-details-heading">
                        <p className="contact-kicker">The details</p><h2 id="contact-details-heading">Come say hello.</h2>
                        <p className="contact-details__intro">Whether it’s a question, a custom order, or an idea worth melting over, we’d love to hear it.</p>
                        <ul className="contact-detail-list">
                            <li><span className="contact-detail-icon"><MapPin aria-hidden="true" /></span><div><h3>Visit the studio</h3><p>Satdobato, Lalitpur<br />Nepal</p></div></li>
                            <li><span className="contact-detail-icon"><Mail aria-hidden="true" /></span><div><h3>Send an email</h3><a href="mailto:chocolatesbyps@gmail.com">chocolatesbyps@gmail.com</a></div></li>
                            <li><span className="contact-detail-icon"><Phone aria-hidden="true" /></span><div><h3>Give us a call</h3><a href="tel:+9779840099441">+977 9840099441</a></div></li>
                        </ul>
                        <div className="contact-socials"><p>Find little moments of joy</p><div>
                            <a href="https://www.facebook.com/share/1A8HJtpNxX/" target="_blank" rel="noreferrer" aria-label="Follow Chocolates By PS on Facebook" className="social-link"><Facebook aria-hidden="true" /></a>
                            <a href="https://www.instagram.com/chocolatesbyps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Follow Chocolates By PS on Instagram" className="social-link"><Instagram aria-hidden="true" /></a>
                            <a href="https://www.tiktok.com/@chocolates.by.ps?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label="Follow Chocolates By PS on TikTok" className="social-link"><Music2 aria-hidden="true" /></a></div></div>
                    </aside>

                    <section id="contact-form" className="contact-form-panel contact-form-panel--redesigned" aria-labelledby="message-heading">
                        <div className="form-heading"><p className="contact-kicker">Start a conversation</p><h2 id="message-heading">Send us a note.</h2><p>Share a few details and we’ll take it from there.</p></div>
                        {submitted && <div className="contact-success" role="status"><Check aria-hidden="true" /><div><strong>Your message is on its way.</strong><p>Thank you—we’ll be in touch soon.</p></div></div>}
                        {submitError && <div className="contact-submit-error" role="alert">{submitError}</div>}
                        <form onSubmit={handleSubmit} noValidate>
                            {Object.keys(errors).length > 0 && <div ref={errorSummaryRef} className="contact-error-summary" role="alert" tabIndex="-1"><strong>Please correct the highlighted fields:</strong><ul>{Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul></div>}
                            <div className="contact-form-grid">
                                <div className="contact-field"><label htmlFor="name">Your name <span aria-hidden="true">*</span></label><input type="text" autoComplete="name" {...fieldProps('name')} />{errors.name && <p id="name-error" className="contact-field-error" role="alert">{errors.name}</p>}</div>
                                <div className="contact-field"><label htmlFor="email">Email address <span aria-hidden="true">*</span></label><input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />{errors.email && <p id="email-error" className="contact-field-error" role="alert">{errors.email}</p>}</div>
                            </div>
                            <div className="contact-field"><label htmlFor="subject">What can we help with? <span aria-hidden="true">*</span></label><input type="text" autoComplete="off" {...fieldProps('subject')} />{errors.subject && <p id="subject-error" className="contact-field-error" role="alert">{errors.subject}</p>}</div>
                            <div className="contact-field"><label htmlFor="message">Your message <span aria-hidden="true">*</span></label><textarea rows="6" {...fieldProps('message')} />{errors.message && <p id="message-error" className="contact-field-error" role="alert">{errors.message}</p>}</div>
                            <button type="submit" disabled={isSubmitting} className="contact-submit">{isSubmitting ? 'Sending your note…' : <><Send aria-hidden="true" /> Send message</>}</button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Contact;
