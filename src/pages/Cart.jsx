import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (cart.items.length === 0) {
        return (
            <>
                <SEO title="Shopping Cart" />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-3xl font-bold font-serif mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Looks like you haven't added any chocolates yet.</p>
                    <Link to="/category/all" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition">
                        Start Shopping
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Shopping Cart" />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold font-serif mb-8">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        {cart.items.map((item) => {
                            const itemPrice = item.variation ? (item.price + (item.variation.priceModifier || 0)) : item.price;
                            const itemKey = `${item.id}-${JSON.stringify(item.variation)}`;

                            return (
                                <div key={itemKey} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    <Link to={`/product/${item.slug}`} className="hover:text-amber-700 transition">
                                                        {item.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.variation ? `${item.variation.name}: ${item.variation.label}` : ''}
                                                    {item.variation && <br />}
                                                    <span className="text-gray-600">
                                                        Unit Price: {cart.currency} {itemPrice.toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.variation)}
                                                className="text-gray-400 hover:text-red-500 transition"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center border border-gray-200 rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.variation, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 transition"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.variation, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 transition"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="font-bold text-gray-900">
                                                {cart.currency} {(itemPrice * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80 flex-shrink-0">
                        <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                            <h2 className="text-xl font-bold font-serif mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{cart.currency} {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-sm italic">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold text-lg mb-8">
                                <span>Total</span>
                                <span>{cart.currency} {cartTotal.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
