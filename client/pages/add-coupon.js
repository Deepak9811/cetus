import React, { PureComponent } from "react";
import Link from "next/link";
// import axios from "axios";
import Header from "./common/header";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

class AddCeleb extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      coupon_name: "",
      coupon_code: "",
      coupon_type: "",
      coupon_amount: "",
      used_time: "",
    };
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.coupon_name !== "" &&
      this.state.coupon_code !== "" &&
      this.state.used_time !== "" &&
      this.state.coupon_type !== "" &&
      this.state.coupon_amount !== ""
    ) {

      if(this.state.coupon_type == "Percentage"){

        if(Number(this.state.coupon_amount) < 100){
        this.setState({ loader: true });
        this.addcoupon();
        }

        else{
          alert("Coupon should be less then 100")
        }
      }

      else{
        this.setState({ loader: true });
        this.addcoupon();
      }
      
    } else {
      this.setState({ err_message: "Please fill the fields." });
    }
  }

  addcoupon(e) {
    fetch(`${process.env.PATH_URL}/coupon`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        coupon_name: this.state.coupon_name,
        coupon_code: this.state.coupon_code,
        used_time: this.state.used_time,
        coupon_type: this.state.coupon_type,
        coupon_amount: this.state.coupon_amount,
      }),
    }).then((data) => {
      data.json().then((resp) => {
        console.log("Add Coupon", resp);
        if (resp.response == "ok") {
          this.setState({ success_message: "Coupon Added" });

          this.setState({ loader: false });
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Add Coupon</title>
        </Head>

        <div className="mg_tp hgt_c">
            <Sidemenu />

        <div className="container-fluid ">
            

            <main role="main"  className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c">
              <form
                className="form-signin celeb_ad"
                onSubmit={(e) => {
                  this.check(e);
                }}
                encType="multipart/form-data"
              >
                <span className="logoText textCenter_ logo_styl">
                  <Link href="#">
                    <a className="logo szg">
                      <img src="./image/clbze_logo.png" />
                    </a>
                  </Link>
                </span>
                <h1 className="h3 mb-3 font-weight-normal textCenter_">
                  Please Enter Details
                </h1>

                <label htmlFor="Coupon" className="sr-only">
                  Coupon Name
                </label>
                <input
                  type="text"
                  value={this.state.coupon_name}
                  onChange={(e) =>
                    this.setState({ coupon_name: e.target.value })
                  }
                  id="Coupon"
                  className="form-control mt-3"
                  placeholder="Coupon Name"
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />

                <label htmlFor="Coupon Code" className="sr-only">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={this.state.coupon_code}
                  onChange={(e) =>
                    this.setState({ coupon_code: e.target.value })
                  }
                  id="Coupon Code"
                  className="form-control mt-3"
                  placeholder="Coupon Code"
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />

                <div className="dte_b" style={{ position: "relative" }}>
                  <select
                    value={this.state.coupon_type}
                    aria-label="coupon_type"
                    name="coupon_type"
                    title="coupon_type"
                    className="form-control mt-3 arrow "
                    onChange={(e) => this.setState({ coupon_type: e.target.value })}
                  >
                    <option value="" hidden>
                      Coupon Type
                    </option>

                    <option value="Fix">Fix</option>

                    <option value="Percentage">Percentage</option>
                  </select>
                  <label className="down-arrow"></label>
                </div>

                <label htmlFor="Coupon Discount" className="sr-only">
                  Coupon Discount
                </label>
                <input
                  type="number"
                  value={this.state.coupon_amount}
                  onChange={(e) =>
                    this.setState({ coupon_amount: e.target.value })
                  }
                  id="CouponType"
                  className="form-control mt-3"
                  placeholder="Coupon Discount"
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />

                <label htmlFor="Coupon Discount" className="sr-only">
                  Coupon Used
                </label>
                <input
                  type="number"
                  value={this.state.used_time}
                  onChange={(e) => this.setState({ used_time: e.target.value })}
                  id="CouponType"
                  className="form-control mt-3"
                  placeholder="Coupon Used"
                  required=""
                  autoFocus=""
                  autoComplete="on"
                />

                {this.state.err_message ? (
                  <p className="err_message mt-2">{this.state.err_message}</p>
                ) : null}

                {this.state.success_message ? (
                  <p className="success_message mt-2">
                    {this.state.success_message}
                  </p>
                ) : null}

                {!this.state.loader ? (
                  <input
                    type="submit"
                    className="mt-3 btn btn-lg btn-primary btn-block mg-0-at mg_b-0 mgt-5"
                    value="Add Coupon"
                  />
                ) : (
                  <div className="loader_in_option2">
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={30}
                      width={50}
                    />
                  </div>
                )}

                <p className="mt-4 mb-3 text-muted textCenter_">© 2021</p>
              </form>

              {/* *************************************** */}
            </main>
          </div>
        </div>

        <Footer />
      </Protected>
    );
  }
}

export default AddCeleb;
