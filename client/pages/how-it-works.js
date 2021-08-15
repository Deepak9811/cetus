import React, { Component } from "react";
import Footer from "./common/footer";
import Head from "next/head";

export class how_it_work extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>How it work</title>
        </Head>
        <div className="mn_p dspy_f_">
          <div className="abt_p">
            <div className="plc_p hwtiw">
              <h1>Send request to tutor</h1>
            </div>

            <div className="plc_p hwtiw mgt-2">
              <h1>Tutor will connect with you</h1>
            </div>

            <div className="plc_p hwtiw mgt-2 mg_b-5">
              <h1>Learn live at your device</h1>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default how_it_work;


