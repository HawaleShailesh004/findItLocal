const jwt = require('jsonwebtoken');
const config = process.env; // Assuming your secret is stored in env variables

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded; // Store user data in request for later use
        next();
    });
};

// Admin verification middleware
const verifyAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }

        req.user = user;

        // Check if the user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    });
};

module.exports = { verifyToken, verifyAdmin };
