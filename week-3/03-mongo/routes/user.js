const { Router } = require("express");
const userRouter = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
userRouter.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      return res.status(404).json({
        error: "Username and Password are required",
      });
    }
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(404).json({
        msg: "username already exists",
      });
    }
    const userDetails = new User({
      username: username,
      password: password,
    });
    await userDetails.save();
    return res.status(200).json({
      msg: "user created successfully",
      id: userDetails._id,
    });
  } catch (error) {
    return res.status(404).json({
      error,
    });
  }
});

userRouter.get("/courses", async (req, res) => {
  // Implement listing all courses logic
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

userRouter.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    const course = await Course.findById({ _id: courseId });
    const user = await User.findOne({ username });
    await User.findByIdAndUpdate(
      user._id,
      { $push: { coursesPurchased: course._id } },
      { new: true }
    );
    return res.status(200).json({
      msg: "course purchased successfully",
      id: course._id,
    });
  } catch (error) {
    return res.status(404).json({
      error: "An Error Occoured",
    });
  }
});

userRouter.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  try {
    const user = await User.findOne({ username });
    const coursePurchased = user.coursesPurchased;
    const courses = [];
    for (let i = 0; i < coursePurchased.length; i++) {
      const course = await Course.findById({ _id: coursePurchased[i]._id });
      courses.push(course);
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(404).json({
      error: "An Error Occoured",
    });
  }
});

module.exports = userRouter;
