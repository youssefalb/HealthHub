import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* saves session (actually a session fetcher) in a context . when the
      session is valid it fetches */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
          <Component {...pageProps} />
          <ToastContainer/>
      </Layout>
        </LocalizationProvider>
    </SessionProvider>
  );
}
export default App;
