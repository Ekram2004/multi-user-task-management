const User = require('../../modules/users/userModel');
const ApiError = require('../../utils/ApiError');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../utils/token');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // return next (new ApiError(400, 'email already regietered'));
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await  User.create({ name, email, password: hashPassword });
        res.status(201).json({ message: 'User registered' });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next (new ApiError(401, 'Invalid creadential'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next (new ApiError(401, 'Invalid creadential'));
        }
        const payload = { userId: user._id, email: user.email };
        const secret = process.env.JWT_SECRET;
    const accessToken = generateToken(payload, secret, "1d");
        return res.json({accessToken});
    
}