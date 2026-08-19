import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDownUp, Check, ChevronDown, ChevronRight, Filter, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { fetchProducts } from '../utils/api';
import SEO from '../components/SEO';
import ProductGrid from '../components/ProductGrid';

const formatCategory = (category) => category.replace(/-/g, ' ');
const sortOptions = [
    { value: 'featured', label: 'Featured first', description: 'Our current favorites' },
    { value: 'price-asc', label: 'Price: low to high', description: 'Start with the sweetest deal' },
    { value: 'price-desc', label: 'Price: high to low', description: 'See premium picks first' }
];

const Category = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState('featured');
    const sortMenuRef = useRef(null);
    const sortTriggerRef = useRef(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const allProducts = await fetchProducts();
                setProducts(allProducts);
                setPriceRange([0, Math.ceil(Math.max(...allProducts.map((product) => product.price), 100))]);
            } catch (error) {
                console.error('Failed to load products', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        if (!showSortMenu) return undefined;

        const closeOnOutsideClick = (event) => {
            if (!sortMenuRef.current?.contains(event.target)) setShowSortMenu(false);
        };
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setShowSortMenu(false);
                sortTriggerRef.current?.focus();
            }
        };

        document.addEventListener('mousedown', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('mousedown', closeOnOutsideClick);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [showSortMenu]);

    const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);
    const maxPrice = Math.max(...products.map((product) => product.price), 100);
    const categoryName = slug === 'all' ? 'All chocolates' : formatCategory(slug || 'chocolates');
    const selectedSort = sortOptions.find((option) => option.value === sortBy);

    const filteredProducts = useMemo(() => {
        const result = products
            .filter((product) => !slug || slug === 'all' || product.category === slug || product.tags?.includes(slug))
            .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

        return [...result].sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured));
        });
    }, [products, slug, priceRange, sortBy]);

    if (loading) return <div className="category-loading" role="status">Curating something sweet…</div>;

    return (
        <>
            <SEO title={slug === 'all' ? 'Shop All' : `Category: ${categoryName}`} />

            <section className="category-hero" aria-labelledby="category-heading">
                <div className="category-hero__glow category-hero__glow--one" aria-hidden="true" />
                <div className="category-hero__glow category-hero__glow--two" aria-hidden="true" />
                <div className="category-hero__truffle category-hero__truffle--one" aria-hidden="true" />
                <div className="category-hero__truffle category-hero__truffle--two" aria-hidden="true" />
                <div className="category-hero__drizzle" aria-hidden="true" />
                <div className="category-hero__inner container mx-auto px-4">
                    <div className="category-hero__content">
                        <p className="category-hero__eyebrow"><Sparkles aria-hidden="true" /> Handcrafted in small batches</p>
                        <h1 id="category-heading">{categoryName}</h1>
                        <p>Thoughtful chocolate, made to be lingered over, gifted generously, and enjoyed down to the last bite.</p>
                        <div className="category-hero__meta" aria-label="Collection details">
                            <span>{filteredProducts.length} selections</span>
                            <span>Made with care in Lalitpur</span>
                        </div>
                    </div>
                    <div className="category-hero__art" aria-hidden="true">
                        <div className="category-hero__image-frame"><img src="/images/products/aaila_chocolates.jpg" alt="" /></div>
                        <span className="category-hero__seal">Made<br />for joy</span>
                    </div>
                </div>
            </section>

            <main className="category-page">
                <div className="category-shell container mx-auto px-4">
                    <div className="category-heading-row">
                        <div><p className="category-kicker">The collection</p><h2>Find your next favorite.</h2></div>
                        <p className="category-result-count" aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? 'chocolate' : 'chocolates'} to explore</p>
                    </div>

                    <div className="category-layout">
                        <aside className={`category-filters ${showFilters ? 'is-open' : ''}`} aria-label="Product filters">
                            <div className="category-filters__heading"><h3><Filter aria-hidden="true" /> Refine your pick</h3><button type="button" className="category-filter-close" onClick={() => setShowFilters(false)} aria-label="Close filters"><X aria-hidden="true" /></button></div>
                            <div className="category-filter-group">
                                <label htmlFor="price-range">Price up to <strong>NPR {priceRange[1]}</strong></label>
                                <input id="price-range" type="range" min="0" max={Math.ceil(maxPrice)} value={priceRange[1]} onChange={(event) => setPriceRange([0, Number(event.target.value)])} />
                                <div className="category-range-labels"><span>NPR 0</span><span>NPR {Math.ceil(maxPrice)}</span></div>
                            </div>
                            <nav className="category-filter-group" aria-label="Chocolate categories">
                                <p>Shop by style</p>
                                <div className="category-links">
                                    <Link to="/category/all" state={{ preserveScroll: true }} onClick={() => setShowFilters(false)} className={slug === 'all' ? 'is-active' : ''}>All chocolates <ChevronRight aria-hidden="true" /></Link>
                                    {categories.map((category) => <Link key={category} to={`/category/${category}`} state={{ preserveScroll: true }} onClick={() => setShowFilters(false)} className={slug === category ? 'is-active' : ''}>{formatCategory(category)} <ChevronRight aria-hidden="true" /></Link>)}
                                </div>
                            </nav>
                        </aside>

                        <div className="category-products">
                            <div className="category-toolbar">
                                <button type="button" className="category-filter-toggle" onClick={() => setShowFilters(true)} aria-expanded={showFilters}><SlidersHorizontal aria-hidden="true" /> Filter & refine</button>
                                <div className="category-sort" ref={sortMenuRef}>
                                    <span className="category-sort__label"><ArrowDownUp aria-hidden="true" /> Sort by</span>
                                    <button ref={sortTriggerRef} type="button" className="category-sort__trigger" onClick={() => setShowSortMenu((open) => !open)} aria-expanded={showSortMenu} aria-haspopup="true" aria-controls="category-sort-options">
                                        <span>{selectedSort.label}</span><ChevronDown aria-hidden="true" className={showSortMenu ? 'is-open' : ''} />
                                    </button>
                                    {showSortMenu && (
                                        <div id="category-sort-options" className="category-sort__menu" aria-label="Sort chocolates">
                                            {sortOptions.map((option) => (
                                                <button key={option.value} type="button" className={sortBy === option.value ? 'is-selected' : ''} aria-pressed={sortBy === option.value} onClick={() => { setSortBy(option.value); setShowSortMenu(false); requestAnimationFrame(() => sortTriggerRef.current?.focus()); }}>
                                                    <span><strong>{option.label}</strong><small>{option.description}</small></span>
                                                    {sortBy === option.value && <Check aria-hidden="true" />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ProductGrid products={filteredProducts} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Category;
