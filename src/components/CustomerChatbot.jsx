import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Check, ChevronLeft, Headphones, MessageCircle, Minimize2, Send, Sparkles, X } from 'lucide-react';

// Keep the notification destination in one place.  WhatsApp numbers use the
// international format without a leading + or spaces.
const ADMIN_WHATSAPP_NUMBER = '9779840099441';

const quickQuestions = [
    'What chocolates do you have?',
    'Can I place a custom order?',
    'How can I order?',
    'Where are you located?'
];

const welcomeMessage = {
    id: 'welcome',
    role: 'bot',
    text: 'Hello! I’m the Chocolates By PS assistant. I can help with our chocolates, custom orders, ordering, and store details.'
};

const replyFor = (question) => {
    const text = question.toLowerCase();
    if (/(custom|personal|corporate|event|wedding|gift)/.test(text)) {
        return 'We’d love to make your occasion sweeter. Tell us the date, quantity, and idea you have in mind, and our team can help with a custom order.';
    }
    if (/(deliver|delivery|ship|shipping|arrive)/.test(text)) {
        return 'Delivery options can vary by location and order size. Share your area and preferred date with our team and they’ll confirm what is possible.';
    }
    if (/(price|cost|how much|rate)/.test(text)) {
        return 'You can browse current product prices in the shop. For custom boxes or event orders, our team will prepare a quote based on your request.';
    }
    if (/(order|buy|purchase|payment|pay)/.test(text)) {
        return 'You can add ready-to-order chocolates to your cart and check out online. For a tailored order, send your details and our team will guide you.';
    }
    if (/(where|location|address|visit|store)/.test(text)) {
        return 'You can find us in Satdobato, Lalitpur, Nepal. Our contact page has the full details and ways to reach us.';
    }
    if (/(chocolate|flavour|flavor|dark|milk|white|ingredient|allergy)/.test(text)) {
        return 'Our collection includes handcrafted chocolate treats and giftable favourites. For ingredients, dietary needs, or a specific product, our team can give you the most accurate answer.';
    }
    return 'Thanks for your question. I can share general information, and our chocolate team can give you a precise answer or help with your order.';
};

const CustomerChatbot = ({ onOpenChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([welcomeMessage]);
    const [draft, setDraft] = useState('');
    const [showContactForm, setShowContactForm] = useState(false);
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [isHandedOff, setIsHandedOff] = useState(false);
    const endRef = useRef(null);
    const inputRef = useRef(null);
    const messageIdRef = useRef(0);

    useEffect(() => {
        if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
    }, [isOpen]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [messages, showContactForm, isHandedOff]);

    const sendMessage = (value = draft) => {
        const question = value.trim();
        if (!question) return;
        messageIdRef.current += 1;
        const questionMessage = { id: `customer-${messageIdRef.current}`, role: 'customer', text: question };
        messageIdRef.current += 1;
        const answerMessage = { id: `bot-${messageIdRef.current}`, role: 'bot', text: replyFor(question) };
        setMessages((current) => [...current, questionMessage, answerMessage]);
        setDraft('');
    };

    const validateContact = () => {
        const nextErrors = {};
        if (!contact.name.trim()) nextErrors.name = 'Please enter your name.';
        if (!contact.email.trim()) nextErrors.email = 'Please enter your email.';
        else if (!/^\S+@\S+\.\S+$/.test(contact.email)) nextErrors.email = 'Please enter a valid email.';
        if (!contact.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
        return nextErrors;
    };

    const requestHumanHelp = () => {
        setShowContactForm(true);
        setIsHandedOff(false);
    };

    const submitContact = (event) => {
        event.preventDefault();
        const nextErrors = validateContact();
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const lastQuestion = [...messages].reverse().find((message) => message.role === 'customer')?.text || 'Customer requested help from the website chatbot.';
        const notification = [
            'New website chatbot enquiry',
            '',
            `Name: ${contact.name.trim()}`,
            `Phone: ${contact.phone.trim()}`,
            `Email: ${contact.email.trim()}`,
            '',
            `Question: ${lastQuestion}`
        ].join('\n');
        const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(notification)}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setIsHandedOff(true);
        setShowContactForm(false);
        setErrors({});
    };

    const updateContact = (event) => {
        const { name, value } = event.target;
        setContact((current) => ({ ...current, [name]: value }));
        if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
    };

    const closeChat = () => {
        setIsOpen(false);
        onOpenChange?.(false);
    };

    const toggleChat = () => {
        setIsOpen((current) => {
            onOpenChange?.(!current);
            return !current;
        });
    };

    return (
        <div className="customer-chatbot">
            {isOpen && (
                <section className="chat-panel" aria-label="Chocolates By PS chat assistant">
                    <header className="chat-header">
                        <div className="chat-agent-mark" aria-hidden="true"><Sparkles /></div>
                        <div><p>Chocolates By PS</p><span><i aria-hidden="true" /> Typically replies soon</span></div>
                        <button type="button" className="chat-icon-button" onClick={closeChat} aria-label="Minimize chat"><Minimize2 /></button>
                    </header>

                    <div className="chat-conversation" aria-live="polite">
                        {messages.map((message) => <div key={message.id} className={`chat-message chat-message--${message.role}`}>{message.text}</div>)}

                        {showContactForm && (
                            <form className="chat-contact-form" onSubmit={submitContact} noValidate>
                                <div className="chat-contact-heading"><ChevronLeft aria-hidden="true" /><div><strong>Let’s get you connected</strong><span>Leave your details and we’ll open a WhatsApp message for our team.</span></div></div>
                                <label htmlFor="chat-name">Name<input id="chat-name" name="name" autoComplete="name" value={contact.name} onChange={updateContact} aria-invalid={Boolean(errors.name)} /></label>
                                {errors.name && <p className="chat-field-error">{errors.name}</p>}
                                <label htmlFor="chat-email">Email<input id="chat-email" name="email" type="email" autoComplete="email" value={contact.email} onChange={updateContact} aria-invalid={Boolean(errors.email)} /></label>
                                {errors.email && <p className="chat-field-error">{errors.email}</p>}
                                <label htmlFor="chat-phone">Phone number<input id="chat-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={contact.phone} onChange={updateContact} aria-invalid={Boolean(errors.phone)} /></label>
                                {errors.phone && <p className="chat-field-error">{errors.phone}</p>}
                                <button className="chat-notify-button" type="submit"><Send aria-hidden="true" /> Notify our team on WhatsApp</button>
                                <p className="chat-privacy-note">By continuing, you’ll share these details with Chocolates By PS on WhatsApp.</p>
                            </form>
                        )}

                        {isHandedOff && <div className="chat-handoff-success" role="status"><Check aria-hidden="true" /><div><strong>Your WhatsApp message is ready.</strong><span>Please press Send in WhatsApp so our team receives your details.</span></div></div>}
                        <div ref={endRef} />
                    </div>

                    {!showContactForm && !isHandedOff && (
                        <div className="chat-suggestions">
                            {quickQuestions.slice(0, 2).map((question) => <button key={question} type="button" onClick={() => sendMessage(question)}>{question}</button>)}
                        </div>
                    )}

                    {!showContactForm && !isHandedOff && <button type="button" className="chat-human-help" onClick={requestHumanHelp}><Headphones aria-hidden="true" /> Need a person? We’ll connect you</button>}

                    {!showContactForm && !isHandedOff && (
                        <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
                            <label className="sr-only" htmlFor="chat-question">Type your question</label>
                            <input ref={inputRef} id="chat-question" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask us anything…" maxLength="500" />
                            <button type="submit" aria-label="Send question" disabled={!draft.trim()}><ArrowUp /></button>
                        </form>
                    )}
                </section>
            )}

            <button type="button" className="chat-launcher" onClick={toggleChat} aria-label={isOpen ? 'Close chat assistant' : 'Chat with Chocolates By PS'} aria-expanded={isOpen}>
                {isOpen ? <X /> : <MessageCircle />}
                {!isOpen && <span>Chat with us</span>}
            </button>
        </div>
    );
};

export default CustomerChatbot;
