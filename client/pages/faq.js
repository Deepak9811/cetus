import React, { Component } from "react";
import Footer from "./common/footer";
import Head from "next/head";

export class faq extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>FAQ</title>
        </Head>
        <div className="mn_p">
          <div className="plc_ies_p">
            <div className="plc_p">
              <h1>FAQ</h1>
              <h3>Q : What is Cetus Academy?</h3>
              <p>
                A : Cetus Academy is a website where you can book personalized video
                shout outs from your favourite tutor for all occasions.
                Our mission is to create an authentic and momentous experience
                which you will cherish for the rest of your life.
              </p>

              <h4>Q : How does Cetus Academy Work?</h4>
              <p>
                A : It’s simple, select the celebrity, fill in the details, type
                your message and click on “Book Now”. You’re set! Now all you
                have to do is be a little patient for the celebrity to reply to
                your request.
              </p>

              <h4>Q : How much does a personalized video message cost?</h4>
              <p>
                A : The cost of a Cetus Academy video is set independently. Since we
                have tutor from different walks of life, the price will
                vary depending on which celebrity you choose.
              </p>

              <h4>Q : How will I receive my personalized video message?</h4>
              <p>
                A : Within 15 days, you will receive a downloadable personalized
                video message link in the email id provided by you.
              </p>

              <h4>
                Q : What if I don’t get my personalized video message and I have
                already paid for it?{" "}
              </h4>
              <p>
                A : Don’t worry, Cetus Academy has a 15-day expiry day for the
                celebrity to accept your request failing which the you will be
                given an option to choose another celebrity or else the request
                gets cancelled and your amount is fully refunded. This happens
                in the rarest of cases.
              </p>

              <h4>Q : What’ that “Cetus Academy” written on the video?</h4>
              <p>
                A : That’s our watermark and it will remain on all personalized
                video messages.
              </p>

              <h4>Q : Can I order Cetus Academy merchandise?</h4>
              <p>
                A : Sure you can. We would love to see you in our Cetus Academy Charm.
              </p>

              <h4>Q : Can I be notified when new talent joins Cetus Academy?</h4>
              <p>
                A : Yes! There are 2 ways to be notified when your favourite
                talent joins Cetus Academy! You can subscribe to our newsletter, or if
                you request talent - you will get an email as soon as they join.
              </p>

              <h4>Q : How do I contact the Cetus Academy team?</h4>
              <p>
                A : We’d love to chat! Feel free to contact us here
                – Cetus Academy.operations@gmail.com, and one of our team members will
                get back to you as soon as possible.
              </p>

              <h4>Q : Why did my order get declined?</h4>
              <p>
                A : It may be due to one or more reasons, including but not
                limited to: celeb unavailability, inappropriate request or
                message, business name or brand name mentioned in the personal
                message request, not enough time, etc. We suggest to re-book the
                order and place the request following the Cetus Academy standard order
                guidelines. Or you may call us at our helpline number for
                assistance.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default faq;
