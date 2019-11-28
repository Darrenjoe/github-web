import { Button, Icon } from "antd";
import config from "../config";
import { connect } from "react-redux";

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const OAUTH_URL = `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`;

const api = require("../lib/api");

function Index({ userRepos, userStaredRepos, user }) {
  console.log(userRepos);
  console.log(userStaredRepos);

  if (!user || !user.id) {
    return (
      <div className="root">
        <p>您还没有登录哦</p>
        <Button type="primary" href={OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="uer avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="amil" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className="user-repos">
        <p>User Repos</p>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          padding: 20px 0;
          align-items: flex-start;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false
    };
  }
  const userRepos = await api.request(
    {
      url: "/user/repos"
    },
    ctx.req,
    ctx.res
  );

  const userStaredRepos = await api.request(
    {
      url: "/user/starred"
    },
    ctx.req,
    ctx.res
  );

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data
  };
};
export default connect(function mapState(state) {
  return {
    user: state.user
  };
})(Index);
