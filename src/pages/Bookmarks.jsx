import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import SEO from '../components/SEO';
import ProductGrid from '../components/ProductGrid';

const Bookmarks = () => {
    const { bookmarks } = useBookmarks();

    return (
        <>
            <SEO title="Saved Chocolates" description="Your saved Chocolates By PS products." />
            <section className="saved-products-page py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <Bookmark className="mx-auto mb-4 h-8 w-8 text-amber-700" aria-hidden="true" />
                        <p className="eyebrow mb-3">Your collection</p>
                        <h1 className="section-title text-4xl font-bold md:text-5xl">Saved Chocolates</h1>
                        <p className="section-copy mt-4">Keep your favourite treats here for when you are ready to order.</p>
                    </div>

                    {bookmarks.length > 0 ? (
                        <ProductGrid products={bookmarks} />
                    ) : (
                        <div className="saved-empty mx-auto max-w-xl rounded-2xl px-6 py-12 text-center">
                            <Bookmark className="mx-auto mb-4 h-9 w-9 text-amber-700" aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-bold text-amber-950">Nothing saved yet</h2>
                            <p className="mt-3 text-gray-600">Use the bookmark button on a chocolate to save it for later.</p>
                            <Link to="/category/all" className="copper-button mt-6 inline-flex rounded-lg px-5 py-3 font-bold transition">Browse chocolates</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Bookmarks;
