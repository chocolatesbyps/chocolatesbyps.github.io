import { MessageCircle, Phone } from 'lucide-react';

const phoneNumber = '9779840099441';

const ContactWidget = () => (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <div className="hidden rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg sm:block">
            Questions? Message us directly
        </div>
        <div className="flex gap-2">
            <a
                href={`viber://chat?number=%2B${phoneNumber}`}
                aria-label="Contact us on Viber"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition hover:bg-purple-700 hover:scale-105"
                title="Message us on Viber"
            >
                <Phone className="h-5 w-5" />
            </a>
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello Chocolates By PS, I have a question about a product.')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Contact us on WhatsApp"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:scale-105"
                title="Message us on WhatsApp"
            >
                <MessageCircle className="h-7 w-7" />
            </a>
        </div>
    </div>
);

export default ContactWidget;
