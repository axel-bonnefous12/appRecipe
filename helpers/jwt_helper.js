const jwt = require('jsonwebtoken')

module.exports = {
    
    verifyAccessToken: (req, res, next) => {
      if (!req.headers['authorization']) return next(createError.Unauthorized())
      const authHeader = req.headers['authorization']
      const bearerToken = authHeader.split(' ')
      const token = bearerToken[1]
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return "test"
        }
        req.payload = payload
        next()
      })
    }
}