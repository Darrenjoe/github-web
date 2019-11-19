import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

const Comp = dynamic(import("../components/comp"));

const A = ({ router, name, time }) => (
  <>
    <p>{time}</p>
    <Comp />
    <Link>
      <a className="link ">
        a {router.query.id} {name}
      </a>
    </Link>
    <style jsx>{`
      a {
        color: blue;
      }
      .link {
        color: red;
      }
    `}</style>
  </>
);

A.getInitialProps = async ctx => {
  const moment = await import("moment");
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "jokcy",
        time: moment.default(Date.now() - 60 * 1000).format()
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
