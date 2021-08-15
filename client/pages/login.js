import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import Footer from "./common/footer";
import Loader from "react-loader-spinner";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      temp_token: "null",
      email: "",
      pass: "",
      phone: "",
      loggedin: false,
      loading: false,
    };
  }

  componentDidMount() {
    // console.log('router',Router.router.query.view)
    if (Router.router) {
      if (Router.router.query) {
        if (Router.router.query.view) {
          this.setState({ query: Router.router.query.view });
        }
      }
    }
  }

  responseFacebook = (response) => {
    // console.log(response.email,response.name,response.id);
    if (response) {
      if (response) {
        this.checkAuthority(response.email, response.name);
      }
    }
  };

  responseGoogle = (response, Qs) => {
    // console.log("Email",response.profileObj.email,"Name",response.profileObj.name,"response",response);
    if (response) {
      if (response.profileObj.email && response.profileObj.name) {
        var email = response.profileObj.email;
        var name = response.profileObj.name;
        this.checkAuthority(email, name);
      }
    }
  };

  checkAuthority(email, name) {
    fetch(`${process.env.PATH_URL}/check-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((result) => {
        result.json().then(async (resp) => {
          // console.log("singh","email",email,"resp",resp);
          if (resp.response == "ok") {
            this.loginWithServer(resp);
          } else {
            this.addNewUser(email, name);
          }
        });
      })

      //CATCHING ERROR FROM FETCH (IF ANY) IN API
      .catch((error) => {
        this.setState({
          message: "Please check your credentials.",
          loading: false,
        });
      });
  }

  addNewUser(email, name) {
    fetch(`${process.env.PATH_URL}/add-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        temp_token: "null",
      }),
    }).then((data1) => {
      data1.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({
            loader: true,
          });
          this.loginWithServer(resp);

          localStorage.setItem("user_info", JSON.stringify(resp));
          localStorage.setItem("user_name", JSON.stringify(resp.data.name));
          localStorage.setItem("user_id", JSON.stringify(resp.data._id));
        } else {
          this.setState({
            loader: false,
            message: "Try with other details.",
          });
        }
      });
    });
  }

  loginWithServer(resp) {
    localStorage.setItem("user_info", JSON.stringify(resp));
    localStorage.setItem("user_name", JSON.stringify(resp.data.name));
    localStorage.setItem("user_id", JSON.stringify(resp.data._id));

    if (this.state.query) {
      setTimeout(() => Router.push(`/view?userId=${this.state.query}`), 2000);
    } else {
      window.location.href = "/";
      // setTimeout(() => window.location.href="/", 2000);
    }
  }

  loginCheck = () => {
    if (
      this.state.email === "" ||
      this.state.pass === "" ||
      this.state.phone === ""
    ) {
      this.setState({ message: "Please enter your account details to login." });
    } else if (
      this.state.email !== "" &&
      this.state.pass !== "" &&
      this.state.phone !== ""
    ) {
      this.setState({ loading: true });

      fetch(`${process.env.PATH_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((result) => {
          result.json().then(async (resp) => {
            if (resp.response === "ok") {
              if (resp.response === "ok") {
                localStorage.setItem("user_info", JSON.stringify(resp));
                localStorage.setItem(
                  "user_name",
                  JSON.stringify(resp.data.name)
                );
                localStorage.setItem("user_id", JSON.stringify(resp.data._id));

                if (this.state.query) {
                  Router.push(`/view?userId=${this.state.query}`);
                } else {
                  setTimeout(() => (window.location.href = "/"), 2000);
                }
              } else {
                this.setState({ message: "Try with other details." });
              }
            }
          });
        })

        //CATCHING ERROR FROM FETCH (IF ANY) IN API
        .catch((error) => {
          this.setState({
            message: "Please check your credentials.",
            loading: false,
          });
        });
    }
  };

  requestOTP(resp) {
    // console.log("request otp", resp._id);
    let formdata = new FormData();
    formdata.append("uid", resp._id);
    formdata.append("resend", 1);

    fetch(`${process.env.PATH_URL}/login`, {
      method: "POST",
      headers: {
        Authorization: 1,
      },
      body: formdata,
    })
      .then((result) => {
        result.json().then((resp) => {
          // console.log("otp", resp);
        });
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }

  email(e) {
    this.setState({ email: e.target.value });
    // console.log(e.target.value);
  }

  pass(e) {
    this.setState({ pass: e.target.value });
    // console.log(e.target.value);
  }

  render() {
    return (
      <>
        <Head>
          <title>Log In</title>
        </Head>

        <div className="form-signin">
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>
          <h1 className="h3 mb-3 font-weight-normal textCenter_">
            Please Login
          </h1>

          {/* <FacebookLogin
            appId="414487126284121"
            autoLoad={false}
            fields="name,email,picture"
            onClick={console.log("clicked")}
            callback={this.responseFacebook()}
            cssclassName="ui_facebook"
          /> */}

          <FacebookLogin
            appId="414487126284121"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssclassName="ui_facebook"
          />

          <GoogleLogin
            clientId="593357905280-qctobvigd8vlrg9t63cp9gr2ppfpu6kk.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="ui_google"
          />

          <form
            type="submit"
            onSubmit={(e) => {
              this.loginCheck();
            }}
          >
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email"
              required=""
              autoFocus=""
              autoComplete=""
              onChange={(event) =>
                this.setState({
                  email: event.target.value,
                  phone: event.target.value,
                })
              }
            />
            <label htmlFor="inputPassword" className="sr-only mt-5">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control mt-10"
              placeholder="Password"
              required=""
              onChange={(event) => this.setState({ pass: event.target.value })}
            />
            <Link href="/forgot-password">
              <a>
                <p>
                  <h6 className="frt_ps">Forgot Password?</h6>
                </p>
              </a>
            </Link>
            {this.state.message ? (
              <p className="type_error">{this.state.message}</p>
            ) : null}
            {!this.state.loading ? (
              <input
                className="btn btn-lg btn-primary btn-block mg-0-at"
                type="submit"
                name="Login"
              />
            ) : (
              <div className="loader_in_option2">
                <Loader type="Oval" color="#00BFFF" height={30} width={50} />
              </div>
            )}
          </form>
          <div className="signup_link">
            Don't have an account?{" "}
            <Link href="/signup">
              <a>Sign up.</a>
            </Link>
          </div>
          <p className="mb-3 text-muted textCenter_">© 2021</p>
        </div>

        <Footer />
      </>
    );
  }
}

export default Login;
