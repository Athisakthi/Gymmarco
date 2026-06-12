import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import "./Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('Success! Message sent successfully.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            console.error('Submit error:', error);
            setStatus('Server error. Is the backend running?');
        }
    };

    const contactInfo = [
        { icon: <MapPin />, title: "Address", content: "94/D Hasthinapuram, Chennai - 600064" },
        { icon: <Phone />, title: "Phone", content: "+91 98765 43210" },
        { icon: <Mail />, title: "Email", content: "gymmarco10@gmail.com" },
        { icon: <Clock />, title: "Hours", content: "Mon-Sat: 6AM-10PM, Sun: 8AM-6PM" },
    ];

    return (
        <main className="contact-page">
            <section className="page-hero">
                <div className="container">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        GET IN <span className="gradient-text">TOUCH</span>
                    </motion.h1>
                    <p className="page-subtitle">Ready to start? We're here to help you on your journey.</p>
                </div>
            </section>

            <section className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        <motion.div 
                            initial={{ opacity: 0, x: window.innerWidth < 768 ? -10 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="contact-form-container glass-card"
                        >
                            <h3>Send Us a Message</h3>
                            <form onSubmit={handleSubmit} className="premium-form">
                                <div className="input-group">
                                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                                </div>
                                <button type="submit" className="btn-primary">
                                    Send Message <Send size={18} />
                                </button>
                                {status && <p className={`status-msg ${status.includes('Success') ? 'success' : 'error'}`}>{status}</p>}
                            </form>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: window.innerWidth < 768 ? 10 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="contact-info-list"
                        >
                            <div className="info-grid">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="info-card glass">
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-text">
                                            <h4>{info.title}</h4>
                                            <p>{info.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="social-cta glass">
                                <h3>Follow Our Community</h3>
                                <p>Join the discussion and get daily motivation.</p>
                                <div className="social-links">
                                    <span>Instagram</span>
                                    <span>Twitter</span>
                                    <span>Facebook</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;