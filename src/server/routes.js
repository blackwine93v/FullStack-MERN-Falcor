const configMongoose = require("./configMongoose");
const sessionRoutes = require("./routesSession");
const Article = configMongoose.Article;

const PublishingAppRoutes = [
  ...sessionRoutes,
  ,
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
