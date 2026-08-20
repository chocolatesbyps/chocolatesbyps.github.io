import ProductCard from './ProductCard';

const ProductGrid = ({ products, className = '' }) => {
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-500 py-8">No products found.</p>;
    }

    return (
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${className}`.trim()}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
