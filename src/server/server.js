const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const falcor = require("falcor");
const falcorExpress = require("falcor-express");
const bodyParser = require("body-parser");
const falcorRouter = require("falcor-router");
const routes = require("./routes.js");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

mongoose
  .connect("mongodb://localhost/blog")
  .then(
    res => console.log("Mongo is connected!"),
    err => console.log("Mongo is error!")
  );

const articleSchema = new Schema({
  articleId: ObjectId,
  articleTitle: String,
  articleContent: String
});

const Article = mongoose.model("Article", articleSchema, "articles");

// new blogPost({
//   title: "First blog",
//   body: "No content here!"
// }).save((err, blog) => {
//   console.log(err, blog);
// });

// app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(bodyParser.json({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:9000" }));

// app.get("/blog/:blogid", function(req, res) {
//   blogPost.find({}).then(rs => res.json(rs));
// });

app.use(
  "/model.json",
  falcorExpress.dataSourceRoute((req, res) => {
    return new falcorRouter(routes);
  })
);
app.use(express.static("dist"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
