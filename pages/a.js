import { withRouter } from "next/router";
import Link from "next/link";

const A = ({ router, name }) => (
  <>
    <Link>
      <a className="link">
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
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "jokcy"
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
