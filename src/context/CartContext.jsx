import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, saveCart, clearCart as clearStorageCart } from '../utils/storage';

const CartContext = createContext();

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

    const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cart.items.reduce((total, item) => {
        const price = item.variation ? (item.price + (item.variation.priceModifier || 0)) : item.price;
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                cartItemCount,
                cartTotal,
                recentAddedItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
