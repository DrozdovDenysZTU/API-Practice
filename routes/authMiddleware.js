const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

// Check JWT-token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ message: 'Access denied' })

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
}

// Check role
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' })
  }
  next()
}

module.exports = { authenticateUser, authorizeAdmin }
