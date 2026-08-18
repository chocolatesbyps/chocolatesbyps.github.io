import { Link } from 'react-router-dom';
import { Bookmark, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useBookmarks } from '../context/BookmarkContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItemCount, recentAddedItem } = useCart();
    const { bookmarks } = useBookmarks();

    return (
        <header className="site-header sticky top-0 z-50">
            <div className="header-inner container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="brand-mark" aria-label="Chocolates By PS home">
                    <img
                        src="/images/logo.png"
                        alt="Chocolates By PS"
                        width="500"
                        height="500"
                        className="brand-logo"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav hidden md:flex items-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/category/all" className="nav-link">Shop</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link to="/bookmarks" className="bookmark-link relative transition" aria-label={`Saved chocolates${bookmarks.length ? ` (${bookmarks.length})` : ''}`}>
                        <Bookmark className="w-5 h-5" />
                        {bookmarks.length > 0 && (
                            <span className="bookmark-count absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {bookmarks.length}
                            </span>
                        )}
                    </Link>
                    <div className="relative">
                        <Link to="/cart" className="cart-link relative transition block">
                            <ShoppingBag className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="cart-count absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        
                        {/* Cart Notification Modal */}
                        {recentAddedItem && (
                            <div className="absolute top-full right-0 mt-4 w-72 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="text-sm font-medium text-gray-900 mb-1">Items added to cart</div>
                                <div className="text-amber-700 text-sm">
                                    <span className="font-bold">{recentAddedItem.quantity}x</span> {recentAddedItem.title}
                                    {recentAddedItem.variationLabel && <span className="text-gray-500"> ({recentAddedItem.variationLabel})</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                            className="menu-toggle md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="mobile-nav md:hidden border-t py-4 px-4 flex flex-col space-y-4">
                    <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/category/all" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link to="/blog" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                    <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
