const CART_KEY = 'chocolates_by_ps_cart';
const BOOKMARKS_KEY = 'chocolates_by_ps_bookmarks';

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

export const getBookmarks = () => {
    try {
        const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
        return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    } catch (error) {
        console.error('Error reading bookmarks from localStorage:', error);
        return [];
    }
};

export const saveBookmarks = (bookmarks) => {
    try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Error saving bookmarks to localStorage:', error);
    }
};
