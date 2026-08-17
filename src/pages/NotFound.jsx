import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <SEO title="Page Not Found" />
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mb-8">The page you are looking for does not exist.</p>
                <Link to="/" className="text-amber-600 hover:text-amber-800 underline">Go back home</Link>
            </div>
        </>
    );
};

export default NotFound;
