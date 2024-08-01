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

  return (
    <div className="flex justify-center w-100 pt3">
      <Playground width={screenWidth} />
    </div>
  );
};

export default Home;
