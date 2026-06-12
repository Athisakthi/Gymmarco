import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Shield, Users } from "lucide-react";
import gym1 from "../Images/gym1.jpg";
import gym2 from "../Images/gym2.jpg";
import gym3 from "../Images/gym3.jpg";
import gym4 from "../Images/gym4.jpg";
import gym5 from "../Images/gym5.jpg";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const images = [gym1, gym2, gym3, gym4];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const stats = [
        { label: "Active Members", value: "500+", icon: <Users size={24} /> },
        { label: "Expert Trainers", value: "12+", icon: <Shield size={24} /> },
        { label: "Modern Equipment", value: "100%", icon: <Zap size={24} /> },
    ];

    const features = [
        {
            title: "Build Muscle Strength",
            desc: "Expertly guided weight training to maximize gains and functional power.",
            icon: <CheckCircle className="feature-icon" />,
        },
        {
            title: "Improve Body Shape",
            desc: "Custom nutrition and workout plans tailored to your specific physique goals.",
            icon: <CheckCircle className="feature-icon" />,
        },
        {
            title: "Increase Stamina",
            desc: "High-intensity cardio zones designed to push your endurance to the limit.",
            icon: <CheckCircle className="feature-icon" />,
        },
    ];

    return (
        <main className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={index}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="hero-bg"
                        style={{ backgroundImage: `url(${images[index]})` }}
                    />
                </AnimatePresence>

                <div className="hero-overlay" />

                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="hero-title">
                            ELEVATE YOUR <span className="gradient-text">LIMITS</span>
                        </h1>
                        <p className="hero-subtitle">
                            Experience the ultimate training environment with elite equipment,
                            expert trainers, and a community built for winners.
                        </p>
                        <div className="hero-ctas">
                            <button className="btn-primary" onClick={() => navigate('/contact')}>
                                Start Your Journey <ArrowRight size={20} />
                            </button>
                            <button className="btn-secondary" onClick={() => navigate('/packages')}>
                                View Packages
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar glass">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-item">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* Why Choose Us Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-image-wrapper"
                        >
                            <img src={gym5} alt="Elite Training" className="about-img" />
                            <div className="image-accent" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="about-content"
                        >
                            <h2 className="section-title">WHY CHOOSE <span className="gradient-text">US?</span></h2>
                            <p className="section-desc">
                                We're not just a gym; we're a transformation center. Our facility
                                combines cutting-edge data with old-school sweat.
                            </p>

                            <div className="features-list">
                                {features.map((feature, i) => (
                                    <div key={i} className="feature-card glass-card">
                                        <div className="feature-header">
                                            {feature.icon}
                                            <h3>{feature.title}</h3>
                                        </div>
                                        <p>{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="cta-banner">
                <div className="cta-glass glass">
                    <h2>READY TO BECOME THE <span className="gradient-text">BEST VERSION?</span></h2>
                    <p>Join today and get your first week of personal training for free.</p>
                    <button className="btn-primary" onClick={() => navigate('/contact')}>
                        Join The Inner Circle
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;