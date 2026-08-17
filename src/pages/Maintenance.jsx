import { Helmet } from 'react-helmet-async';
import { Instagram, Mail, Sparkles } from 'lucide-react';

function Maintenance() {
  const year = new Date().getFullYear();

  return (
    <main className="maintenance-page">
      <Helmet>
        <title>Temporarily Closed | Chocolates by PS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="maintenance-glow maintenance-glow-one" />
      <div className="maintenance-glow maintenance-glow-two" />

      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <div className="maintenance-brand" aria-label="Chocolates by PS">
          <span className="maintenance-brand-dot" />
          Chocolates <em>by PS</em>
        </div>

        <div className="maintenance-icon" aria-hidden="true">
          <Sparkles size={27} strokeWidth={1.6} />
        </div>
        <p className="maintenance-eyebrow">A little something is brewing</p>
        <h1 id="maintenance-title">We’ll be back<br /><span>very soon.</span></h1>
        <p className="maintenance-copy">
          Our chocolate counter is getting a fresh polish. Thank you for your patience while we make it even sweeter.
        </p>

        <div className="maintenance-divider" />
        <p className="maintenance-contact-title">Need to reach us in the meantime?</p>
        <div className="maintenance-actions">
          <a href="mailto:chocolatesbyps@gmail.com" className="maintenance-action">
            <Mail size={17} aria-hidden="true" />
            Email us
          </a>
          <a href="https://www.instagram.com/chocolatesbyps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="maintenance-action">
            <Instagram size={17} aria-hidden="true" />
            Follow along
          </a>
        </div>
      </section>

      <p className="maintenance-footer">© {year} Chocolates by PS · Made with care</p>
    </main>
  );
}

export default Maintenance;
