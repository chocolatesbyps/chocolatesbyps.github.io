import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactWidget from './ContactWidget';

const Layout = () => {
    return (
        <div className="site-shell flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ContactWidget />
        </div>
    );
};

export default Layout;
