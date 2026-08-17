import ProductGrid from './ProductGrid';

const FeaturedProducts = ({ products }) => {
    return (
        <section className="py-20 products-section">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="eyebrow mb-3">Curated indulgence</p>
                    <h2 className="text-3xl md:text-5xl font-bold section-title mb-4">Featured Collections</h2>
                    <p className="section-copy max-w-2xl mx-auto">
                        Our most loved creations, perfect for gifting or a personal treat.
                    </p>
                </div>

                <ProductGrid products={products} />

                <div className="text-center mt-12">
                    <a href="/category/all" className="outline-button inline-block font-bold py-3 px-8 rounded-full transition">
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
