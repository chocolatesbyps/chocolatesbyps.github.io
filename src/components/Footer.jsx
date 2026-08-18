import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Mail, Phone, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-amber-950 text-amber-50 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-4">Chocolates By PS</h3>
                        <p className="text-amber-200/80 mb-4">
                            Handcrafted premium chocolates made in Nepal using local ingredients. Perfect for gifting, events, and daily delight.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/1A8HJtpNxX/" target="new" aria-label="Facebook" className="footer-social"><Facebook className="w-6 h-6" /></a>
                            <a href="https://www.instagram.com/chocolatesbyps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="new" aria-label="Instagram" className="footer-social"><Instagram className="w-6 h-6" /></a>
                            {/* <a href="#" className="hover:text-amber-200 transition"><Linkedin className="w-5 h-5" /></a> */}
                            {/* TikTok Icon (SVG) */}
                            <a href="https://www.tiktok.com/@chocolates.by.ps?is_from_webapp=1&sender_device=pc" target="new" aria-label="TikTok" className="footer-social">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2">
                                    <path d="M9 18V5l12-2v13"></path>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <circle cx="18" cy="16" r="3"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/category/all" className="text-amber-200/80 hover:text-amber-100 transition">Shop</Link></li>
                            <li><Link to="/blog" className="text-amber-200/80 hover:text-amber-100 transition">Blog</Link></li>
                            <li><Link to="/about" className="text-amber-200/80 hover:text-amber-100 transition">About Us</Link></li>
                            <li><Link to="/contact" className="text-amber-200/80 hover:text-amber-100 transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-amber-200/80">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>Satdobato, Lalitpur, Nepal</span>
                            </li>
                            <li className="flex items-center space-x-3 text-amber-200/80">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <a href="mailto:pramitshrest@gmail.com" className="hover:text-amber-100" target="_blank">chocolatesbyps@gmail.com</a>
                            </li>
                            <li className="flex items-center space-x-3 text-amber-200/80">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <a href="tel:+9779810000000" className="hover:text-amber-100">+977 9840099441</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-amber-900 pt-6 text-center text-amber-200/60 text-sm">
                    <p>&copy;{new Date().getFullYear()} <b>Chocolates By PS</b>. All rights reserved.</p>
                    <p>Powered By : <b>Tech Services Alliance Pvt. Ltd.</b></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
