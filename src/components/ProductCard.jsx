import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleQuickAdd = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link to={`/product/${product.slug}`} className="group block h-full">
            <div className="product-card overflow-hidden transition h-full flex flex-col">
                <div className="product-image relative aspect-square overflow-hidden flex-shrink-0">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                    />
                    {product.compareAtPrice && (
                        <span className="absolute top-3 left-3 sale-tag text-xs font-bold px-3 py-1 rounded">
                            Sale
                        </span>
                    )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#f4eee7] group-hover:text-[#e7a86d] transition mb-1 truncate" title={product.title}>{product.title}</h3>
                    <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#e7a86d]">
                                {product.currency} {product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    {product.currency} {product.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleQuickAdd}
                            className="add-button p-2 rounded-full transition"
                            aria-label="Add to cart"
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
