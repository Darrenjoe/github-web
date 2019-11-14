import { useState, useCallback, cloneElement } from "react";
import { connect } from "react-redux";

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

function MyLayout({ children, user }) {
  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback(
    event => {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const handleOnSearch = useCallback(() => {});
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)">登 出</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
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
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击登录">
                  <a href={OAUTH_URL}>
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
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  );
}

export default connect(function mapState(state) {
  return {
    user: state.user
  };
})(MyLayout);
