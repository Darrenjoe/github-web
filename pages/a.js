import { withRouter } from "next/router";

const A = ({ router }) => <span>a {router.query.id}</span>;
export default withRouter(A);
