import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero relative text-white min-h-[600px] flex items-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/homepage-chocolate-banner.png"
                    alt="Handcrafted chocolates, cacao nibs, and a dark chocolate bar"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 hero-overlay"></div>
            </div>
            <div className="hero-orb absolute -right-20 top-12 h-80 w-80 rounded-full border border-[#e7a86d]/20 bg-[#e7a86d]/10" />
            <div className="hero-grid absolute inset-0 opacity-30" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                    <p className="eyebrow mb-5">Small batch / Nepal · 2026</p>
                    <h1 className="hero-title text-5xl md:text-8xl font-bold mb-6 leading-[.95]">
                        A little <span>luxury</span><br /> in every bite.
                    </h1>
                    <p className="text-lg md:text-xl mb-9 text-[#dbcac0] font-light max-w-xl">
                        Premium chocolates made in Nepal using the finest local ingredients.
                    </p>
                    <Link
                        to="/category/all"
                        className="copper-button inline-block font-bold py-4 px-8 rounded-full transition"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
