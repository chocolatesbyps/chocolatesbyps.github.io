import SEO from '../components/SEO';

const About = () => {
    return (
        <>
            <SEO title="About Us" />

            <div className="bg-amber-50 py-12 mb-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold font-serif text-amber-900 mb-2">Our Story</h1>
                    <p className="text-amber-800/80">Handmade with love in Nepal.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                        <div className="prose prose-lg prose-amber mx-auto text-gray-700 leading-relaxed">
                            <p className="mb-6">
                                <span className="font-bold text-amber-900">Chocolates By PS</span> started in 2024 as a small homemade chocolate venture by <span className="font-bold">Er. Pramit Bahadur Shrestha</span>, someone who’s always had a sweet tooth and a love for creating delicious treats.
                            </p>
                            <p className="mb-6">
                                What began in his own kitchen has grown into a heartfelt attempt to share that love with others. At Chocolates By PS, the focus is on making chocolates that aren’t just tasty, but prepared according to the customers' preferences.
                            </p>
                            <p className="mb-6">
                                The brand takes pride in crafting each piece to match what consumers truly enjoy. Whether it’s a gift or a little self-indulgence, these chocolates are made to bring a smile.
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                            <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Er. Pramit Bahadur Shrestha</h3>
                            <p className="text-gray-500 italic">Founder & Chocolatier</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
