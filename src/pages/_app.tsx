import { SessionProvider } from "next-auth/react";
import Layout from "../../components/Layout";
import '../styles/globals.css'
import { UserProvider } from '../../context/user'
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter"
})

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
        <Layout>
          <UserProvider >
            <Component {...pageProps} />
          </UserProvider>
        </Layout>
    </SessionProvider>
    )
  }
  export default App;
