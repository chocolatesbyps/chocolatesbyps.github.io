import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const allPosts = await fetchBlogPosts();
                const found = allPosts.find(p => p.slug === slug);

                if (found) {
                    setPost(found);
                    // Find related posts
                    if (found.related && found.related.length > 0) {
                        const related = allPosts.filter(p => found.related.includes(p.id));
                        setRelatedPosts(related);
                    }
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error("Failed to load blog post", error);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [slug, navigate]);

    if (loading) return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
    if (!post) return null;

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.banner}
                type="article"
            />

            <article className="pb-16">
                {/* Header */}
                <div className="bg-amber-50 py-12 mb-8">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-amber-700 font-medium mb-6 hover:text-amber-900">
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-600 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" /> {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {post.date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Banner Image */}
                    <div className="rounded-xl overflow-hidden mb-12 shadow-sm flex justify-center bg-gray-50">
                        <img src={post.banner} alt={post.title} className="max-w-full max-h-[350px] object-contain" />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-amber max-w-none mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    <div className="border-t border-gray-100 pt-8 mb-12">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Tags</h3>
                        <div className="flex gap-2">
                            {post.tags.map(tag => (
                                <Link
                                    key={tag}
                                    to={`/blog?tag=${tag}`}
                                    className="bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 px-3 py-1 rounded-full text-sm transition"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-6">Related Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map(related => (
                                    <Link key={related.id} to={`/blog/${related.slug}`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                                        <div className="aspect-video overflow-hidden">
                                            <img src={related.banner} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 group-hover:text-amber-700 transition mb-2">{related.title}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
};

export default BlogPost;
