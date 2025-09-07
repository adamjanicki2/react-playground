import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, TripleFade as Hamburger, ui } from "@adamjanicki/ui";
import Link, { UnstyledLink } from "src/components/Link";
import Logo from "src/images/logo.svg?react";
import "src/components/nav.css";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Navlink = (props: NavlinkProps) => (
    <Link
      vfx={{ width: "full", fontWeight: 5, color: "default" }}
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
