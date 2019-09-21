import Router from "next/router";
import store from "../store/store";
import { connect } from "react-redux";
const Index = ({ counter, username, rename, add }) => {
  function gotoTestB() {
    Router.push(
      {
        pathname: "/test/b",
        query: {
          id: 2
        }
      },
      "test/b/2"
    );
  }
  return (
    <>
      <span>Counter: {counter}</span>
      <a>name: {username}</a>
      <input value={username} onChange={e => rename(e.target.value)} />
      <button onClick={() => add(counter)}>Do Add</button>
    </>
  );
};

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter.count,
      username: state.user.username
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: num => dispatch({ type: "ADD", num }),
      rename: name => dispatch({ type: "UPDATE_USERNAME", name })
    };
  }
)(Index);
