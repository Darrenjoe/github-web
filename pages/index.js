import Router from "next/router";
import store from "../store/store";
export default () => {
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
      <span>Index</span>
    </>
  );
};
