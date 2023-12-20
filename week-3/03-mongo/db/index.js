const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://admin:password@localhost:27017");

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  coursesCreated: [{ type: mongoose.ObjectId, ref: "Course" }],
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  coursesPurchased: [{ type: mongoose.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
