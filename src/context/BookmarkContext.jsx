import { createContext, useContext, useEffect, useState } from 'react';
import { getBookmarks, saveBookmarks } from '../utils/storage';

const BookmarkContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState(getBookmarks);

    useEffect(() => {
        saveBookmarks(bookmarks);
    }, [bookmarks]);

    const isBookmarked = (productId) => bookmarks.some((product) => product.id === productId);

    const toggleBookmark = (product) => {
        setBookmarks((currentBookmarks) => (
            currentBookmarks.some((item) => item.id === product.id)
                ? currentBookmarks.filter((item) => item.id !== product.id)
                : [...currentBookmarks, product]
        ));
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
};
