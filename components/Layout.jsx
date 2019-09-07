import Link from "next/link";
import { Button } from "antd/lib/radio";

export default ({ children }) => (
  <>
    <header>
      <Link href="/a?id=1" as="/a/1">
        <Button>Index</Button>
      </Link>
      <Link href="/test/b" as="/test/b">
        <Button>Test</Button>
      </Link>
    </header>
    {children}
  </>
);
