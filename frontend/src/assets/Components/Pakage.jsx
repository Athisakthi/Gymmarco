import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Star } from "lucide-react";
import "./Pakage.css";

function Package() {
    const navigate = useNavigate();
    const packages = [
        { 
            name: "Basic Plan", 
            price: "₹999", 
            period: "/mo", 
            features: ["Access to Gym Equipment", "Locker Room", "1 Free Trainer Session", "Mobile App Access"] 
        },
        { 
            name: "Pro Plan", 
            price: "₹2999", 
            period: "/mo", 
            featured: true,
            features: ["Full Equipment Access", "Group Classes", "Sauna Access", "Diet Plan", "Protein Shake Credit"] 
        },
        { 
            name: "Elite Plan", 
            price: "₹4999", 
            period: "/mo", 
            features: ["24/7 Access", "Personal Trainer", "All Group Classes", "Free Merchandise", "Spa & Recovery Zone"] 
        }
    ];

    return (
        <main className="package-page">
            <section className="page-hero">
                <div className="container">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        PREMIUM <span className="gradient-text">MEMBERSHIPS</span>
                    </motion.h1>
                    <p className="page-subtitle">Choose the perfect plan to accelerate your fitness evolution.</p>
                </div>
            </section>

            <section className="pricing-section">
                <div className="container">
                    <div className="pricing-grid">
                        {packages.map((pkg, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`pricing-card glass-card ${pkg.featured ? "featured" : ""}`}
                            >
                                {pkg.featured && <div className="featured-badge"><Star size={14}/> MOST POPULAR</div>}
                                <div className="card-top">
                                    <h3>{pkg.name}</h3>
                                    <div className="price-tag">
                                        <span className="price">{pkg.price}</span>
                                        <span className="period">{pkg.period}</span>
                                    </div>
                                </div>
                                <ul className="package-features">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i}><Check size={18} className="check-icon" /> {feature}</li>
                                    ))}
                                </ul>
                                <button 
                                    className={`btn-${pkg.featured ? "primary" : "secondary"}`} 
                                    style={{ width: '100%', marginTop: 'auto' }}
                                    onClick={() => navigate('/contact')}
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Package;