import React, { PureComponent } from "react";
import Link from "next/link";
import Head from "next/head";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pass: "",
      loggedin: false,
    };
  }

  static async getInitialProps({ query }) {
    return { uid: query.uid };
  }

  loginCheck = () => {
    if (this.state.email === "" || this.state.pass === "") {
      this.setState({ message: "Please enter your account details to login." });
    } else if (this.state.email !== "" && this.state.pass !== "") {
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
              console.log(JSON.stringify({ value: 1, resp: resp }));
              fetch(`${process.env.PATH_URL}/user?uid=` + resp.user_id, {
                method: "POST",
                headers: {
                  Authorization: 1,
                  "Content-Type": "application/json",
                },
              })
                .then((result2) => {
                  result2.json().then(async (resp2) => {
                    if (resp2[0].response == "error") {
                      this.setState({ error: true, loading: false });
                    }

                    // IF RESPONSE IS OK
                    else {
                      this.setState({ loading: false });

                      // IF STATUS IS 0
                      if (resp2[0].status == 0) {
                        this.requestOTP(resp);
                        console.log(
                          "navigated to otp page & function send otp"
                        );
                      } else {
                        console.log("logged in success");
                      }
                    }
                  });
                })
                .catch((error) => {
                  console.log("Error:", error);
                });

              //[/FETCHING USER INFORMATION.]
            }

            //IF FETCH RESOPONSE IS ERROR
            else if (resp.response === "error") {
              this.setState({
                message: "Please check your credentials.",
                loading: false,
              });
            }
          });
        })

        //CATCHING ERROR FROM FETCH (IF ANY) IN API
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  requestOTP(resp) {
    console.log("request otp", resp.user_id);
    let formdata = new FormData();
    formdata.append("uid", resp.user_id);
    formdata.append("resend", 1);

    fetch(`https://api.aliensnake.com/verify_otp`, {
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

  email(e) {
    this.setState({ email: e.target.value });
    console.log(e.target.value);
  }

  pass(e) {
    this.setState({ pass: e.target.value });
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="form-signin">
        <Head>
          <title>Verify</title>
        </Head>
        <span className="logoText textCenter_ logo_styl">
          <Link href="/">
            <a
              className="logo szg"
              //  style={{ color: "#56288b" }}
            >
              <img src="./image/clbze_logo.png" />
            </a>
          </Link>
        </span>
        <h1 className="h3 mb-10 font-weight-normal textCenter_">Verify OTP</h1>
        <label htmlFor="inputEmail" className="sr-only">
          OTP
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Enter OTP"
          required=""
          autoFocus=""
          autoComplete="off"
          onChange={(event) => this.setState({ email: event.target.value })}
        />

        {!this.state.loading ? (
          <button
            className="btn btn-lg btn-primary btn-block mt-10"
            type="submit"
            onClick={() => {
              this.loginCheck();
            }}
          >
            Verify
          </button>
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

        <div className="signup_link">
          Don't get OTP?{" "}
          <Link href="/signup">
            <a>Resend</a>
          </Link>
        </div>
        {console.log("prop", this.props.uid)}

        <p className="mb-3 text-muted textCenter_">© 2021</p>
      </div>
    );
  }
}

export default Login;
