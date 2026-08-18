import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useBookmarks } from '../context/BookmarkContext';
import SEO from '../components/SEO';
import { Bookmark, Minus, Plus, ShoppingBag, X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const Product = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isBookmarked, toggleBookmark } = useBookmarks();

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

    useEffect(() => {
        if (!isImageViewerOpen) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setIsImageViewerOpen(false);
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [isImageViewerOpen]);

    if (loading) return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
    if (!product) return null;

    const currentPrice = selectedVariation
        ? product.price + (selectedVariation.priceModifier || 0)
        : product.price;

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariation);
    };

    const bookmarked = isBookmarked(product?.id);

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

            <main className="product-page">
                <div className="product-page__glow product-page__glow--top" aria-hidden="true" />
                <div className="product-page__glow product-page__glow--bottom" aria-hidden="true" />
                <div className="product-page__container container mx-auto px-4 py-7 md:px-6 md:py-12">
                    <nav aria-label="Breadcrumb" className="product-breadcrumb">
                        <Link to="/">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link to="/category/all">Shop</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">{product.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,.96fr)] lg:gap-16">
                    {/* Image Gallery */}
                    <section className="product-gallery" aria-label={`${product.title} gallery`}>
                        <button
                            type="button"
                            onClick={openImageViewer}
                            aria-label={`Zoom in on ${product.title}`}
                            className="product-hero-image group relative block aspect-square w-full overflow-hidden"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                            />
                            <span className="product-zoom-cue absolute bottom-4 right-4" aria-hidden="true">
                                <ZoomIn className="h-5 w-5" />
                            </span>
                        </button>
                        {product.images.length > 1 && (
                            <div className="product-thumbnails" aria-label="Choose a product image">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(idx)}
                                        aria-label={`Show image ${idx + 1} of ${product.images.length}`}
                                        aria-current={selectedImage === idx ? 'true' : undefined}
                                        className={`product-thumbnail ${selectedImage === idx ? 'is-active' : ''}`}
                                    >
                                        <img src={img} alt="" className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Product Info */}
                    <section className="product-summary">
                        <p className="product-kicker">Chocolates By PS <span aria-hidden="true">•</span> Artisan confection</p>
                        <div className="product-title-row">
                            <h1>{product.title}</h1>
                            {product.compareAtPrice && <span className="product-collection-badge">Giftable</span>}
                        </div>
                        <div className="product-price-row">
                            <span className="product-price">
                                {product.currency} {currentPrice.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="product-compare-price">
                                    {product.currency} {product.compareAtPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="product-description">
                            {product.description}
                        </p>

                        {/* Variations */}
                        {product.variations && product.variations.map((variation, idx) => (
                            <fieldset key={idx} className="product-options">
                                <legend>
                                    {variation.name}
                                    {selectedVariation?.name === variation.name && <span> — {selectedVariation.label}</span>}
                                </legend>
                                <div className="product-option-list">
                                    {variation.options.map((option) => (
                                        <button
                                            key={option.sku}
                                            type="button"
                                            onClick={() => setSelectedVariation({ name: variation.name, ...option })}
                                            aria-pressed={selectedVariation?.sku === option.sku}
                                            className={`product-option ${selectedVariation?.sku === option.sku ? 'is-selected' : ''}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        ))}

                        {/* Quantity & Add to Cart */}
                        <div className="product-purchase-area">
                            <div className="product-quantity" aria-label="Quantity selector">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="product-quantity-button"
                                    aria-label="Decrease quantity"
                                    disabled={quantity === 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <output className="product-quantity-value" aria-live="polite">{quantity}</output>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="product-quantity-button"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button type="button" onClick={handleAddToCart} className="product-add-button">
                                <ShoppingBag className="w-5 h-5" aria-hidden="true" /> Add {quantity} to bag
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleBookmark(product)}
                                className={`product-save-button ${bookmarked ? 'is-saved' : ''}`}
                                aria-label={`${bookmarked ? 'Remove' : 'Save'} ${product.title} ${bookmarked ? 'from' : 'to'} bookmarks`}
                                aria-pressed={bookmarked}
                            >
                                <Bookmark className="h-5 w-5" fill={bookmarked ? 'currentColor' : 'none'} />
                                <span>{bookmarked ? 'Saved for later' : 'Save for later'}</span>
                            </button>
                        </div>

                        <div className="product-assurances" aria-label="Product assurances">
                            <div><ShieldCheck aria-hidden="true" /><span>Made in small batches</span></div>
                            <div><Truck aria-hidden="true" /><span>Carefully packed for delivery</span></div>
                        </div>

                        <div className="product-meta">
                            <div className="product-tags">
                                {product.tags && product.tags.map(tag => (
                                    <span key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p>SKU: <span>{selectedVariation ? selectedVariation.sku : product.sku}</span></p>
                        </div>
                    </section>
                    </div>
                </div>
            </main>

            {isImageViewerOpen && (
                <div
                    className="product-image-viewer fixed inset-0 z-[60] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${product.title} image viewer`}
                    onClick={() => setIsImageViewerOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsImageViewerOpen(false)}
                        aria-label="Close image viewer"
                        className="product-viewer-close absolute right-4 top-4"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="flex max-h-full max-w-5xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
                        <div className="product-viewer-image max-h-[75vh] overflow-hidden">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                style={{ transform: `scale(${imageZoom})` }}
                                className="max-h-[75vh] max-w-full object-contain transition-transform duration-200"
                            />
                        </div>
                        <div className="product-viewer-tools flex items-center gap-2 px-3 py-2">
                            <button type="button" onClick={() => setImageZoom(Math.max(1, imageZoom - 0.25))} aria-label="Zoom out"><ZoomOut className="h-5 w-5" /></button>
                            <span className="min-w-14 text-center text-sm font-medium">{Math.round(imageZoom * 100)}%</span>
                            <button type="button" onClick={() => setImageZoom(Math.min(3, imageZoom + 0.25))} aria-label="Zoom in"><ZoomIn className="h-5 w-5" /></button>
                            <button type="button" onClick={() => setImageZoom(1)} aria-label="Reset zoom"><RotateCcw className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;
