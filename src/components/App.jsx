import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    axios.get("http://localhost:3000/").then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch({ type: "INCREMENT" })}>
          INC
        </button>
        <button onClick={() => this.props.dispatch({ type: "DECREMENT" })}>
          DEC
        </button>
        <span>
          Counter: {this.props.state.counter}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

// const mapDispatchToProps = dispatch => {
//   return { dispatch };
// };

export default connect(mapStateToProps)(App);
