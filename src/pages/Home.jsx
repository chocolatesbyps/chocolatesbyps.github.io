import { useState, useEffect } from 'react';
import { fetchProducts, fetchBlogPosts, fetchTestimonials, fetchEvents } from '../utils/api';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import BlogPreview from '../components/BlogPreview';
import EventsCarousel from '../components/EventsCarousel';
import { MessageCircle, Phone } from 'lucide-react';

const phoneNumber = '9779840099441';

const Home = () => {
    const [data, setData] = useState({
        products: [],
        blogPosts: [],
        testimonials: [],
        events: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [products, blogPosts, testimonials, events] = await Promise.all([
                    fetchProducts(),
                    fetchBlogPosts(),
                    fetchTestimonials(),
                    fetchEvents()
                ]);

                // Filter featured products
                const featured = products.filter(p => p.isFeatured).slice(0, 8);

                // Sort blog posts by date descending
                const sortedBlogPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

                setData({
                    products: featured,
                    blogPosts: sortedBlogPosts,
                    testimonials,
                    events
                });
            } catch (error) {
                console.error("Failed to load homepage data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <>
            <SEO title="Home" />
            <Hero />
            <section className="home-promise" aria-label="Our chocolate promise">
                <div className="container mx-auto grid grid-cols-1 divide-y divide-[#f4d2a5]/15 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <p><strong>Small-batch</strong><span>Made with patient attention</span></p>
                    <p><strong>Gift-ready</strong><span>Beautifully made to share</span></p>
                    <p><strong>From Nepal</strong><span>Local craft, elevated</span></p>
                </div>
            </section>
            <FeaturedProducts products={data.products} />

            {/* Event Highlights */}
            <EventsCarousel events={data.events} />

            <BlogPreview posts={data.blogPosts} />

            {/* Direct product questions */}
            <section className="home-contact-strip py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="mb-3 text-3xl font-bold font-serif">Have a Question About a Product?</h2>
                    <p className="mx-auto mb-7 max-w-xl text-amber-100/80">
                        Send us a message on WhatsApp or Viber and we'll get back to you directly.
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello Chocolates By PS, I have a question about a product.')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-bold transition hover:bg-green-600"
                        >
                            <MessageCircle className="h-5 w-5" /> WhatsApp Us
                        </a>
                        <a
                            href={`viber://chat?number=%2B${phoneNumber}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-bold transition hover:bg-purple-700"
                        >
                            <Phone className="h-5 w-5" /> Message on Viber
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="home-testimonials py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-serif text-center text-amber-900 mb-12">What Our Customers Say</h2>

                    {/* Static Grid for first 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {data.testimonials.slice(0, 3).map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card p-8 rounded-2xl shadow-sm text-center">
                                <p className="text-lg text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src={testimonial.photo || (testimonial.gender === 'female' ? 'https://avatar.iran.liara.run/public/girl' : 'https://avatar.iran.liara.run/public/boy')}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel for remaining */}
                    {data.testimonials.length > 3 && (
                        <TestimonialsCarousel testimonials={data.testimonials.slice(3)} />
                    )}
                </div>
            </section>

        </>
    );
};

export default Home;
