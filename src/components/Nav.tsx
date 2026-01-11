import "src/components/nav.css";

import {
  Box,
  Link,
  TripleFade as Hamburger,
  ui,
  UnstyledLink,
} from "@adamjanicki/ui";
import { useState } from "react";
import Logo from "src/images/logo.svg?react";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const Navlink = (props: NavlinkProps) => (
    <Link
      vfx={{ width: "full", color: "default" }}
      style={{ whiteSpace: "nowrap" }}
      onClick={closeMenu}
      {...props}
    />
  );

  return (
    <ui.nav id="nav" vfx={{ paddingY: "s", paddingX: "l", borderBottom: true }}>
      <Box
        vfx={{ axis: "x", align: "center", justify: "between" }}
        className="bar-container"
      >
        <UnstyledLink
          vfx={{ axis: "x", align: "center", gap: "s" }}
          className="nav-title"
          to="/"
          onClick={closeMenu}
        >
          <Logo height={32} />
          React Playground
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <Box
        className="desktop navlink-container"
        // force display to be open on mobile when hamburger is toggled
        style={open ? { display: "flex" } : undefined}
      >
        <Navlink to="/">Home</Navlink>
        <Navlink to="/about/">About</Navlink>
      </Box>
    </ui.nav>
  );
}
