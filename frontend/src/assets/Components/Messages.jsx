import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, User } from "lucide-react";
import "./Messages.css";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const initializeMessages = async () => {
            await fetchMessages();
            await markAllAsRead();
        };
        initializeMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/contact/messages');
            const data = await response.json();

            if (data.success) {
                setMessages(data.messages);
            } else {
                setError("Failed to fetch messages.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Server error. Cannot connect to the backend.");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/contact/messages/${id}/read`, {
                method: 'PUT'
            });
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg._id === id ? { ...msg, read: true } : msg
                )
            );
            window.dispatchEvent(new CustomEvent('messageRead'));
        } catch (err) {
            console.error("Error marking message as read:", err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch(`http://localhost:5000/api/contact/mark-all-read`, {
                method: 'PUT'
            });
            // Update local state so the "NEW" badges disappear immediately
            setMessages(prevMessages => 
                prevMessages.map(msg => ({ ...msg, read: true }))
            );
            window.dispatchEvent(new CustomEvent('messageRead'));
        } catch (err) {
            console.error("Error marking all as read:", err);
        }
    };

    return (
        <main className="messages-page">
            <section className="page-hero messages-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        CLIENT <span className="gradient-text">MESSAGES</span>
                    </motion.h1>
                    <p className="page-subtitle">View and manage inquiries sent by your clients.</p>
                </div>
            </section>

            <section className="messages-content">
                <div className="container">
                    {loading ? (
                        <div className="status-container">
                            <div className="loader"></div>
                            <p>Loading messages...</p>
                        </div>
                    ) : error ? (
                        <div className="status-container error-status">
                            <p>{error}</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="status-container empty-status glass-card">
                            <Mail size={48} className="empty-icon" />
                            <h3>No Messages Yet</h3>
                            <p>When clients send you a message via the Contact page, they will appear here.</p>
                        </div>
                    ) : (
                        <div className="messages-grid">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`message-card glass ${!msg.read ? 'unread' : ''}`}
                                    onClick={() => !msg.read && markAsRead(msg._id)}
                                >
                                    <div className="message-header">
                                        <div className="sender-info">
                                            <div className="sender-avatar">
                                                <User size={20} />
                                                {!msg.read && <span className="unread-dot"></span>}
                                            </div>
                                            <div>
                                                <h3 className="sender-name">{msg.name}</h3>
                                                <span className="message-date">
                                                    <Clock size={12} className="inline-icon" />
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        {!msg.read && <span className="new-badge">NEW</span>}
                                    </div>

                                    <div className="message-body">
                                        <p>{msg.message}</p>
                                    </div>

                                    <div className="message-footer">
                                        <div className="contact-detail">
                                            <Mail size={14} className="inline-icon" />
                                            <a href={`mailto:${msg.email}`}>{msg.email}</a>
                                        </div>
                                        {msg.phone && (
                                            <div className="contact-detail">
                                                <Phone size={14} className="inline-icon" />
                                                <a href={`tel:${msg.phone}`}>{msg.phone}</a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Messages;
