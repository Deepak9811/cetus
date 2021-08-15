import "../styles/style.css";
import "../styles/style2.css";
import "../styles/swiper.css";
import "../styles/style.css";
import "../styles/bs.css";
import "../styles/signin.css";
import Head from "next/head";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "swiper/components/navigation/navigation.scss";
import Header from "./common/header";


function MyApp({ Component, pageProps }) {


  


  return (
    <div className="mdia">
      <Head>
        <link rel="shortcut icon" href="/image/favicon.ico.png" />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>

      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
