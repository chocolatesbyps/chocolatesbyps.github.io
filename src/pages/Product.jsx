import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { Minus, Plus, ShoppingBag, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const Product = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [imageZoom, setImageZoom] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const products = await fetchProducts();
                const found = products.find(p => p.slug === slug);
                if (found) {
                    setProduct(found);
                    // Select first variation option by default if exists
                    if (found.variations && found.variations.length > 0) {
                        const firstVar = found.variations[0];
                        if (firstVar.options.length > 0) {
                            setSelectedVariation({
                                name: firstVar.name,
                                ...firstVar.options[0]
                            });
                        }
                    }
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [slug, navigate]);

    if (loading) return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
    if (!product) return null;

    const currentPrice = selectedVariation
        ? product.price + (selectedVariation.priceModifier || 0)
        : product.price;

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariation);
    };

    const openImageViewer = () => {
        setImageZoom(1);
        setIsImageViewerOpen(true);
    };

    return (
        <>
            <SEO
                title={product.seo?.title || product.title}
                description={product.seo?.description || product.description}
                image={product.images[0]}
            />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": product.title,
                    "image": product.images,
                    "description": product.description,
                    "sku": product.sku,
                    "offers": {
                        "@type": "Offer",
                        "url": window.location.href,
                        "priceCurrency": product.currency,
                        "price": currentPrice.toFixed(2),
                        "availability": "https://schema.org/InStock"
                    }
                })}
            </script>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={openImageViewer}
                            aria-label={`Zoom in on ${product.title}`}
                            className="group relative block aspect-square w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-100"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-amber-900 shadow-sm">
                                <ZoomIn className="h-5 w-5" />
                            </span>
                        </button>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-amber-600' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">{product.title}</h1>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-2xl font-bold text-amber-900">
                                {product.currency} {currentPrice.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                    {product.currency} {product.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Variations */}
                        {product.variations && product.variations.map((variation, idx) => (
                            <div key={idx} className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {variation.name}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {variation.options.map((option) => (
                                        <button
                                            key={option.sku}
                                            onClick={() => setSelectedVariation({ name: variation.name, ...option })}
                                            className={`px-4 py-2 rounded-full border text-sm transition ${selectedVariation?.sku === option.sku
                                                    ? 'bg-amber-900 text-white border-amber-900'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-amber-500'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:text-amber-700 transition"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:text-amber-700 transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Additional Info Tabs (Simplified) */}
                        <div className="border-t border-gray-100 pt-6 space-y-4">
                            <div className="flex gap-2">
                                {product.tags && product.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">
                                SKU: {selectedVariation ? selectedVariation.sku : product.sku}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isImageViewerOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${product.title} image viewer`}
                    onClick={() => setIsImageViewerOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsImageViewerOpen(false)}
                        aria-label="Close image viewer"
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="flex max-h-full max-w-5xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
                        <div className="max-h-[75vh] overflow-hidden rounded-lg bg-white/5">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                style={{ transform: `scale(${imageZoom})` }}
                                className="max-h-[75vh] max-w-full object-contain transition-transform duration-200"
                            />
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-lg">
                            <button type="button" onClick={() => setImageZoom(Math.max(1, imageZoom - 0.25))} className="rounded-full p-2 text-gray-700 hover:bg-gray-100" aria-label="Zoom out"><ZoomOut className="h-5 w-5" /></button>
                            <span className="min-w-14 text-center text-sm font-medium text-gray-700">{Math.round(imageZoom * 100)}%</span>
                            <button type="button" onClick={() => setImageZoom(Math.min(3, imageZoom + 0.25))} className="rounded-full p-2 text-gray-700 hover:bg-gray-100" aria-label="Zoom in"><ZoomIn className="h-5 w-5" /></button>
                            <button type="button" onClick={() => setImageZoom(1)} className="rounded-full p-2 text-gray-700 hover:bg-gray-100" aria-label="Reset zoom"><RotateCcw className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;
