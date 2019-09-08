import { createStore } from "redux";

const initialState = {
  count: 0
};

const ADD = "ADD";

function reducer(state = initialState, action) {
  switch (action) {
    case ADD:
      return { count: state.count + 1 };
      break;
    default:
      return state;
  }
}

const store = createStore(reducer, initialState);
