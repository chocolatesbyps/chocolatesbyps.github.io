import { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react';

const EventsCarousel = ({ events }) => {
    const safeEvents = events ?? [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState('next');
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setReducedMotion(query.matches);
        updatePreference();
        query.addEventListener('change', updatePreference);
        return () => query.removeEventListener('change', updatePreference);
    }, []);

    useEffect(() => {
        if (safeEvents.length < 2 || isPaused || reducedMotion) return undefined;
        const timer = window.setInterval(() => {
            setDirection('next');
            setCurrentIndex((index) => (index + 1) % safeEvents.length);
        }, 5200);
        return () => window.clearInterval(timer);
    }, [safeEvents.length, isPaused, reducedMotion]);

    if (!safeEvents.length) return null;

    const selectEvent = (index, nextDirection = 'next') => {
        setDirection(nextDirection);
        setCurrentIndex(index);
    };
    const event = safeEvents[currentIndex];
    const [month, day] = event.date.split(' ');

    return (
        <section
            className="events-section"
            aria-roledescription="carousel"
            aria-label="Upcoming chocolate events"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(eventTarget) => {
                if (!eventTarget.currentTarget.contains(eventTarget.relatedTarget)) setIsPaused(false);
            }}
        >
            <div className="events-shell container mx-auto px-4">
                <header className="events-header">
                    <div>
                        <p className="events-eyebrow">The chocolate calendar</p>
                        <h2>Gather around something sweet.</h2>
                        <p>Small, thoughtful events for chocolate lovers in our community.</p>
                    </div>
                    <div className="event-controls" aria-label="Event carousel controls">
                        <button type="button" onClick={() => selectEvent((currentIndex - 1 + safeEvents.length) % safeEvents.length, 'previous')} className="event-control" aria-label="Previous event"><ChevronLeft aria-hidden="true" /></button>
                        <button type="button" onClick={() => selectEvent((currentIndex + 1) % safeEvents.length)} className="event-control" aria-label="Next event"><ChevronRight aria-hidden="true" /></button>
                        <button type="button" onClick={() => setIsPaused((paused) => !paused)} className="event-control event-control--pause" aria-label={isPaused ? 'Play event slider' : 'Pause event slider'} aria-pressed={isPaused}>{isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button>
                    </div>
                </header>

                <div className="events-stage">
                    <article key={event.id} className={`event-card event-card--active event-card--${direction}`} aria-roledescription="slide" aria-label={`${currentIndex + 1} of ${safeEvents.length}: ${event.title}`}>
                        <div className="event-date-tile" aria-label={event.date}><CalendarDays aria-hidden="true" /><span>{month}</span><strong>{day}</strong></div>
                        <div className="event-card__content">
                            <p className="event-card__eyebrow">Upcoming at Chocolates By PS</p>
                            <h3>{event.title}</h3>
                            <p className="event-location"><MapPin aria-hidden="true" /> {event.location}</p>
                            <div className="event-card-footer"><span>Details announced soon</span><span className="event-counter"><strong>{String(currentIndex + 1).padStart(2, '0')}</strong> / {String(safeEvents.length).padStart(2, '0')}</span></div>
                        </div>
                    </article>
                    <div className="event-pagination" aria-label="Choose an event">
                        {safeEvents.map((item, index) => (
                            <button key={item.id} type="button" onClick={() => selectEvent(index, index >= currentIndex ? 'next' : 'previous')} className={index === currentIndex ? 'is-active' : ''} aria-label={`Show ${item.title}`} aria-current={index === currentIndex ? 'true' : undefined}>
                                <span>{item.date}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsCarousel;
