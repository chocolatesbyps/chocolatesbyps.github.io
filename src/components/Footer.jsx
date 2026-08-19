import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="site-footer bg-amber-950 pb-5 pt-8 text-amber-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
                    <div>
                        <h3 className="mb-4 font-serif text-xl font-bold">Chocolates By PS</h3>
                        <p className="mb-4 text-amber-200/80">Handcrafted premium chocolates made in Nepal using local ingredients. Perfect for gifting, events, and daily delight.</p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/1A8HJtpNxX/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social"><Facebook className="h-6 w-6" /></a>
                            <a href="https://www.instagram.com/chocolatesbyps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><Instagram className="h-6 w-6" /></a>
                            <a href="https://www.tiktok.com/@chocolates.by.ps?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-1.03-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.93-3.58 3.18-5.91 3.15-1.43-.02-2.85-.39-4.1-1.12-2.07-1.19-3.53-3.42-3.77-5.81-.02-.51-.03-1.02-.01-1.52.18-1.94 1.08-3.8 2.47-5.15 1.58-1.54 3.88-2.27 6.08-1.9.02 1.48-.04 2.96-.04 4.44-.67-.22-1.39-.27-2.08-.18-1.5.19-2.85 1.16-3.48 2.53-.64 1.37-.63 2.97.04 4.33.46.93 1.26 1.68 2.19 2.08.75.34 1.6.38 2.4.22.53-.12 1.03-.4 1.44-.76.48-.41.83-.97 1.02-1.57.16-.39.11-.84.12-1.25.01-5.24-.01-10.48.03-15.71z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/category/all" className="text-amber-200/80 transition hover:text-amber-100">Shop</Link></li>
                            <li><Link to="/blog" className="text-amber-200/80 transition hover:text-amber-100">Blog</Link></li>
                            <li><Link to="/about" className="text-amber-200/80 transition hover:text-amber-100">About Us</Link></li>
                            <li><Link to="/contact" className="text-amber-200/80 transition hover:text-amber-100">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-lg font-bold">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-amber-200/80"><MapPin className="mt-0.5 h-5 w-5 shrink-0" /><span>Satdobato, Lalitpur, Nepal</span></li>
                            <li className="flex items-center space-x-3 text-amber-200/80"><Mail className="h-5 w-5 shrink-0" /><a href="https://mail.google.com/mail/?view=cm&fs=1&to=chocolatesbyps@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">chocolatesbyps@gmail.com</a></li>
                            <li className="flex items-center space-x-3 text-amber-200/80"><Phone className="h-5 w-5 shrink-0" /><a href="tel:+9779840099441" className="hover:text-amber-100">+977 9840099441</a></li>
                        </ul>
                    </div>

                    <div className="footer-map-wrap">
                        <h4 className="mb-4 text-lg font-bold">Find Us</h4>
                        <div className="footer-map">
                            <iframe src="https://www.google.com/maps?q=27.653897,85.321527&z=16&output=embed" title="Chocolates By PS location in Satdobato, Lalitpur" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                        </div>
                        <a className="footer-map-link" href="https://www.google.com/maps?q=27.653897,85.321527" target="_blank" rel="noopener noreferrer">Get directions</a>
                    </div>
                </div>

                <div className="border-t border-amber-900 pt-4 text-center text-sm text-amber-200/60">
                    <p>&copy;{new Date().getFullYear()} <b>Chocolates By PS</b>. All rights reserved.</p>
                    <p>Powered By : <b>Tech Services Alliance Pvt. Ltd.</b></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
