import { useState, useCallback, cloneElement } from "react";

import Link from "next/link";
import {
  Button,
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu
} from "antd";

const { Header, Content, Footer } = Layout;

import Container from "./Container";
// import getConfig from "next/config";
import config from "../config";
// const { publicRunTimeConfig } = getConfig();
import { connect } from "react-redux";
import { logout } from "../store/store";
import axios from "axios";
import { withRouter } from "next/router";

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";
const OAUTH_URL = `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`;

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};

const footerStyle = {
  textAlign: "center"
};

function MyLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query;
  const [search, setSearch] = useState(urlQuery || "");

  const handleSearchChange = useCallback(
    event => {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  const handleLogout = useCallback(
    e => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  const handleGotoOAuth = useCallback(e => {
    e.preventDefault();
    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then(resp => {
        if (resp.status === 200) {
          location.href = OAUTH_URL;
        } else {
          console.log("prepare auth failed", resp);
        }
      })
      .catch(err => {
        console.log("prepare auth failed", err);
      });
  }, []);

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <a href="/" onClick={handleLogout}>
                  <Avatar size={40} src={user.avatar_url} />
                </a>
              ) : (
                <Tooltip title="点击登录">
                  <a href={OAUTH_URL} onClick={handleGotoOAuth}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Darren @<a href="491361994@qq.com">Darren@qq.com</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
}

export default connect(
  function mapState(state) {
    return {
      user: state.user
    };
  },
  function mapReducer(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }
)(withRouter(MyLayout));
