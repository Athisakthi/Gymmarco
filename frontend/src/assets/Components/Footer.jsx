import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, MapPin, Phone } from 'lucide-react';
import './Footer.css';
import instagram from '../Images/instagram.png';
import twitter from '../Images/twitter.png';
import whatsapp from '../Images/whatsapp.png';
import facebook from '../Images/facebook.png';

function Footer({ theme }) {
    const location = useLocation();

    const userRole = localStorage.getItem('userRole');

    if (location.pathname === '/admin' || location.pathname === '/messages' || userRole === 'Trainer') {
        return null;
    }

    return (
        <footer className="footer-main glass">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <Dumbbell className="logo-icon" size={24} />
                            <span>GYMMARCO</span>
                        </div>
                        <p className="brand-desc">
                            Pushing human potential to the limit. Join the elite community
                            where champions are forged every single day.
                        </p>
                        <div className="brand-contact">
                            <div className="contact-line">
                                <Phone size={16} className="contact-icon" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="contact-line">
                                <MapPin size={16} className="contact-icon" />
                                <span>Hasthinapuram, Chennai - 600064</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    {localStorage.getItem("userRole") !== "Trainer" && (
                        <div className="footer-nav">
                            <h4>Explore</h4>
                            <div className="link-list">
                                <Link to="/">Home</Link>
                                <Link to="/packages">Packages</Link>
                                <Link to="/mens">Men's Training</Link>
                                <Link to="/womens">Women's Training</Link>
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    )}

                    {/* Social Section */}
                    <div className="footer-social-column">
                        <h4>Follow Us</h4>
                        <div className="social-icon-grid">
                            <a href="#" className="social-link glass">
                                <img src={instagram} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                            </a>
                            <a href="#" className="social-link glass">
                                <img src={whatsapp} alt="WhatsApp" style={{ width: '24px', height: '24px' }} />
                            </a>
                            <a href="#" className="social-link glass">
                                <img src={facebook} alt="Facebook" style={{ width: '24px', height: '24px' }} />
                            </a>
                            <a href="#" className="social-link glass">
                                <img
                                    src={twitter}
                                    alt="Twitter"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        filter: theme === 'dark' ? 'invert(1)' : 'none',
                                        transition: 'filter 0.3s ease'
                                    }}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="footer-map-container">
                        <h4>Find Us</h4>
                        <div className="map-wrapper glass">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.49247656627!2d80.1345423!3d12.9545084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f0e3eb4c1ab%3A0xc34a06efb783f982!2sChromepet%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Gym Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 GYMMARCO. India Floats Technologies.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;