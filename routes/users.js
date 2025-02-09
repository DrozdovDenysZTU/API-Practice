const express = require('express')
const { authenticateUser, authorizeAdmin } = require('./authMiddleware')
const router = express.Router()

let users = [
  {
    id: 1,
    name: 'Denys Drozdov',
    email: 'vtk241_ddyu@student.ztu.edu.ua',
    role: 'admin'
  },
  { id: 2, name: 'User', email: 'user@example.com', role: 'user' }
]

// 🔹 1. GET (all users)
router.get('/', authenticateUser, (req, res) => {
  res.status(200).json(users)
})

// 🔹 2. GET (all users)
router.get('/:id', authenticateUser, (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('User not found')
  res.status(200).json(user)
})

// 🔹 3. POST (admin only)
router.post('/', authenticateUser, authorizeAdmin, (req, res) => {
  const { name, email, role } = req.body
  const newUser = { id: users.length + 1, name, email, role }
  users.push(newUser)
  res.status(201).json(newUser)
})

// 🔹 4. PATCH (admin only)
router.patch('/:id', authenticateUser, authorizeAdmin, (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('User not found')

  const { name, email, role } = req.body
  if (name) user.name = name
  if (email) user.email = email
  if (role) user.role = role

  res.status(200).json(user)
})

// 🔹 5. DELETE (admin only)
router.delete('/:id', authenticateUser, authorizeAdmin, (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id))
  if (userIndex === -1) return res.status(404).send('User not found')

  const deletedUser = users.splice(userIndex, 1)
  res.status(200).json(deletedUser)
})

module.exports = router
