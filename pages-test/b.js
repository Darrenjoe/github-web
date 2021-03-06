import React, {
  useState,
  useReducer,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  memo,
  useMemo,
  useCallback
} from "react";

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
  const [count, dispatchCount] = useReducer(countReducer, 0);
  const [name, setName] = useState("Darren");
  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? "red" : "blue"
    }),
    [count]
  );
  const handleButtonClick = useCallback(
    () => dispatchCount({ type: "add" }),
    []
  );
  const handleAlertButtonClick = () => {
    setTimeout(() => {
      alert(count);
    }, 2000);
  };
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child config={config} onButtonClick={handleButtonClick}></Child>
      <button onClick={handleAlertButtonClick}>alert count</button>
    </div>
  );
}

const Child = memo(function Child({ onButtonClick, config }) {
  console.log("child render");
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  );
});

export default MyCountFunc;
