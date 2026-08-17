const CART_KEY = 'chocolates_by_ps_cart';

export const getCart = () => {
    try {
        const storedCart = localStorage.getItem(CART_KEY);
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            parsedCart.currency = 'NPR';
            return parsedCart;
        }
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
    }
    return { items: [], currency: 'NPR' };
};

export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

export const clearCart = () => {
    try {
        localStorage.removeItem(CART_KEY);
    } catch (error) {
        console.error('Error clearing cart from localStorage:', error);
    }
};
