const User = require('./db/userModel');

module.exports = async (req, res, next) => {
  //   get the token from the authorization header
  const token = await req.headers.authorization.split(" ")[1];

  // Get User by authkey
  User.findOne({'_id': token}, (err, user) => {
    if (err) {
      res.status(401).json({
        error: new Error('Not Authorize'),
      });
    } else {
      req.user = user;
      next();
    }
  });
};