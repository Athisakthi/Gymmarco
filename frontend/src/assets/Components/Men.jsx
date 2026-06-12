import { motion } from "framer-motion";
import { ChevronRight, Target, Activity } from "lucide-react";
import gym6 from "../Images/gym6.jpg";
import gym7 from "../Images/gym7.jpg";
import "./Men.css";

function Men() {
    return (
        <main className="men-page">
            <section className="page-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        MEN'S <span className="gradient-text">TRAINING</span>
                    </motion.h1>
                    <p className="page-subtitle">Expert programs designed for ultimate strength and peak performance.</p>
                </div>
            </section>

            <section className="training-levels">
                <div className="container">
                    <div className="training-grid">
                        {/* Bodybuilder Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="training-card glass-card"
                        >
                            <div className="training-image">
                                <img src={gym6} alt="Bodybuilder Training" />
                                {/* <div className="card-badge"><Target size={16}/> Elite</div> */}
                            </div>
                            <div className="training-info">
                                <h2>Bodybuilder Training</h2>
                                <p className="training-desc">Maximum hypertrophy and strength focused programming.</p>
                                <ul className="benefit-list">
                                    <li><ChevronRight size={16} /> Heavy split routines</li>
                                    <li><ChevronRight size={16} /> Progressive overload</li>
                                    <li><ChevronRight size={16} /> High-protein nutrition</li>
                                    <li><ChevronRight size={16} /> Recovery management</li>
                                </ul>
                                {/* <button className="btn-primary">View Routine</button> */}
                            </div>
                        </motion.div>

                        {/* Fitness Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="training-card glass-card"
                        >
                            <div className="training-image">
                                <img src={gym7} alt="Fitness Training" />
                                {/* <div className="card-badge"><Activity size={16} /> Daily</div> */}
                            </div>
                            <div className="training-info">
                                <h2>Fitness & Maintenance</h2>
                                <p className="training-desc">Sustainable health and functional fitness for longevity.</p>
                                <ul className="benefit-list">
                                    <li><ChevronRight size={16} /> Moderate weight training</li>
                                    <li><ChevronRight size={16} /> Core & flexibility focus</li>
                                    <li><ChevronRight size={16} /> Balanced everyday diet</li>
                                    <li><ChevronRight size={16} /> Consistent energy levels</li>
                                </ul>
                                {/* <button className="btn-primary">Get Started</button> */}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Men;