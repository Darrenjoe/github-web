import { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { connect } from "react-redux";
import { add } from "../store/store";
// import getConfig from "next/config";
import config from "../config";
// const { publicRunTimeConfig } = getConfig();
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const OAUTH_URL = `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`;

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

  useEffect(() => {
    axios.get("/api/user/info").then(resp => console.log(resp));
  }, []);

  return (
    <>
      <span>Counter: {counter}</span>
      <a>name: {username}</a>
      <input value={username} onChange={e => rename(e.target.value)} />
      <button onClick={() => add(counter)}>Do Add</button>
      <a href={OAUTH_URL}>去登录</a>
    </>
  );
};

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3));
  return {};
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
