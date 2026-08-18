import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowUpRight, Search } from 'lucide-react';

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

            <main className="journal-page">
                <section className="journal-hero">
                    <div className="journal-hero__ring journal-hero__ring--one" aria-hidden="true" />
                    <div className="journal-hero__ring journal-hero__ring--two" aria-hidden="true" />
                    <div className="container relative mx-auto px-4 py-16 text-center md:py-20">
                        <p className="journal-eyebrow">The Chocolates By PS journal</p>
                        <h1>Stories to savour</h1>
                        <p>Thoughtful notes on chocolate, gifting, and the small moments worth sharing.</p>
                    </div>
                </section>

                <div className="journal-content container mx-auto px-4 py-10 md:py-14">
                    <div className="journal-layout">
                        {/* Main Content */}
                        <section aria-label="Journal articles" className="min-w-0">
                            <div className="journal-section-heading">
                                <div>
                                    <p className="journal-eyebrow">From our kitchen</p>
                                    <h2>{tagFilter ? `${tagFilter} stories` : 'Latest from the journal'}</h2>
                                </div>
                                <span>{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</span>
                            </div>
                            {filteredPosts.length > 0 ? (
                                <div className="journal-card-grid">
                                    {filteredPosts.map(post => (
                                        <Link key={post.id} to={`/blog/${post.slug}`} className="journal-card group">
                                            <div className="journal-card__image">
                                                <img
                                                    src={post.banner}
                                                    alt={post.title}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                                                />
                                            </div>
                                            <div className="journal-card__body">
                                                <div className="journal-card__tags">
                                                    {post.tags.slice(0, 2).map(tag => (
                                                        <span key={tag}>{tag}</span>
                                                    ))}
                                                </div>
                                                <h2>{post.title}</h2>
                                                <p>{post.excerpt}</p>
                                                <div className="journal-card__footer">
                                                    <span>{post.date}</span>
                                                    <span className="journal-read-link">Read story <ArrowUpRight aria-hidden="true" /></span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="journal-empty">
                                    <h2>No stories found</h2>
                                    <p>Try a different word or explore all of our journal entries.</p>
                                    <Link to="/blog">View all stories</Link>
                                </div>
                            )}
                        </section>

                        {/* Sidebar */}
                        <aside className="journal-sidebar" aria-label="Blog filters">
                            <div className="journal-sidebar__intro">
                                <p className="journal-eyebrow">A little pause</p>
                                <p>Made in Nepal, one small batch at a time.</p>
                            </div>
                            <div className="journal-filter">
                                <label htmlFor="blog-search">Search the journal</label>
                                <div className="journal-search-field">
                                    <Search className="h-4 w-4" aria-hidden="true" />
                                    <input
                                        id="blog-search"
                                        type="search"
                                        placeholder="Search stories"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="journal-filter">
                                <h2>Explore by topic</h2>
                                <div className="journal-tag-list">
                                    <Link to="/blog" className={!tagFilter ? 'is-active' : ''}>All stories</Link>
                                    {allTags.map(tag => (
                                        <Link key={tag} to={`/blog?tag=${tag}`} className={tagFilter === tag ? 'is-active' : ''}>
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BlogList;
