import React, {
  useState,
  useReducer,
  useLayoutEffect,
  useContext,
  useEffect,
  useRef
} from "react";
import myContext from "../lib/my-context";

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
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState("Darren");
  const context = useContext(myContext);
  const inputRef = useRef();
  // useEffect(() => {
  //   const inerval = setInterval(() => {
  //     // setCount(c => c + 1);
  //     disppatchCount({ type: "minus" });
  //   }, 1000);
  //   return () => clearInterval(inerval);
  // }, []);
  useEffect(() => {
    console.log(inputRef);
    return () => {
      console.log("effct deteched");
    };
  }, []);
  // useLayoutEffect 会在
  useLayoutEffect(() => {
    console.log("layoutEffct invoked");
    return () => {
      console.log("layoutEffct deteched");
    };
  }, [count]);
  return (
    <div>
      <input
        ref={inputRef}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => dispatchCount({ type: "add" })}>{count}</button>
      <p>{context}</p>
    </div>
  );
}

export default MyCountFunc;
