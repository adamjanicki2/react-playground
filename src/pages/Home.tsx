import { useWindowResize } from "@adamjanicki/ui";
import { useState } from "react";
import Playground from "src/components/Playground";
import { useTitle } from "src/hooks";
import { usableWidth } from "src/utils/helpers";

export default function Home() {
  const [screenWidth, setScreenWidth] = useState(usableWidth());

  useTitle("React Playground");
  useWindowResize(() => setScreenWidth(usableWidth()));

  return <Playground width={screenWidth} />;
}
