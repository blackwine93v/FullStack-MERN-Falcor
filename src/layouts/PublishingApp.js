import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import falcorModel from "../falcorModel.js";
import { bindActionCreators } from "redux";
import articleActions from "../actions/article.js";
import PropTypes from "prop-types";

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
    const from = 0,
      to = articlesLength - 1;
    if (to >= 0) {
      const articles = await falcorModel
        .get([
          "articles",
          { from, to },
          ["articleId", "articleTitle", "articleContent"]
        ])
        .then(articlesResponse => articlesResponse.json.articles);
      this.props.articleActions.articlesList(articles);
    }
  }

  renderArticles(articles) {
    return Object.keys(articles).map(key => {
      let item = articles[key];
      if (item.articleId)
        return <h1 key={item.articleId}>{item.articleTitle}</h1>;
    });
  }

  render() {
    return <div>{this.renderArticles(this.props.articles)}</div>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return { articleActions: bindActionCreators(articleActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
