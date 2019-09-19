import React, { useState, useReducer, useEffect } from "react";

class MyCount extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    this.inerval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  componentWillUnmount() {
    if (this.inerval) {
      clearInterval(this.inerval);
    }
  }
  render() {
    return <span>{this.state.count}</span>;
  }
}

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

function MyCountFunc() {
  // const [count, setCount] = useState(0);
  const [count, disppatchCount] = useReducer(countReducer, 0);

  useEffect(() => {
    const inerval = setInterval(() => {
      // setCount(c => c + 1);
      disppatchCount({ type: "minus" });
    }, 1000);
    return () => clearInterval(inerval);
  }, []);
  return <span>{count}</span>;
}

export default MyCountFunc;
