const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const adminRouter = Router();
const { Admin } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

// Admin Routes
adminRouter.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      return res.status(404).json({
        error: "Username and Password are required",
      });
    }
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(404).json({
        msg: "username already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const adminDetails = new Admin({
      username: username,
      password: hash,
    });
    await adminDetails.save();
    const token = jwt.sign({ username }, jwtPassword);
    return res.status(200).json({
      msg: "admin created successfully",
      id: adminDetails._id,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      return res.status(404).json({
        error: "Username and Password are required",
      });
    }
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(404).json({
        msg: "username does not exists",
      });
    }
    const hash = await bcrypt.compare(password, admin.password);
    if (hash) {
      const token = jwt.sign({ username }, jwtPassword);
      return res.status(200).json({
        token,
      });
    } else {
      res.status(404).json({
        err: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
});

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!title || !description || !price || !imageLink) {
      return res.status(404).json({
        error: "title, description, price, and imageLink are required fields",
      });
    }
    const courseDetails = new Course({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
    });
    await courseDetails.save();
    await Admin.findByIdAndUpdate(
      admin.id,
      { $push: { coursesCreated: courseDetails._id } },
      { new: true }
    );
    return res.status(200).json({
      msg: "course created successfully",
      id: courseDetails._id,
    });
  } catch (error) {
    return res.status(404).json({
      error: "an error occoured",
    });
  }
});

adminRouter.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
});

module.exports = { adminRouter, jwtPassword };
