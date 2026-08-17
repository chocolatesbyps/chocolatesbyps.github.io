import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/api';
import SEO from '../components/SEO';
import { Search } from 'lucide-react';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const tagFilter = searchParams.get('tag');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const allPosts = await fetchBlogPosts();
                // Sort posts by date descending (latest first)
                const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Failed to load blog posts", error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesTag = tagFilter ? post.tags.includes(tagFilter) : true;
        const matchesSearch = searchTerm
            ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesTag && matchesSearch;
    });

    const allTags = [...new Set(posts.flatMap(p => p.tags))];

    if (loading) return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;

    return (
        <>
            <SEO title="Blog" description="Stories, tips, and chocolate knowledge from Chocolates By PS." />

            <div className="bg-amber-50 py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-serif text-amber-900 mb-2">Our Blog</h1>
                    <p className="text-amber-800/80">Sweet stories and chocolate tips.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredPosts.map(post => (
                                    <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 h-full flex flex-col">
                                            <div className="aspect-video overflow-hidden bg-gray-100">
                                                <img
                                                    src={post.banner}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
                                                    {post.tags.map(tag => (
                                                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition">
                                                    {post.title}
                                                </h2>
                                                <p className="text-gray-600 text-sm mb-4 flex-1">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                                    <span>{post.author}</span>
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-12">No posts found matching your criteria.</p>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="md:w-80 flex-shrink-0 space-y-8">
                        {/* Search */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Search</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    to="/blog"
                                    className={`px-3 py-1 rounded-full text-sm border transition ${!tagFilter ? 'bg-amber-900 text-white border-amber-900' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-500'}`}
                                >
                                    All
                                </Link>
                                {allTags.map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/blog?tag=${tag}`}
                                        className={`px-3 py-1 rounded-full text-sm border transition ${tagFilter === tag ? 'bg-amber-900 text-white border-amber-900' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-500'}`}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogList;
