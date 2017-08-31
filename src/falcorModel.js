import falcor from "falcor";
import FalcorDataSource from "falcor-http-datasource";
const model = new falcor.Model({
  source: new FalcorDataSource("http://localhost:3000/model.json", {
    crossDomain: true
  })
});
export default model;
