import App, { Container } from "next/app";
import { Provider } from "react-redux";

import Layout from "../components/Layout";
import "antd/dist/antd.css";

import testHoc from "../lib/with-redux";

class MyApp extends App {
  state = {
    context: "value"
  };
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps}></Component>
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default testHoc(MyApp);
