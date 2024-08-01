import Link from "src/components/Link";
import PageWrapper from "src/components/PageWrapper";

const Home = () => (
  <PageWrapper title="About">
    <p className="f5 fw4 w-70" style={{ lineHeight: 1.5 }}>
      <h1>Welcome to React Playground!</h1>
      This is a site where you can play around with writing super simple React
      components and rendering them in-browser so you don't have to worry about
      going through the hassle of spinning up new dev environments every single
      time you just want to tinker around a bit.
      <h1>How to use</h1>
      Using the app is simple, on the <Link to="/">home page</Link>, you will
      find 2 portions of the window. On the left hand side is an editor where
      you can write your JSX, and on the right side is where you will see the
      output of your component. For performance reasons, the output is not
      recompiled on every keystroke, so you will have to manually do that.
      <br />
      <br />
      To compile your code, you can either click the "Compile" button or use the
      keyboard shortcut <code>Ctrl + S</code>. This will update the output on
      the right side of the screen. Importantly, using this app assumes you're
      already familar with React, but in case you aren't, I might consider
      adding a very in-depth tutorial page to the site in the future.
      <h1>Persisting data</h1>
      As I mentioned above, this is supposed to be a simple playground. As such,
      this is a frontend-only app, and you cannot permanentely persist the
      playground components you create. To make things a little bit easier, your
      work will be saved in local storage so you can come back to it later.
      However, this is not a guarantee, and you should not rely on this feature
      to persist your work as clearing your browser cache and cookies will
      permanently erase this data. If you really care about something you make,
      make sure to download it!
    </p>
  </PageWrapper>
);

export default Home;
