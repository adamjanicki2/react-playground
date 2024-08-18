import "src/components/nav.css";
import { UnstyledLink } from "src/components/Link";
import { ReactComponent as Logo } from "src/images/logo.svg";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

const Navlink = (props: NavlinkProps) => (
  <li className="navlink-li">
    <UnstyledLink className="navlink" {...props} />
  </li>
);

const Nav = () => (
  <nav className="flex items-center justify-between w-100 nav nav-bs pv2 ph4">
    <UnstyledLink className="nav-title flex items-center" to="/">
      <span className="desktop mr2">React Playground</span>
      <Logo style={{ height: 32 }} />
    </UnstyledLink>
    <ul className="flex items-center link-container ma0">
      <Navlink to="/about/">About</Navlink>
    </ul>
  </nav>
);

export default Nav;
