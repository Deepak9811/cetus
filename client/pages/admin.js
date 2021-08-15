import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import Header from "./common/header";
import Footer from "./common/footer";
import Loader from "react-loader-spinner";

class Admin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
      loggedin: false,
      loader: true,
    };
  }

  componentDidMount() {
    var currentRoute = Router.pathname;
    var adminStatus = localStorage.getItem("admin");
    var userStatus = localStorage.getItem("user");

    //Setting up admin status
    if (adminStatus) {
      Router.push("/courses");
    } else {
      this.setState({
        loader: false,
      });
    }
  }

  loginCheck = () => {
    if (this.state.email === "" || this.state.pass === "") {
      alert("Please enter something");
    } else if (this.state.email !== "" && this.state.pass !== "") {
      if (this.state.email == "svayam.admin" && this.state.pass == "svayam@admin123") {
        localStorage.setItem("admin", "true");
        Router.push("/courses");
      } else if (this.state.email == "khulja" && this.state.pass == "simsim") {
        localStorage.setItem("admin", "true");
        Router.push("/courses");
      } else {
        alert("Please enter correct ID or Password.");
      }
    }
  };

  requestOTP(resp) {
    console.log("request otp", resp._id);
    let formdata = new FormData();
    formdata.append("uid", resp._id);
    formdata.append("resend", 1);

    fetch(`${process.env.PATH_URL}/verify_otp`, {
      method: "POST",
      headers: {
        Authorization: 1,
      },
      body: formdata,
    })
      .then((result) => {
        result.json().then((resp) => {
          console.log("otp", resp);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <>
        <Head>
          <title>Admin Panel</title>
        </Head>

        <Header />

        {!this.state.loader ? (
          <div className="form-signin">

            <span className="logoText textCenter_ logo_styl">
              <Link href="/">
                <a className="logo szg">
                  <img src="./image/clbze_logo.png" />
                </a>
              </Link>
            </span>

            <h1 className="h3 mb-3 font-weight-normal textCenter_">Admin </h1>

            <form type="submit" onSubmit={(e)=>{this.loginCheck()}}>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              // type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Admin ID"
              
              required=""
              autoFocus=""
              autoComplete=""
              onChange={(event) => this.setState({ email: event.target.value })}
            />
            <label htmlFor="inputPassword" className="sr-only mt-5">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              name="password"
              className="form-control mt-10"
              placeholder="Password"
              required=""
              onChange={(event) => this.setState({ pass: event.target.value })}
            />

            {!this.state.loading ? (
              <input
                className="btn btn-lg btn-primary btn-block mg-0-at"
                type="submit"
                name="login"
              />
            ) : (
              <div className="showbox_">
                <div className="loader_">
                  <svg className="circular_" viewBox="25 25 50 50">
                    <circle
                      className="path_"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke-width="2"
                      stroke-miterlimit="10"
                    />
                  </svg>
                </div>
              </div>
            )}

            <p className="mb-3 text-muted textCenter_">© 2021</p>



            </form>
          </div>
        ) : (
          <div className="loader_in_option">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={30}
              width={50}
              // timeout={3000}
            />
          </div>
        )}

        <Footer />
      </>
    );
  }
}

export default Admin;
