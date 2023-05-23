import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* saves session (actually a session fetcher) in a context . when the
      session is valid it fetches */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
        </LocalizationProvider>
    </SessionProvider>
  );
}
export default App;
