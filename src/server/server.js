const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const falcor = require("falcor");
const falcorExpress = require("falcor-express");
const bodyParser = require("body-parser");
const falcorRouter = require("falcor-router");
const routes = require("./routes.js");

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:9000" }));

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
