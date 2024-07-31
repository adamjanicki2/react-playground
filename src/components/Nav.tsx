import "src/components/nav.css";
import { UnstyledLink } from "src/components/Link";

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
  <>
    <nav className="flex items-center justify-between w-100 nav pv2 ph4">
      <UnstyledLink className="nav-title" to="/">
        React Playground
      </UnstyledLink>
      <ul className="flex items-center link-container ma0">
        <Navlink to="/">Home</Navlink>
        <Navlink to="/about/">About</Navlink>
      </ul>
    </nav>
    <div className="nav-padding" />
  </>
);

export default Nav;
