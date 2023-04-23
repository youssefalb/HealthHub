import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {/*saves session (actually a session fetcher) in a context . when the
      session is valid it fetches */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default App;
