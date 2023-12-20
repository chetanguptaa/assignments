const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    if (!username || !password) {
      return res.status(404).json({
        msg: "username and password is required",
      });
    }
    const user = await User.findOne({ username: username });
    if (user.password === password) {
      next();
    } else {
      return res.status(404).json({
        msg: "Incorrect username or password",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "An Error Occured",
    });
  }
}

module.exports = userMiddleware;
