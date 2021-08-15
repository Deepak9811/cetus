import React, { Component } from "react";
import Home from "./home";
// import Countdown from "./countdown/countdown"
import Head from "next/head";

export class Index extends Component {

  


  render() {
    return (
      <>
        <Head>
          <title>Cetus Academy</title>
          {/* <link rel="shortcut icon" href="/image/favicon.ico.png" /> */}
          {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
        </Head>
        
        <Home />
        {/* <Countdown/> */}
      </>
    );
  }
}

export default Index;
