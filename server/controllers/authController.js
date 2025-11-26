const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

      
        if (!user.password) {
            return res.status(400).json({ message: "Please login with Google" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "Login failed" });
            }
            return res.status(200).json({ message: "Logged in successfully", user });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect(process.env.CLIENT_URL);
    });
};

exports.currentUser = (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
}
