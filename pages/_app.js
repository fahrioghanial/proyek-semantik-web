import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/logoseagames.png" />
        <title>Sea Games</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
