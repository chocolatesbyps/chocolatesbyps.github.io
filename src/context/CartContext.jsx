import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, saveCart, clearCart as clearStorageCart } from '../utils/storage';

const CartContext = createContext();

// Add or update customer-facing promotions here. In a production checkout,
// validate these codes again on the server before taking payment.
const PROMO_CODES = {
    SWEET10: { code: 'SWEET10', type: 'percentage', value: 10, description: '10% off your order' },
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = getCart();
        return savedCart || { items: [], currency: 'NPR' };
    });
    const [recentAddedItem, setRecentAddedItem] = useState(null);

    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    const addToCart = (product, quantity = 1, variation = null) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.items.findIndex(
                (item) => item.id === product.id && JSON.stringify(item.variation) === JSON.stringify(variation)
            );

            let newItems;

            if (existingItemIndex > -1) {
                // Keep the updater immutable. React may invoke updater
                // functions more than once in development.
                newItems = prevCart.items.map((item, index) => (
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ));
            } else {
                newItems = [...prevCart.items, {
                    ...product,
                    quantity,
                    variation,
                }];
            }

            return { ...prevCart, items: newItems };
        });

        // Show recently added item in header modal for 3s
        setRecentAddedItem({
            title: product.title,
            quantity,
            variationLabel: variation?.label || null,
        });

        setTimeout(() => {
            setRecentAddedItem(null);
        }, 3000);
    };

    const updateQuantity = (itemId, variation, quantity) => {
        if (quantity < 1) return;
        setCart((prevCart) => {
            const newItems = prevCart.items.map((item) => {
                if (item.id === itemId && JSON.stringify(item.variation) === JSON.stringify(variation)) {
                    return { ...item, quantity };
                }
                return item;
            });
            return { ...prevCart, items: newItems };
        });
    };

    const removeFromCart = (itemId, variation) => {
        setCart((prevCart) => {
            const newItems = prevCart.items.filter(
                (item) => !(item.id === itemId && JSON.stringify(item.variation) === JSON.stringify(variation))
            );
            return { ...prevCart, items: newItems };
        });
    };

    const clearCart = () => {
        setCart({ items: [], currency: 'NPR' });
        clearStorageCart();
    };

    const applyPromoCode = (code) => {
        const normalizedCode = code.trim().toUpperCase();
        const promotion = PROMO_CODES[normalizedCode];

        if (!normalizedCode) return { success: false, message: 'Enter a promo code to continue.' };
        if (!promotion) return { success: false, message: 'That promo code is not valid.' };
        if (!cart.items.length) return { success: false, message: 'Add an item before applying a promo code.' };

        setCart((previous) => ({ ...previous, promo: promotion }));
        return { success: true, message: `${promotion.code} applied — ${promotion.description}.` };
    };

    const removePromoCode = () => {
        setCart((previous) => ({ ...previous, promo: null }));
    };

    const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    const cartSubtotal = cart.items.reduce((total, item) => {
        const price = item.variation ? (item.price + (item.variation.priceModifier || 0)) : item.price;
        return total + price * item.quantity;
    }, 0);
    const appliedPromo = cart.promo && PROMO_CODES[cart.promo.code] ? PROMO_CODES[cart.promo.code] : null;
    const cartDiscount = appliedPromo?.type === 'percentage'
        ? Number((cartSubtotal * (appliedPromo.value / 100)).toFixed(2))
        : 0;
    const cartTotal = Number(Math.max(0, cartSubtotal - cartDiscount).toFixed(2));

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                applyPromoCode,
                removePromoCode,
                cartItemCount,
                cartSubtotal,
                cartDiscount,
                cartTotal,
                appliedPromo,
                recentAddedItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
