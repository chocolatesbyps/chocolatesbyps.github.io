import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const EventsCarousel = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    if (!events || events.length === 0) return null;

    // Determine how many items to show based on screen width (simplified logic for now, assuming 1 for mobile, 2 for desktop if needed, but the design shows horizontal scroll or cards. The prompt asked for a carousel slider. I'll implement a card slider showing 1-2 items or just scrolling through them.)
    // Actually, the previous design had them side-by-side. A carousel usually shows one or a few at a time.
    // Let's implement a simple slider that shows one event at a time on mobile and maybe 2 on desktop, or just slides through them.
    // Given the "carousel slider" requirement, I'll make it slide one by one or in groups.
    // Let's stick to a simple responsive slider.

    return (
        <section className="events-section py-16 text-white">
            <div className="events-shell container mx-auto px-4 py-10 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="events-intro md:w-1/3">
                        <p className="eyebrow mb-3">The chocolate calendar</p>
                        <h3 className="text-3xl font-bold section-title mb-2">Upcoming Events</h3>
                        <p className="dark-muted mb-6">Join us for tastings and workshops.</p>

                        {/* Navigation Buttons */}
                        <div className="event-controls flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="p-2 rounded-full transition"
                                aria-label="Previous event"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-2 rounded-full transition"
                                aria-label="Next event"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="md:w-2/3 w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {events.map((event) => (
                                <div key={event.id} className="w-full md:w-1/2 flex-shrink-0 px-2">
                                    <div className="event-card p-6 rounded-lg h-full border transition">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-amber-300 text-sm font-bold bg-amber-900/50 px-3 py-1 rounded-full">
                                                {event.date}
                                            </span>
                                            <Calendar className="w-5 h-5 text-amber-400/50" />
                                        </div>
                                        <h4 className="font-bold text-xl mb-2">{event.title}</h4>
                                        <p className="text-sm text-amber-100/80">{event.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsCarousel;
