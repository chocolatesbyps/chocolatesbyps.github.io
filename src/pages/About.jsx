import SEO from '../components/SEO';
import { HeartHandshake, Sparkles, SwatchBook } from 'lucide-react';

const About = () => {
    return (
        <>
            <SEO title="About Us" />

            <main className="about-page">
                <section className="about-hero">
                    <div className="about-hero__pattern" aria-hidden="true" />
                    <div className="container relative mx-auto grid max-w-6xl items-end gap-8 px-4 py-16 md:grid-cols-[1.15fr_.85fr] md:px-6 md:py-24">
                        <div>
                            <p className="journal-eyebrow">Since 2024</p>
                            <h1>Made for the moments that matter.</h1>
                            <p>Thoughtful, handcrafted chocolates from our home in Nepal to yours.</p>
                        </div>
                        <div className="about-logo-frame">
                            <img src="/images/logo.jpeg" alt="Chocolates By PS logo" width="500" height="500" />
                        </div>
                    </div>
                </section>

                <section className="about-story container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
                    <div className="about-story__label">
                        <span>01</span>
                        <p>Our beginning</p>
                    </div>
                    <div className="about-story__copy">
                        <p className="about-lead"><strong>Chocolates By PS</strong> began with a simple belief: the sweetest gifts are made with care.</p>
                        <div className="about-prose">
                            <p>Started in 2024 as a small homemade chocolate venture by <strong>Er. Pramit Bahadur Shrestha</strong>, the brand grew from a sweet tooth and a love for making treats worth remembering.</p>
                            <p>What began in one kitchen is now a heartfelt way to share that love. Every chocolate is crafted around what people truly enjoy, whether it is a meaningful gift or a small moment of indulgence just for you.</p>
                        </div>
                    </div>
                </section>

                <section className="about-values">
                    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                        <div className="about-values__heading">
                            <p className="journal-eyebrow">What guides us</p>
                            <h2>The care is in every detail.</h2>
                        </div>
                        <div className="about-values__grid">
                            <article><HeartHandshake aria-hidden="true" /><h3>Made with heart</h3><p>Each piece is prepared with the patience and warmth of a handmade gift.</p></article>
                            <article><SwatchBook aria-hidden="true" /><h3>Made for you</h3><p>From flavours to finishing touches, we create chocolate around your preferences.</p></article>
                            <article><Sparkles aria-hidden="true" /><h3>Made memorable</h3><p>We believe even a small treat can turn an ordinary day into a sweet memory.</p></article>
                        </div>
                    </div>
                </section>

                <section className="about-founder container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
                    <div className="about-founder__card">
                        <div className="about-founder__seal" aria-hidden="true">PS</div>
                        <div>
                            <p className="journal-eyebrow">The person behind the pieces</p>
                            <h2>Er. Pramit Bahadur Shrestha</h2>
                            <p>Founder &amp; Chocolatier</p>
                        </div>
                        <blockquote>“Chocolate is a small way to make someone feel remembered.”</blockquote>
                    </div>
                </section>
            </main>
        </>
    );
};

export default About;
