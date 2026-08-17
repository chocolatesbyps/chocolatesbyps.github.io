import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogPreview = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="blog-section py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <p className="eyebrow mb-3">From the journal</p>
                        <h2 className="text-3xl md:text-5xl font-bold section-title mb-2">Latest from the Blog</h2>
                        <p className="section-copy">Stories, tips, and chocolate knowledge.</p>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center gap-2 text-amber-700 font-bold hover:text-amber-900 transition">
                        View All Posts <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                            <div className="dark-card rounded-xl overflow-hidden transition h-full flex flex-col">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.banner}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded whitespace-nowrap">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#f4eee7] mb-3 group-hover:text-[#e7a86d] transition">
                                        {post.title}
                                    </h3>
                                    <p className="dark-muted text-sm mb-4 flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-sm font-medium text-gray-500">
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-amber-700 font-bold hover:text-amber-900 transition">
                        View All Posts <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
