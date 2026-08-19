import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero home-hero relative flex min-h-[640px] items-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/homepage-chocolate-banner.png"
                    alt="Handcrafted chocolates, cacao nibs, and a dark chocolate bar"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 hero-overlay"></div>
            </div>
            <div className="hero-orb hero-orb--one absolute -right-20 top-12" aria-hidden="true" />
            <div className="hero-orb hero-orb--two absolute bottom-0 right-[28%]" aria-hidden="true" />
            <div className="hero-grid absolute inset-0" aria-hidden="true" />
            <p className="hero-side-note absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-hidden="true">Made to be savoured</p>

            <div className="container relative z-10 mx-auto px-4">
                <div className="hero-content max-w-3xl">
                    <p className="hero-kicker mb-5"><Sparkles className="h-4 w-4" aria-hidden="true" /> Small batch / Nepal</p>
                    <h1 className="hero-title mb-6 text-5xl font-medium leading-[.9] md:text-8xl">
                        A little <span>luxury</span><br /> in every bite.
                    </h1>
                    <p className="hero-copy mb-9 max-w-xl text-lg md:text-xl">
                        Thoughtfully crafted chocolates, made in Nepal for celebrations, small moments, and everything in between.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link to="/category/all" className="hero-cta inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold">
                            Explore chocolates <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link to="/about" className="hero-link rounded-full px-4 py-3 font-semibold">Our story</Link>
                    </div>
                    <div className="hero-trust mt-10" aria-label="Chocolates By PS highlights">
                        <span>Handcrafted in Lalitpur</span><span>Premium ingredients</span><span>Made for gifting</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
