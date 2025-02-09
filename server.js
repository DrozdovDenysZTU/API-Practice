require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
