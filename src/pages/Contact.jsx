import { useState } from 'react';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Music2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setIsSubmitting(true);
            try {
                const response = await fetch("https://formsubmit.co/ajax/pramitshrest@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        _subject: `New Contact Form Submission: ${formData.subject}`,
                        _template: 'table'
                    })
                });

                if (response.ok) {
                    setSubmitted(true);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    // Keep the thank you message visible for longer or indefinitely until user navigates away
                    // setTimeout(() => setSubmitted(false), 5000); 
                } else {
                    console.error("Form submission failed");
                    alert("Something went wrong. Please try again later.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("There was an error sending your message. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            <SEO title="Contact Us" />

            <div className="contact-hero py-10 mb-4">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-serif text-amber-900 mb-2">Get in Touch</h1>
                    <p className="text-amber-800/80">We'd love to hear from you.</p>
                </div>
            </div>

            <div className="contact-page container mx-auto px-4 py-5 pb-12">
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="contact-info md:w-1/3 space-y-5">
                        <div>
                            <h3 className="text-xl font-bold font-serif text-gray-900 mb-4">Contact Information</h3>
                            <p className="text-gray-600 mb-6">
                                Have a question about our chocolates or want to place a custom order? Reach out to us!
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-full text-amber-800">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Visit Us</h4>
                                        <p className="text-gray-600">Satdobato, Lalitpur<br />Nepal</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-full text-amber-800">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Email Us</h4>
                                        <a href="mailto:pramitshrest@gmail.com" className="text-gray-600 hover:text-amber-700">chocolatesbyps@gmail.com</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-full text-amber-800">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Call Us</h4>
                                        <a href="tel:+9779810000000" className="text-gray-600 hover:text-amber-700">+977 9840099441</a>
                                    </div>
                                </li>
                            </ul>

                            <div className="contact-socials mt-7 pt-5">
                                <p className="eyebrow mb-3">Follow along</p>
                                <div className="flex items-center gap-3">
                                    <a href="https://www.facebook.com/share/1A8HJtpNxX/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link"><Facebook className="w-5 h-5" /></a>
                                    <a href="https://www.instagram.com/chocolatesbyps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link"><Instagram className="w-5 h-5" /></a>
                                    <a href="https://www.tiktok.com/@chocolates.by.ps?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label="TikTok" className="social-link"><Music2 className="w-5 h-5" /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:w-2/3">
                        <div className="contact-form-panel p-6 md:p-9 rounded-2xl">
                            <div className="form-heading mb-7">
                                <p className="eyebrow mb-2">Start a conversation</p>
                                <h3 className="text-3xl font-bold font-serif text-gray-900 mb-2">Send us a Message</h3>
                                <p className="text-sm text-gray-600">Tell us what you’re dreaming up. We’ll help make it delicious.</p>
                            </div>

                            {submitted ? (
                                <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 text-center">
                                    <p className="font-bold">Thank you for your message!</p>
                                    <p>We'll get back to you as soon as possible.</p>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="form-label block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input w-full border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="form-label block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-input w-full border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`form-input w-full border rounded-md shadow-sm ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label className="form-label block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`form-input w-full border rounded-md shadow-sm ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`form-submit w-full text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            <Send className="w-5 h-5" /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Contact;
