import jwt from 'jsonwebtoken'

//NOTE https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
