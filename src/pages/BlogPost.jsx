import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowLeft, ArrowUpRight, Calendar, User } from 'lucide-react';

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

            <article className="article-page">
                <header className="article-masthead">
                    <div className="article-masthead__ring article-masthead__ring--one" aria-hidden="true" />
                    <div className="article-masthead__ring article-masthead__ring--two" aria-hidden="true" />
                    <div className="container relative mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-16">
                        <Link to="/blog" className="article-back-link">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to journal
                        </Link>
                        <div className="article-header-content">
                            <div className="article-header-tags">
                                {post.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}
                            </div>
                            <h1>{post.title}</h1>
                            <p>{post.excerpt}</p>
                            <div className="article-byline">
                                <span><User className="h-4 w-4" aria-hidden="true" /> {post.author}</span>
                                <span><Calendar className="h-4 w-4" aria-hidden="true" /> {post.date}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="article-shell container mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6 md:pb-24 md:pt-12">
                    <figure className="article-banner">
                        <img src={post.banner} alt={post.title} className="h-full w-full object-cover" />
                        <figcaption>Handmade moments from Chocolates By PS</figcaption>
                    </figure>

                    <div className="article-reading-column">
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <section className="article-tags" aria-labelledby="article-topics">
                            <h2 id="article-topics">Explore this story</h2>
                            <div>
                                {post.tags.map(tag => (
                                    <Link key={tag} to={`/blog?tag=${tag}`}>{tag}</Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {relatedPosts.length > 0 && (
                        <section className="related-stories" aria-labelledby="related-stories-heading">
                            <div className="related-stories__heading">
                                <div>
                                    <p className="journal-eyebrow">Keep reading</p>
                                    <h2 id="related-stories-heading">More to savour</h2>
                                </div>
                                <Link to="/blog">All stories <ArrowUpRight aria-hidden="true" /></Link>
                            </div>
                            <div className="related-stories__grid">
                                {relatedPosts.map(related => (
                                    <Link key={related.id} to={`/blog/${related.slug}`} className="related-story group">
                                        <div className="related-story__image">
                                            <img src={related.banner} alt={related.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                                        </div>
                                        <div className="related-story__body">
                                            <span>{related.date}</span>
                                            <h3>{related.title}</h3>
                                            <p>{related.excerpt}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </>
    );
};

export default BlogPost;
