import React, { useState, useEffect } from "react";

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

function MyCountFunc() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const inerval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  }, []);
  return <span>{count}</span>;
}

export default MyCountFunc;
