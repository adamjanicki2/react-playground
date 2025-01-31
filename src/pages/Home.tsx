import { useEffect, useState } from "react";
import Playground from "src/components/Playground";
import { usableWidth } from "src/utils/util";

const Home = () => {
  const [screenWidth, setScreenWidth] = useState(usableWidth());

  useEffect(() => {
    document.title = "React Playground";
    const handleResize = () => setScreenWidth(usableWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <Playground width={screenWidth} />;
};

export default Home;
