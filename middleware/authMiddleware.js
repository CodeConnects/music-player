const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.userID = decodedToken.userID;
    next();
  } catch (error) { 
    console.log('jwt token not verified');
    return res.status(500).send({ message: error.message, success: false });
  }
}
