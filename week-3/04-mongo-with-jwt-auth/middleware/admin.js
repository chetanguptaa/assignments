const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const jwtPassword = "secret";

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(404).json({
        msg: "authentication required",
      });
    }
    const adminJwt = jwt.verify(token, jwtPassword);
    if (adminJwt) {
      const admin = await Admin.findOne({ username: adminJwt.username });
      if (!admin) {
        return res.status(404).json({
          message: "Admin does not exist",
        });
      }
      next();
    } else {
      return res.status(400).json({
        msg: "Login again",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
}

module.exports = adminMiddleware;
