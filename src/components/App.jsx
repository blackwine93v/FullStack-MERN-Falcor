import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import falcorModel from "../falcorModel.js";
import { bindActionCreators } from "redux";
import articleActions from "../actions/article.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    // axios.get("http://localhost:3000/").then(res => console.log(res));
    this._fetch();
  }

  async _fetch() {
    const articlesLength = await falcorModel
      .getValue("articles.length")
      .then(length => length);
    const articles = await falcorModel
      .get([
        "articles",
        { from: 0, to: articlesLength - 1 },
        ["id", "articleTitle", "articleContent"]
      ])
      .then(articlesResponse => articlesResponse.json.articles);
    this.props.articleActions.articlesList(articles);
  }

  render() {
    return (
      <div>
        {/* {this.props.articles.map(item => (
          <span key={item.id}>{item.articleTitle}</span>
        ))} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => {
  return { articleActions: bindActionCreators(articleActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
