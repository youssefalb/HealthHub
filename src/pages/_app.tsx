import { SessionProvider } from "next-auth/react";
import Layout from "../../components/Layout";
import '../styles/globals.css'
import AppStore from '../../context/user'


function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
        <Layout>
        <AppStore>
        <Component {...pageProps} />
        </AppStore>
        </Layout>
    </SessionProvider>
    )
  }
  export default App;
