import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { BookmarkProvider } from './context/BookmarkContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';
import Bookmarks from './pages/Bookmarks';
import { MAINTENANCE_MODE } from './config/site';

function App() {
  if (MAINTENANCE_MODE) {
    return (
      <HelmetProvider>
        <Maintenance />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <CartProvider>
        <BookmarkProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="category/:slug" element={<Category />} />
                <Route path="product/:slug" element={<Product />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="blog" element={<BlogList />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </BookmarkProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
