import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsCarousel = ({ testimonials }) => {
    const safeTestimonials = testimonials ?? [];
    const [currentIndex, setCurrentIndex] = useState(0);
    if (!safeTestimonials.length) return null;

    const selectTestimonial = (index) => setCurrentIndex(index);
    const previousTestimonial = () => selectTestimonial((currentIndex - 1 + safeTestimonials.length) % safeTestimonials.length);
    const nextTestimonial = () => selectTestimonial((currentIndex + 1) % safeTestimonials.length);

    return (
        <div
            className="testimonial-carousel"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
        >
            <p className="sr-only" aria-live="polite">
                Testimonial {currentIndex + 1} of {safeTestimonials.length}
            </p>
            <div className="testimonial-slider-frame">
                {safeTestimonials.length > 1 && <button type="button" onClick={previousTestimonial} className="testimonial-side-control testimonial-side-control--previous" aria-label="Previous testimonial"><ChevronLeft aria-hidden="true" /></button>}
                <div className="testimonial-viewport">
                    <div
                        className="testimonial-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {safeTestimonials.map((testimonial, index) => (
                            <article
                                key={testimonial.id}
                                className="testimonial-slide"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${safeTestimonials.length}: ${testimonial.name}`}
                                aria-hidden={index !== currentIndex}
                            >
                                <div className="testimonial-card">
                                    <div className="testimonial-quote-mark" aria-hidden="true"><Quote /></div>
                                    <blockquote>“{testimonial.quote}”</blockquote>
                                    <footer className="testimonial-author">
                                        <img
                                            src={testimonial.photo || (testimonial.gender === 'female' ? '/images/girl_2.png' : '/images/boy_1.png')}
                                            alt=""
                                        />
                                        <div>
                                            <cite>{testimonial.name}</cite>
                                            <p>{testimonial.location}</p>
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                {safeTestimonials.length > 1 && <button type="button" onClick={nextTestimonial} className="testimonial-side-control testimonial-side-control--next" aria-label="Next testimonial"><ChevronRight aria-hidden="true" /></button>}
            </div>

            {safeTestimonials.length > 1 && (
                <div className="testimonial-pagination" aria-label="Choose a testimonial">
                    {safeTestimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            type="button"
                            onClick={() => selectTestimonial(index)}
                            className={index === currentIndex ? 'is-active' : ''}
                            aria-label={`Show testimonial from ${testimonial.name}`}
                            aria-current={index === currentIndex ? 'true' : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestimonialsCarousel;
