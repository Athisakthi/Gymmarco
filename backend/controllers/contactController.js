const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // 1. Save to Database
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        // 2. Setup Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 3. Setup Email Options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Send to the client who filled the form
            subject: 'Gymmarco - We received your inquiry!',
            text: `Hi ${name},\n\We receive your equire we will contact and Thank you Choosing our Gymmarco have a good Day.\n\nBest Regards,\nThe Gymmarco Team`
        };

        // 4. Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Message sent and saved successfully.' });

    } catch (error) {
        console.error('Error in contact form submission:', error);
        res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const count = await Contact.countDocuments({ read: false });
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch unread count.' });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndUpdate(id, { read: true });
        res.status(200).json({ success: true, message: 'Message marked as read.' });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ success: false, message: 'Failed to mark message as read.' });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await Contact.updateMany({ read: false }, { read: true });
        res.status(200).json({ success: true, message: 'All messages marked as read.' });
    } catch (error) {
        console.error('Error marking all messages as read:', error);
        res.status(500).json({ success: false, message: 'Failed to mark all messages as read.' });
    }
};

module.exports = { submitContact, getMessages, getUnreadCount, markAsRead, markAllAsRead };
