import { Avatar } from "antd";
import withRepoBasic from "../../components/with-repo-basic";

import api from "../../lib/api";

function IssuesItem({ issue }) {
  return (
    <div className="issue">
      <div className="avatar">
        <Avatar src={issue.user.avatar} shape="square" size={50} />
      </div>
      <div className="main-info">
        <h6>
          <span>{issue.title}</span>
        </h6>
        <p className="sub-info">
          <span>Updated at {issue.updated_at}</span>
        </p>
      </div>
      <style jsx>{`
        .issue {
          display: flex;
          position: relative;
          padding: 10px;
        }
        .issue:hover {
          background: #fafafa;
        }
        .issue + .issue {
          border-top: 1px solid #eee;
        }
        .main-info > h6 {
          max-with: 600px;
          font-size: 20px;
        }
        .avatar {
          margin-right: 20px;
        }
        .sub-info {
          margin-bottom: 0;
        }
        .sub-info > span + span {
          display: inline-block;
          margin-left: 20px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

function Issues({ issues }) {
  console.log(issues);
  return (
    <div className="root">
      <div className="issues">
        {issues.map(issue => (
          <IssuesItem issue={issue} key={issue.id} />
        ))}
      </div>
    </div>
  );
}

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;

  const issuesResp = await api.request(
    {
      url: `/repos/${owner}/${name}/issues`
    },
    ctx.req,
    ctx.res
  );

  return {
    issues: issuesResp.data
  };
};

export default withRepoBasic(Issues, "issues");
