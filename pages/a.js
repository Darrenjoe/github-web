import { withRouter } from "next/router";

const A = ({ router }) => <span>a {router.query.id}</span>;

A.getInitialProps = async () => {
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
