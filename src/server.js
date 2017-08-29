const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

mongoose
  .connect("mongodb://localhost/blog")
  .then(
    res => console.log("Mongo is connected!"),
    err => console.log("Mongo is error!")
  );

const blogPostSchema = new Schema({
  id: ObjectId,
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

const blogPost = mongoose.model("blogPost", blogPostSchema);

// new blogPost({
//   title: "First blog",
//   body: "No content here!"
// }).save((err, blog) => {
//   console.log(err, blog);
// });

// app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(cors());

app.get("/blog/:blogid", function(req, res) {
  blogPost.find({}).then(rs => res.json(rs));
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
