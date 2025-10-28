const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TOKEN_EXPIRY = '10m';

exports.generateToken = (user) => {
  const payload = {
    sub: user._id.toString(),        // ✅ Add unique subject claim (userI
    username: user.username || user.email,
    role: user.roleName
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized: Token not provided' });

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    } else {
      return res.status(500).json({ error: 'Something went wrong with token verification' });
    }
  }
};

exports.requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized: User not found in token' });
  if (req.user.roleName !== role) return res.status(403).json({ error: 'Forbidden: Access denied' });
  next();
};
