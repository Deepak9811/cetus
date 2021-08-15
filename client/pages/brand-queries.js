import React, { Component } from "react";
import Footer from "./common/footer";
import Head from "next/head";

export class BrandQueries extends Component {
  componentDidMount() {
    (function () {
      var qs,
        js,
        q,
        s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = "typef_orm",
        b = "https://embed.typeform.com/";
      if (!gi.call(d, id)) {
        js = ce.call(d, "script");
        js.id = id;
        js.src = b + "embed.js";
        q = gt.call(d, "script")[0];
        q.parentNode.insertBefore(js, q);
      }
    })();
  }

  render() {
    return (
      <div>
        <Head>
          <title>About</title>
        </Head>
        <div className="mn_p">
          <div className="abt_p plc_ies_p">
            <div className="plc_p">
              <div
                className="typeform-widget"
                data-url="https://form.typeform.com/to/pjVoAspM?typeform-medium=embed-snippet"
                style={{width: "100%", height: "500px"}}
              ></div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default BrandQueries;
