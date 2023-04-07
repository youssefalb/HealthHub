import { SessionProvider } from "next-auth/react";
import Layout from "../../components/Layout";
import '../styles/globals.css'


function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
    </SessionProvider>
    )
  }
  export default App;
