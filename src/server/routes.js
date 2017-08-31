const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

mongoose
  .connect("mongodb://localhost/blog")
  .then(
    res => console.log("Mongo is connected!"),
    err => console.log("Mongo is error!")
  );

const articleSchema = new Schema({
  articleId: String,
  articleTitle: String,
  articleContent: String
});

const Article = mongoose.model("article", articleSchema, "articles");
// Article({
//   articleId: "4",
//   articleTitle: "Test 4",
//   articleContent: "Test 4 content"
// }).save((e, rs) => console.log(e, rs));

const PublishingAppRoutes = [
  {
    route: "articles.length",
    get: () => {
      return Article.count({}, (e, count) => {
        return count;
      }).then(count => ({
        path: ["articles", "length"],
        value: count
      }));
    }
  },
  {
    route: 'articles[{integers}]["id","articleTitle","articleContent"]',
    get: pathSet => {
      const articlesIndex = pathSet[1];
      console.log(articlesIndex);

      return Article.find({}, (e, docs) => docs).then(articlesArrayFromDB => {
        let results = [];
        articlesIndex.forEach(index => {
          const singleArticleObject = articlesArrayFromDB[index].toObject();
          const falcorSingleArticleResult = {
            path: ["articles", index],
            value: singleArticleObject
          };
          results.push(falcorSingleArticleResult);
        });
        return results;
      });
    }
  }
];

module.exports = PublishingAppRoutes;
