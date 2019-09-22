import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const initialState = {
  count: 0
};
const userInitialState = {
  username: "Darren"
};

const ADD = "ADD";

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const UPDATE_USERNAME = "UPDATE_USERNAME";
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      };
    default:
      return state;
  }
}

const allReducer = combineReducers({
  counter: counterReducer,
  user: userReducer
});

export function add(num) {
  return {
    type: ADD,
    num
  };
}

// store.dispatch({ type: ADD });
// store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch({ type: ADD });
export default function initializeStore(state) {
  const store = createStore(
    allReducer,
    Object.assign(
      {},
      {
        counter: initialState,
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
