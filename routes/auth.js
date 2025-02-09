const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const SECRET_KEY = process.env.SECRET_KEY

let users = [
  {
    id: 1,
    name: 'Denys Drozdov',
    email: 'vtk241_ddyu@student.ztu.edu.ua',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  },
  {
    id: 2,
    name: 'User',
    email: 'user@example.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'user'
  }
]

// 1. Login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email)

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: '1h'
  })
  res.status(200).json({ token })
})

// 2. Registration
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body
  const existingUser = users.find((u) => u.email === email)

  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: role || 'user'
  }

  users.push(newUser)
  res.status(201).json({ message: 'User registered successfully' })
})

module.exports = router
