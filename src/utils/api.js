/**
 * Fetches data from the public/data directory.
 * @param {string} filename - The name of the JSON file to fetch (e.g., 'products.json').
 * @returns {Promise<any>} - The parsed JSON data.
 */
export const fetchData = async (filename) => {
    try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${filename}:`, error);
        throw error;
    }
};

export const fetchProducts = () => fetchData('products.json');
export const fetchBlogPosts = () => fetchData('blog.json');
export const fetchTestimonials = () => fetchData('testimonials.json');
export const fetchEvents = async () => {
    const response = await fetch('/data/events.json');
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
};
