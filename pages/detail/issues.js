import withRepoBasic from "../../components/with-repo-basic";

function Issues({ text }) {
  return <span>Issues Index {text} </span>;
}

Issues.getInitialProps = async () => {
  return {
    text: "1234"
  };
};

export default withRepoBasic(Issues, "issues");
