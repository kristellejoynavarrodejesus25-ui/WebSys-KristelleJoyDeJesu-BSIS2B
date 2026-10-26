const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
exports.register = async (req, res) => {
try {
const { username, email, password } = req.body;

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({
username,
email,
password: hashedPassword
});

await user.save();

res.status(201).json({ message: 'User registered successfully' });

} catch (error) {
res.status(500).json({ error: error.message });
}
};

// LOGIN
exports.login = async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(404).json({ message: 'User not found' });
}

// Compare password
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
return res.status(400).json({ message: 'Invalid credentials' });
}

res.status(200).json({
message: 'Login successful',
user: {
id: user._id,
role: user.role
}
});

} catch (error) {
res.status(500).json({ error: error.message });
}
};
 