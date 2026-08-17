import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                                <Quote className="w-10 h-10 text-amber-200 mx-auto mb-6" />
                                <p className="text-xl text-gray-700 italic mb-6">"{testimonial.quote}"</p>
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
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 text-amber-900 transition"
                aria-label="Previous testimonial"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-amber-50 text-amber-900 transition"
                aria-label="Next testimonial"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default TestimonialsCarousel;
