import { Banner, Icon } from "@adamjanicki/ui";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import About from "src/pages/About";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename="/react-playground">
      {/* TODO: delete */}
      <Banner
        type="warning"
        vfx={{
          axis: "x",
          align: "center",
          gap: "m",
          fontWeight: 6,
        }}
      >
        <Icon icon="warning-circle" />
        The site is being update to V2, and is currently down.
      </Banner>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<About />} />
        {/* Make sure this is the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
