import Repo from "../../components/Repo";
import Link from "next/link";

import api from "../../lib/api";

function Detail({ repoBasic }) {
  return (
    <div className="root">
      <div className="repo-basic">
        <Repo repo={repoBasic} />
        <div className="tabs">
          <Link href="/detail">
            <a className="tab index">Readme</a>
          </Link>
          <Link href="/detail/issues">
            <a className="tab issues">Issues</a>
          </Link>
        </div>
      </div>
      <div>Readme</div>
      <style jsx>{`
        .root {
          padding-top: 20px;
        }
        .repo-basic {
          padding: 20px;
          border: 1px solid #eee;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        .tab + .tab {
          margin-left: 20px;
        }
      `}</style>
    </div>
  );
}

Detail.getInitialProps = async ({ router, ctx }) => {
  const { owner, name } = ctx.query;

  const repoBasic = await api.request(
    {
      url: `/repos/${owner}/${name}`
    },
    ctx.req,
    ctx.res
  );
  return {
    repoBasic: repoBasic.data
  };
};

export default Detail;
