import React, { Component } from "react";
import Footer from "./common/footer";
import Head from "next/head";

export class about extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>About</title>
        </Head>
        <div className="mn_p">
          <div className="abt_p plc_ies_p">
            <div className="plc_p">
              <h5>
                India’s Largest Tutor Shoutout platform.Make every moment
                special with a personalized message from your favorite
                Tutor. "Celebze - Unbox Your Wish" is a platform where fans
                can book personalized video shoutouts, Live Video
                Calls/Sessions, & Request DM on Instagram from their favorite
                Actors,Actresses,Singers,Athletes,Influencers,Youtubers,etc. Our
                mission is to create the most authentic and memorable fan
                experiences in the world. Personalised Tutor videos are
                perfect for any occasion and can be booked from our platform.
              </h5>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default about;
