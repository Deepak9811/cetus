import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./common/footer";
import Router from "next/router";

export class URecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      token: "",
      message: false,
    };
  }

  static async getInitialProps({ query }) {
    return { credentials: query };
  }

  componentDidMount() {
    var credentials = this.props.credentials;

    this.setState({
      email: credentials.email,
      token: credentials.token,
    });
  }

  formValidation(e) {
    e.preventDefault();

    if (this.state.password === "" || this.state.confirm_password === "") {
      this.setState({ message: "Please enter something" });
    } else {
      if (this.state.password === this.state.confirm_password) {
        if (this.state.password.length < 6) {
          this.setState({ message: "Password should be more than 6" });
        } else {
          this.serverCheck();
        }
      } else {
        this.setState({ message: "Your password is not same" });
      }
    }
  }

  serverCheck() {
    fetch(
      `${process.env.PATH_URL}/users-info-by-email?email=${this.state.email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    ).then((data) => {
      data.json().then((resp) => {
        if (resp.data[0]) {
          if (this.state.token == resp.data[0].temp_token) {
            this.updatePassword(resp.data[0]);
          }
        } else {
          alert("Something wents wrong");
        }
      });
    });
  }

  updatePassword(user_data) {
    var email = this.state.email;
    var token = this.state.token;
    fetch(`${process.env.PATH_URL}/update-password?email=${email}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ password: this.state.password }),
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.data !== "") {
          this.clearToken(user_data);
        } else {
          this.setState({
            message: "Something went wrong",
          });
        }
      });
    });
  }

  clearToken(user_data) {
    fetch(`${process.env.PATH_URL}/temp-generator?email=${this.state.email}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ temp_token: null }),
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.data !== "") {
          this.login(user_data);
        } else {
          this.setState({
            message: "Your Password has been updated.",
          });
        }
      });
    });
  }

  login(user_data) {
    fetch(`${process.env.PATH_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email : user_data.email,
          password : user_data.password,
          phone : user_data.phone
      }),
    }).then((result) => {
      result.json().then(async (resp) => {
        if (resp.response === "ok") {
          if (resp.response === "ok") {
            localStorage.setItem("user_info", JSON.stringify(resp));
            setTimeout(() => Router.push("/profile"), 2000);
          } else {
            this.setState({ message: "Try with other details." });
          }
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Recover Password</title>
        </Head>


        <div className="form-signin md-8">
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>

          <h1 className="h3 mb-3 font-weight-normal textCenter_">
            Recover Password
          </h1>

          <form onSubmit={(e) => this.formValidation(e)}>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required=""
              autoFocus=""
              autoComplete="off"
              onChange={(event) =>
                this.setState({ password: event.target.value, message: false })
              }
            />

            <label htmlFor="confirm_password" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirm Password"
              required=""
              autoFocus=""
              autoComplete="off"
              onChange={(event) =>
                this.setState({
                  confirm_password: event.target.value,
                  message: false,
                })
              }
            />
            {this.state.message ? <p>{this.state.message}</p> : null}
            <input
              type="submit"
              className="btn btn-lg btn-primary btn-block mt-10"
              type="submit"
              value="Sumit"
            />
          </form>

          {this.state.password}
          <br />
          {this.state.confirm_password}
        </div>

        <Footer />
      </div>
    );
  }
}

export default URecovery;
