import withRepoBasic from "../../components/with-repo-basic";

function Detail({ text }) {
  return <span>Detail Index {text} </span>;
}

Detail.getInitialProps = async () => {
  return {
    text: "1234"
  };
};

export default withRepoBasic(Detail, "index");
