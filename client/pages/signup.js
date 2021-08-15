import React, { PureComponent } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./common/footer";
import Router from "next/router";
import Loader from "react-loader-spinner";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      loggedin: false,
      message: "",
      loading: false,
    };
  }

  componentDidMount() {}

  loginClick() {
    fetch(`${process.env.PATH_URL}/add-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        temp_token: "null",
      }),
    }).then((data1) => {
      data1.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({
            loader: true,
          });
          localStorage.setItem("user_info", JSON.stringify(resp));
          localStorage.setItem("user_name", JSON.stringify(resp.data.name));
          localStorage.setItem("user_id", JSON.stringify(resp.data._id));
          setTimeout(() => Router.push("/profile"), 2000);
        } else {
          this.setState({
            loader: false,
            message: "Try with other details.",
          });
        }
      });
    });
  }

  writeName(){
    if(this.state.user_name){
      var name = this.state.user_name;
      var d_name = name.replace('"', ' ')
      var f_name = d_name.replace('"', ' ')
      return f_name
    }
  }

  email(e) {
    this.setState({ email: e.target.value });
    console.log(e.target.value);
  }

  phone(e) {
    this.setState({ phone: e.target.value });
    console.log(e.target.value);
  }

  name(e) {
    this.setState({ name: e.target.value });
    console.log(e.target.value);
  }

  password(e) {
    this.setState({ password: e.target.value });
    console.log(e.target.value);
  }

  render() {
    console.log("myProps", this.props);
    if (this.props.loggedin === true) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }

    return (
      <>
        <Head>
          <title>Sign UP</title>
        </Head>

        {/* ******************************************************************************** */}
        <div className="form-signin">
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>
          <h1 className="h3 mb-3 font-weight-normal textCenter_">
            Create An Account
          </h1>

          <label htmlFor="first_name" className="sr-only">
            Full Name
          </label>
          <input
            type="text"
            // id="first_name"
            className="form-control"
            placeholder="Full Name"
            required=""
            autoFocus=""
            autoComplete="off"
            // onChange={(e) => this.setState({ name: e.target.value })}
            onChange={(event) => this.setState({ name: event.target.value })}
          />

          <label htmlFor="email" className="sr-only mt-5">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control mt-10"
            placeholder="Email"
            required=""
            onChange={(event) => this.setState({ email: event.target.value })}
          />

          <label htmlFor="phone" className="sr-only mt-5">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            className="form-control mt-10"
            placeholder="Phone Number"
            required=""
            onChange={(event) => this.setState({ phone: event.target.value })}
          />

          <label htmlFor="password" className="sr-only mt-5">
            password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mt-10"
            placeholder="New Password"
            required=""
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />

          {this.state.message ? (
            <p className="error_log">{this.state.message}</p>
          ) : null}

          {!this.state.loader ? (
            <button
              className="btn btn-lg btn-primary btn-block"
              type="submit"
              onClick={() => {
                this.loginClick(this.state);
              }}
            >
              Create an Account
            </button>
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

          <div className="signup_link">
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
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
