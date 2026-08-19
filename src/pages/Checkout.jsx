import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { Mail, MessageCircle, ArrowLeft, MapPin, LocateFixed } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultLocation = [27.6539, 85.3215];

const Checkout = () => {
    const { cart, cartTotal } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        latitude: '',
        longitude: '',
        notes: ''
    });
    const mapRef = useRef(null);
    const leafletMapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || leafletMapRef.current) return undefined;

        const map = L.map(mapRef.current).setView(defaultLocation, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const updateLocation = (latitude, longitude) => {
            const nextLocation = [latitude, longitude];
            if (!markerRef.current) {
                markerRef.current = L.marker(nextLocation, { draggable: true }).addTo(map);
                markerRef.current.on('dragend', () => {
                    const position = markerRef.current.getLatLng();
                    setFormData(prev => ({ ...prev, latitude: position.lat.toFixed(6), longitude: position.lng.toFixed(6) }));
                });
            } else {
                markerRef.current.setLatLng(nextLocation);
            }
            map.setView(nextLocation, Math.max(map.getZoom(), 15));
            setFormData(prev => ({ ...prev, latitude: latitude.toFixed(6), longitude: longitude.toFixed(6) }));
        };

        map.on('click', (event) => updateLocation(event.latlng.lat, event.latlng.lng));
        leafletMapRef.current = { map, updateLocation };
        return () => { map.remove(); leafletMapRef.current = null; };
    }, []);

    const useCurrentLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => leafletMapRef.current?.updateLocation(coords.latitude, coords.longitude),
            () => window.alert('We could not access your location. Please select a point on the map or enter coordinates.')
        );
    };

    if (cart.items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p>Your cart is empty.</p>
                <button onClick={() => navigate('/category/all')} className="text-amber-600 underline mt-4">Go Shopping</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if ((name === 'latitude' || name === 'longitude') && leafletMapRef.current) {
            const latitude = Number(name === 'latitude' ? value : formData.latitude);
            const longitude = Number(name === 'longitude' ? value : formData.longitude);
            if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
                leafletMapRef.current.updateLocation(latitude, longitude);
            }
        }
    };

    const generateOrderText = () => {
        let text = `New Order from ${formData.name}\n\n`;
        text += `Customer Details:\n`;
        text += `Name: ${formData.name}\n`;
        text += `Email: ${formData.email}\n`;
        text += `Phone: ${formData.phone}\n`;
        text += `Address: ${formData.address}, ${formData.city}\n`;
        if (formData.latitude && formData.longitude) {
            text += `Location coordinates: ${formData.latitude}, ${formData.longitude}\n`;
            text += `Map: https://www.google.com/maps?q=${formData.latitude},${formData.longitude}\n`;
        }
        if (formData.notes) text += `Notes: ${formData.notes}\n`;

        text += `\nOrder Items:\n`;
        cart.items.forEach(item => {
            const itemPrice = item.variation ? (item.price + (item.variation.priceModifier || 0)) : item.price;
            const variationText = item.variation ? ` (${item.variation.label})` : '';
            text += `- ${item.quantity}x ${item.title}${variationText} @ ${cart.currency} ${itemPrice.toFixed(2)}/unit = ${cart.currency} ${(itemPrice * item.quantity).toFixed(2)}\n`;
        });

        text += `\nTotal: ${cart.currency} ${cartTotal.toFixed(2)}`;
        return text;
    };

    const handleEmailOrder = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`New Order from ${formData.name}`);
        const body = encodeURIComponent(generateOrderText());
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chocolatesbyps@gmail.com&su=${subject}&body=${body}`;
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
        // Optional: clearCart();
    };

    const handleWhatsAppOrder = (e) => {
        e.preventDefault();
        const text = encodeURIComponent(generateOrderText());
        // Replace with real number
        const phoneNumber = '9779840099441';
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        // Optional: clearCart();
    };

    return (
        <>
            <SEO title="Checkout" />
            <div className="checkout-page container mx-auto px-4 py-12">
                <button onClick={() => navigate('/cart')} className="checkout-back flex items-center gap-2 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Cart
                </button>

                <div className="checkout-heading mb-9">
                    <p className="eyebrow mb-2">Almost yours</p>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Checkout</h1>
                    <p className="checkout-muted">Add your details and choose how you’d like to send your order.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="checkout-form-panel p-6 md:p-8 rounded-2xl">
                        <div className="checkout-section-heading mb-6">
                            <span className="step-number">01</span>
                            <div><p className="eyebrow mb-1">Delivery details</p><h2 className="text-2xl font-bold">Shipping Details</h2></div>
                        </div>
                        <form className="checkout-form space-y-5">
                            <div>
                                <label className="checkout-label block text-sm font-medium mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="checkout-input w-full rounded-md shadow-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="checkout-label block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="checkout-input w-full rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="checkout-label block text-sm font-medium mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="checkout-input w-full rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="checkout-label block text-sm font-medium mb-1">Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="checkout-input w-full rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="checkout-label block text-sm font-medium mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="checkout-input w-full rounded-md shadow-sm"
                                />
                            </div>
                            <div className="location-picker">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                    <div>
                                        <label className="checkout-label flex items-center gap-2 text-sm font-bold"><MapPin className="w-4 h-4 text-[#b96f43]" /> Delivery Location <span>(Optional)</span></label>
                                        <p className="checkout-muted text-xs mt-1">Click the map or drag the pin to share your exact location.</p>
                                    </div>
                                    <button type="button" onClick={useCurrentLocation} className="location-button inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-bold"><LocateFixed className="w-4 h-4" /> Use my location</button>
                                </div>
                                <div ref={mapRef} className="checkout-map" />
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div><label className="checkout-label block text-xs mb-1">Latitude</label><input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className="checkout-input w-full rounded-md text-sm" placeholder="27.653900" /></div>
                                    <div><label className="checkout-label block text-xs mb-1">Longitude</label><input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className="checkout-input w-full rounded-md text-sm" placeholder="85.321500" /></div>
                                </div>
                            </div>
                            <div className="special-note-section border-t border-[#dcc9bb] pt-5">
                                <label className="checkout-label block text-sm font-bold mb-1" htmlFor="special-note">
                                    Special Note <span>(Optional)</span>
                                </label>
                                <p className="checkout-muted text-xs mb-2">
                                    Add a personal message or any special instructions to include with your order.
                                </p>
                                <textarea
                                    id="special-note"
                                    name="notes"
                                    rows="3"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="checkout-input w-full rounded-md shadow-sm"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary & Actions */}
                    <div>
                        <div className="order-summary p-6 md:p-8 rounded-2xl">
                            <div className="checkout-section-heading mb-6">
                                <span className="step-number">02</span>
                                <div><p className="eyebrow mb-1">Review & send</p><h2 className="text-2xl font-bold font-serif">Your Order</h2></div>
                            </div>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.items.map((item, idx) => {
                                    const itemPrice = item.variation ? (item.price + (item.variation.priceModifier || 0)) : item.price;
                                    return (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <div>
                                                <span className="font-medium">{item.title}</span>
                                                <span className="text-gray-500"> x {item.quantity}</span>
                                                <div className="text-xs text-gray-500">
                                                    {item.variation && <span>{item.variation.label} • </span>}
                                                    @{cart.currency} {itemPrice.toFixed(2)}/unit
                                                </div>
                                            </div>
                                            <span>{cart.currency} {(itemPrice * item.quantity).toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="order-total border-t pt-4 mb-8">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{cart.currency} {cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="checkout-muted text-sm mb-3">Select a method to send your order:</p>
                                <button
                                    type="button"
                                    onClick={handleEmailOrder}
                                    disabled={!formData.name || !formData.email}
                                    className="email-order w-full text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Mail className="w-5 h-5" /> Send via Email
                                </button>
                                <button
                                    type="button"
                                    onClick={handleWhatsAppOrder}
                                    disabled={!formData.name || !formData.phone}
                                    className="whatsapp-order w-full text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle className="w-5 h-5" /> Send via WhatsApp
                                </button>
                            </div>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                * This will open your email client or WhatsApp to send the order details. No payment is processed here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
