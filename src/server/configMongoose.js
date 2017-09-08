const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conf = {
  hostname: process.env.MONGO_HOSTNAME || "localhost",
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || "blog"
};
mongoose
  .connect(
    `mongodb://${conf.hostname}:
${conf.port}/${conf.env}`
  )
  .then(
    res => console.log("Mongo is connected!"),
    err => console.log("Mongo is error!", err)
  );

const articleSchema = new Schema({
  articleId: String,
  articleTitle: String,
  articleContent: String
});
const Article = mongoose.model("articles", articleSchema, "articles");

const userSchema = {
  username: { type: String, index: { unique: true, dropDups: true } },
  password: String,
  firstName: String,
  lastName: String,
  email: { type: String, index: { unique: true, dropDups: true } },
  role: { type: String, default: "editor" },
  verified: Boolean,
  imageUrl: String
};
const User = mongoose.model("User", userSchema, "pubUsers");

module.exports = {
  Article,
  User
};

// Article({
//   articleId: "4",
//   articleTitle: "Test 4",
//   articleContent: "Test 4 content"
// }).save((e, rs) => console.log(e, rs));
