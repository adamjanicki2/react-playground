import { Route, Router, Routes } from "@adamjanicki/ui";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import About from "src/pages/About";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import Preview from "src/pages/Preview";

export default function App() {
  return (
    <Router basename="/react-playground">
      <Nav />
      <Routes fallback={<NotFound />}>
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<About />} />
        <Route path="/preview/" element={<Preview />} />
      </Routes>
      <Footer />
    </Router>
  );
}
