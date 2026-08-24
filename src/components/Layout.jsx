import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactWidget from './ContactWidget';
import CustomerChatbot from './CustomerChatbot';

const Layout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="site-shell flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ContactWidget isChatOpen={isChatOpen} />
            <CustomerChatbot onOpenChange={setIsChatOpen} />
        </div>
    );
};

export default Layout;
