import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Heart } from "lucide-react";
import gym8 from "../Images/gym8.jpg";
import gym9 from "../Images/gym9.jpg";
import "./Women.css";

function Women() {
    return (
        <main className="women-page">
            <section className="page-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        WOMEN'S <span className="gradient-text">TRAINING</span>
                    </motion.h1>
                    <p className="page-subtitle">Designed to empower, tone, and build a strong, confident physique.</p>
                </div>
            </section>

            <section className="training-levels">
                <div className="container">
                    <div className="training-grid">
                        {/* Strength & Toning Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="training-card glass-card"
                        >
                            <div className="training-image">
                                <img src={gym8} alt="Strength & Toning" />
                                {/* <div className="card-badge"><Sparkles size={16}/> Sculpt</div> */}
                            </div>
                            <div className="training-info">
                                <h2>Strength & Toning</h2>
                                <p className="training-desc">Build lean muscle definition and functional strength.</p>
                                <ul className="benefit-list">
                                    <li><ChevronRight size={16} /> Lean muscle sculpting</li>
                                    <li><ChevronRight size={16} /> Metabolic conditioning</li>
                                    <li><ChevronRight size={16} /> Progressive weight training</li>
                                    <li><ChevronRight size={16} /> Physique optimization</li>
                                </ul>
                                {/* <button className="btn-primary">View Programs</button> */}
                            </div>
                        </motion.div>

                        {/* Cardio & Flexibility Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="training-card glass-card"
                        >
                            <div className="training-image">
                                <img src={gym9} alt="Cardio & Flexibility" />
                                {/* <div className="card-badge"><Heart size={16}/> Vitality</div> */}
                            </div>
                            <div className="training-info">
                                <h2>Cardio & Flexibility</h2>
                                <p className="training-desc">Enhance endurance, grace, and athletic mobility.</p>
                                <ul className="benefit-list">
                                    <li><ChevronRight size={16} /> High-intensity cardio (HIIT)</li>
                                    <li><ChevronRight size={16} /> Mobility and Yoga flows</li>
                                    <li><ChevronRight size={16} /> Heart health optimization</li>
                                    <li><ChevronRight size={16} /> Dynamic active recovery</li>
                                </ul>
                                {/* <button className="btn-primary">Learn More</button> */}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Women;
