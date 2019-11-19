import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const userInitialState = {};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const allReducer = combineReducers({
  user: userReducer
});

export default function initializeStore(state) {
  const store = createStore(
    allReducer,
    Object.assign(
      {},
      {
        user: userInitialState
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
