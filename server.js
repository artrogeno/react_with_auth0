const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const checkScope = require('express-jwt-authz')

require('dotenv').config()

const checkJwk = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_OAUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_OAUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_OAUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '20mb' }))

// MIDDLEWARE
const checkRoles = role => {
  return (req, res, next) => {
    const assignedRoles = req.user[`${process.env.REACT_APP_API_URL}/roles`]
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next()
    }
    return res.status(401).send('Insuffcient role')
  }
}

// ROUTES
app.get('/public', (req, res) => {
  res.json({
    message: 'Hello from a public API'
  })
})

app.get('/private', checkJwk, (req, res) => {
  res.json({
    message: 'Hello from a private API'
  })
})

app.get('/course', checkJwk, checkScope(['read:courses']), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: 'Build app with React and redux' },
      { id: 2, title: 'Create reusable React Components' },
      { id: 3, title: 'Build api with NodeJs' }
    ]
  })
})

app.get('/admin', checkJwk, checkRoles('admin'), (req, res) => {
  res.json({
    message: 'Hello from a admin API'
  })
})

app.listen(3001)

console.log(`API server listening on ${process.env.REACT_APP_API_URL}`)
