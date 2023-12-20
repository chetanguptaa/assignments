const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    if (!username || !password) {
      return res.status(404).json({
        msg: "username and password is required",
      });
    }
    const admin = await Admin.findOne({ username: username });
    if (admin.password === password) {
      next();
    } else {
      return res.status(200).json({
        msg: "Incorrect username or password",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "An Error Occured",
    });
  }
}

module.exports = adminMiddleware;
