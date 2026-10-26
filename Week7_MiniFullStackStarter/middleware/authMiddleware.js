exports.protect = (req, res, next) => {
    // For now, simple simulation
    const userRole = req.headers.role;

    if (!userRole) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = { role: userRole };
    next();
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};