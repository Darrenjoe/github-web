import App, { Container } from "next/app";
import Layout from "../components/Layout";
import "antd/dist/antd.css";
import MyContext from "../lib/my-context";

class MyApp extends App {
  state = {
    context: "value"
  };
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Layout>
          <MyContext.Provider value={this.state.context}>
            <Component {...pageProps}></Component>
          </MyContext.Provider>
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
