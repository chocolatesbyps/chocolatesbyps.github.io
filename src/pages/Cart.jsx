import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) clearCart();
    };

    if (cart.items.length === 0) {
        return (
            <>
                <SEO title="Shopping Cart" />
                <section className="cart-page cart-empty-page">
                    <div className="cart-empty container mx-auto px-4 text-center">
                        <div className="cart-empty-icon" aria-hidden="true"><ShoppingBag /></div>
                        <p className="cart-eyebrow">Your basket</p>
                        <h1>Your cart is waiting.</h1>
                        <p>Discover handcrafted chocolates for everyday moments and thoughtful gifting.</p>
                        <Link to="/category/all" className="cart-primary-action"><span>Explore chocolates</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <SEO title="Shopping Cart" />
            <div className="cart-page">
                <div className="cart-shell container mx-auto px-4">
                    <Link to="/category/all" className="cart-back-link"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Continue shopping</Link>
                    <div className="cart-heading">
                        <div>
                            <p className="cart-eyebrow">Your selection</p>
                            <h1>Shopping cart</h1>
                        </div>
                        <p>{itemCount} {itemCount === 1 ? 'item' : 'items'} chosen with care</p>
                    </div>

                    <div className="cart-layout">
                        <section className="cart-items-panel" aria-label="Cart items">
                            <div className="cart-items-panel-heading"><h2>Your chocolates</h2><span>{cart.items.length} {cart.items.length === 1 ? 'selection' : 'selections'}</span></div>
                            <div className="cart-item-list">
                                {cart.items.map((item) => {
                                    const itemPrice = item.variation ? item.price + (item.variation.priceModifier || 0) : item.price;
                                    const itemKey = `${item.id}-${JSON.stringify(item.variation)}`;
                                    return (
                                        <article key={itemKey} className="cart-item">
                                            <Link to={`/product/${item.slug}`} className="cart-item-image"><img src={item.images[0]} alt={item.title} /></Link>
                                            <div className="cart-item-details">
                                                <div className="cart-item-title-row">
                                                    <div>
                                                        <h3><Link to={`/product/${item.slug}`}>{item.title}</Link></h3>
                                                        {item.variation && <p className="cart-item-variation">{item.variation.name}: {item.variation.label}</p>}
                                                    </div>
                                                    <button type="button" onClick={() => removeFromCart(item.id, item.variation)} className="cart-remove" aria-label={`Remove ${item.title} from cart`}><Trash2 className="h-[18px] w-[18px]" aria-hidden="true" /></button>
                                                </div>
                                                <p className="cart-unit-price">{cart.currency} {itemPrice.toFixed(2)} each</p>
                                                <div className="cart-item-footer">
                                                    <div className="cart-quantity" aria-label={`Quantity for ${item.title}`}>
                                                        <button type="button" onClick={() => updateQuantity(item.id, item.variation, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.title} quantity`}><Minus className="h-4 w-4" aria-hidden="true" /></button>
                                                        <output aria-live="polite">{item.quantity}</output>
                                                        <button type="button" onClick={() => updateQuantity(item.id, item.variation, item.quantity + 1)} aria-label={`Increase ${item.title} quantity`}><Plus className="h-4 w-4" aria-hidden="true" /></button>
                                                    </div>
                                                    <p className="cart-item-total">{cart.currency} {(itemPrice * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <aside className="cart-summary" aria-label="Order summary">
                            <div className="cart-summary-card">
                                <p className="cart-eyebrow">Order summary</p>
                                <h2>Ready when you are.</h2>
                                <div className="cart-summary-line"><span>Subtotal</span><strong>{cart.currency} {cartTotal.toFixed(2)}</strong></div>
                                <div className="cart-summary-line cart-summary-line--shipping"><span>Delivery</span><span>Calculated at checkout</span></div>
                                <div className="cart-summary-total"><span>Total</span><strong>{cart.currency} {cartTotal.toFixed(2)}</strong></div>
                                <Link to="/checkout" className="cart-primary-action"><span>Proceed to checkout</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                                <p className="cart-assurance"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Your order details are reviewed before confirmation.</p>
                            </div>
                            <div className="cart-danger-zone">
                                <p>Need to start over?</p>
                                <button type="button" onClick={handleClearCart}>Clear entire cart</button>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
