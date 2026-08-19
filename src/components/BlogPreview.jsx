import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogPreview = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="blog-section py-12 md:py-14">
            <div className="container mx-auto px-4">
                <div className="blog-preview-heading mb-7">
                    <div>
                        <p className="eyebrow mb-2">From the journal</p>
                        <h2 className="section-title mb-2 text-3xl font-bold md:text-5xl">Latest from the Blog</h2>
                        <p className="section-copy">Stories, tips, and chocolate knowledge.</p>
                    </div>
                    <Link to="/blog" className="blog-preview-link hidden items-center gap-2 font-bold md:inline-flex">View all posts <ArrowRight className="h-4 w-4" /></Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                    {posts.slice(0, 3).map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                            <article className="dark-card blog-preview-card flex h-full overflow-hidden rounded-xl transition">
                                <div className="blog-preview-image overflow-hidden">
                                    <img src={post.banner} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                                        {post.tags.map((tag) => <span key={tag} className="whitespace-nowrap rounded bg-amber-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-amber-600">{tag}</span>)}
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold transition group-hover:text-[#b96f43]">{post.title}</h3>
                                    <p className="dark-muted mb-3 line-clamp-2 flex-1 text-sm">{post.excerpt}</p>
                                    <span className="text-sm font-medium text-gray-500">{post.date}</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <div className="mt-6 text-center md:hidden">
                    <Link to="/blog" className="blog-preview-link inline-flex items-center gap-2 font-bold">View all posts <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
