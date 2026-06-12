const Signup = require('../models/Signup');

const signup = async (req, res) => {
    console.log('Signup request body:', req.body);
    try {
        const { name, age, gender, city, phone, role, package: userPackage, email, password } = req.body;

        // Check if user already exists
        const existingSignup = await Signup.findOne({ email });
        console.log(`Checking if user exists for email: ${email} - Found: ${!!existingSignup}`);
        if (existingSignup) {
            if (existingSignup.status === 'blocked') {
                return res.status(400).json({ success: false, message: 'This email is associated with an account that has been blocked by the admin.' });
            }
            return res.status(400).json({ success: false, message: 'Signup already exists with this email.' });
        }

        const newSignup = new Signup({
            name,
            age,
            gender,
            city,
            phone,
            role,
            package: userPackage,
            email,
            password // In a real app, you should hash this password!
        });

        await newSignup.save();

        res.status(201).json({ success: true, message: 'Signup registered successfully.' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error during signup.', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Signup.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({ success: false, message: 'Your account has been blocked by the admin.' });
        }

        // Return user info (excluding password)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).json({ success: true, message: 'Login successful.', user: userData });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
    }
};

const getSignups = async (req, res) => {
    try {
        const users = await Signup.find().select('-password'); // Exclude passwords
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users.', error: error.message });
    }
};

const toggleBlockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Signup.findById(id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        
        user.status = user.status === 'blocked' ? 'active' : 'blocked';
        await user.save();
        
        res.status(200).json({ success: true, message: `User ${user.status} successfully.`, status: user.status });
    } catch (error) {
        console.error('Error toggling block status:', error);
        res.status(500).json({ success: false, message: 'Failed to toggle block status.', error: error.message });
    }
};

module.exports = { signup, login, getUsers: getSignups, toggleBlockUser };
