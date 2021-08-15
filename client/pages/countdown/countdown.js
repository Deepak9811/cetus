import React, { Component } from "react";
import Link from "next/link";

export class countdown extends Component {
  componentDidMount() {
    var dest = new Date("31 Dec,2021 23:59:00").getTime();

    var x = setInterval(function () {
      var now = new Date().getTime();
      var diff = dest - now;

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));

      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      var Minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        days + "d: " + hours + "hrs: " + Minutes + "m: " + seconds + "s";
    }, 1000);
  }

  render() {
    return (
      <div>
        <div className="cntdwn">
          <span className="logoText textCenter_ logo_styl">
            <Link href="#">
              <a className="hm_dk">
                <img src="/image/clbze_logo.png" />
              </a>
            </Link>
          </span>
          <p id="countdown"></p>
          <h1>Coming New Year's 2021</h1>
        </div>
      </div>
    );
  }
}

export default countdown;
