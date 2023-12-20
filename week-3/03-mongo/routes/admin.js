const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Course, Admin } = require("../db");
const adminRouter = Router();

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
    const adminDetails = new Admin({
      username: username,
      password: password,
    });
    await adminDetails.save();
    return res.status(200).json({
      msg: "admin created successfully",
      id: adminDetails._id,
    });
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
  const username = req.headers.username;
  try {
    if (!title || !description || !price || !imageLink) {
      return res.status(404).json({
        error: "title, description, price, and imageLink are required fields",
      });
    }
    const admin = await Admin.findOne({ username: username });
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

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(404).json({
      error: "An Error Occoured",
    });
  }
});

module.exports = adminRouter;
