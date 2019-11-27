import { withRouter } from "next/router";

function Search({ router }) {
  return (
    <div>
      <span>{router.query.query}</span>
    </div>
  );
}

export default withRouter(Search);
