import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import SEO from '../components/SEO';
import ProductGrid from '../components/ProductGrid';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Category = () => {
    const { slug } = useParams();
    // const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const allProducts = await fetchProducts();
                setProducts(allProducts);

                // Set default price range to max
                const maxPrice = Math.max(...allProducts.map(p => p.price), 100);
                setPriceRange([0, Math.ceil(maxPrice)]);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by Category
        if (slug && slug !== 'all') {
            result = result.filter(p => p.category === slug || (p.tags && p.tags.includes(slug)));
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else {
            // Default to featured or id
            result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        return result;
    }, [products, slug, priceRange, sortBy]);

    const categories = [...new Set(products.map(p => p.category))];
    const maxPrice = Math.max(...products.map(p => p.price), 100);

    if (loading) return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;

    return (
        <>
            <SEO title={slug === 'all' ? 'Shop All' : `Category: ${slug}`} />

            <div className="bg-amber-50 py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-serif text-amber-900 capitalize mb-2">
                        {slug === 'all' ? 'All Chocolates' : slug.replace('-', ' ')}
                    </h1>
                    <p className="text-amber-800/80">Discover our handcrafted selection.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </h3>

                                {/* Price Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max={Math.ceil(maxPrice)}
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                                        <span>NPR 0</span>
                                        <span>NPR {priceRange[1]}</span>
                                    </div>
                                </div>

                                {/* Categories List */}
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>
                                            <a href="/category/all" className={`hover:text-amber-700 ${slug === 'all' ? 'font-bold text-amber-700' : 'text-gray-600'}`}>
                                                All Products
                                            </a>
                                        </li>
                                        {categories.map(cat => (
                                            <li key={cat}>
                                                <a href={`/category/${cat}`} className={`capitalize hover:text-amber-700 ${slug === cat ? 'font-bold text-amber-700' : 'text-gray-600'}`}>
                                                    {cat.replace('-', ' ')}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <button
                                className="md:hidden flex items-center gap-2 text-gray-700 font-medium"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </button>

                            <div className="flex items-center gap-2 ml-auto">
                                <label className="text-sm text-gray-600 hidden sm:block">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border-gray-300 rounded-md text-sm focus:ring-amber-500 focus:border-amber-500"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <ProductGrid products={filteredProducts} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
