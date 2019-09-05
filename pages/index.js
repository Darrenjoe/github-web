import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";

export default () => {
  function gotoTestB() {
    Router.push({
      pathname: "/test/b",
      query: {
        id: 2
      }
    });
  }
  return (
    <>
      <Link href="/a?id=1" title="AAA">
        <Button>Index</Button>
      </Link>
      <Button onClick={gotoTestB}></Button>
    </>
  );
};
