import Page from "src/components/Page";
import { ui } from "@adamjanicki/ui";
import Link from "src/components/Link";

export default function About() {
  return (
    <Page title="About">
      <ui.p
        vfx={{
          paddingX: "l",
          fontSize: "m",
          fontWeight: 5,
          color: "muted",
        }}
        style={{ width: "70%" }}
      >
        This is a site where you can play around with writing super simple React
        components and rendering them in-browser so you don't have to worry
        about going through the hassle of spinning up new dev environments every
        single time you just want to tinker around a bit.
        <ui.br />
        <ui.br />
        Using the app is simple, on the <Link to="/">home page</Link>, you will
        find 2 portions of the window. On the left hand side is an editor where
        you can write your JSX, and on the right side is where you will see the
        output of your component. For performance reasons, the output is not
        recompiled on every keystroke, so you will have to manually do that.
        <ui.br />
        <ui.br />
        To compile your code, you can either click the "Compile" button or use
        the keyboard shortcut <ui.code>Ctrl + S</ui.code>. This will update the
        output on the right side of the screen. Importantly, using this app
        assumes you're already familar with React, but in case you aren't, I
        might consider adding a very in-depth tutorial page to the site in the
        future.
        <ui.br />
        <ui.br />
        As I mentioned above, this is supposed to be a simple playground. As
        such, this is a frontend-only app, and you cannot permanentely persist
        the playground components you create. To make things a little bit
        easier, your work will be saved in local storage so you can come back to
        it later. However, this is not a guarantee, and you should not rely on
        this feature to persist your work as clearing your browser cache and
        cookies will permanently erase this data. If you really care about
        something you make, make sure to download it!
      </ui.p>
    </Page>
  );
}
