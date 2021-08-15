import React, { PureComponent } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./common/footer";

class Contact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      description: "",
      loggedin: false,
    };
  }

  name(e) {
    this.setState({
      name: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  phone(e) {
    this.setState({
      phone: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  email(e) {
    this.setState({
      email: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  description(e) {
    this.setState({
      description: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  check(e) {
    e.preventDefault();

    if (
      this.state.name !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.description !== ""
    ) {
      this.sumbit();
      this.setState({ loader: true });
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    const { name, email, phone, description } = this.state;

    fetch(`${process.env.PATH_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mail_to: "info@celebze.com",
        // mail_to: "virajmalhotraa@gmail.com",
        name: name,
        form_type: 4,
        email: email,
        phone: phone,
        description: description,
        subject: "1 New Enquery [FORM 3].",
        site: "Celebze",
      }),
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({
            err_message: false,
          });
          alert("Your request of contact has been submitted.");
          window.location.reload();
        } else {
          alert("Something went wrong.");
        }
      });
    });
  }

  render() {
    // console.log("myProps", this.props);
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
      <div className="hgt_c">
        <Head>
          <title>Contact</title>
        </Head>

        <form onSubmit={(e) => this.check(e)}>
          <div className="bdy dks">
            <span className="logoText textCenter_ logo_styl dk_d_n dk_d_n">
              <Link href="/">
                <a className="logo szg">
                  <img src="./image/clbze_logo.png" />
                </a>
              </Link>
            </span>
            <h1 className="h3 mb-3 font-weight-normal textCenter_">Contact Us</h1>

            <label htmlFor="first_name" className="sr-only">
              Full Name
            </label>
            <input
              type="text"
              id="first_name"
              className="form-control"
              placeholder="Full Name"
              required=""
              autoFocus=""
              autoComplete="off"
              onChange={(e) => this.name(e)}
              // value={this.state.name}
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
              onChange={(e) => this.email(e)}
            />

            <label htmlFor="number" className="sr-only mt-5">
              Mobile Number
            </label>
            <input
              type="number"
              id="number"
              className="form-control mt-10"
              placeholder=" Mobile Number"
              required=""
              onChange={(e) => this.phone(e)}
            />
            <div className="dte_b mt-2 mgtn_b">
              <p className="dte mt-2">Your Description</p>
              <textarea
                onChange={(e) => this.description(e)}
                className="form-control"
              ></textarea>
            </div>

            {this.state.err_message ? (
              <p className="err_message mt-2">{this.state.err_message}</p>
            ) : null}

            {this.state.success_message ? (
              <p className="success_message mt-2">
                {this.state.success_message}
              </p>
            ) : null}

            <input
              type="submit"
              className="mt-3 btn btn-lg btn-primary btn-block mg_l-10 fl"
              value="Send"
            />

            {/* <p className="mb-3 text-muted textCenter_ dk_d_n">
              Contact us
              <br />
              celebze.official@gmail.com
              <br />
              +91 88607 46702
              <br />
            </p> */}
          </div>
        </form>

        <div className="lg_cnt wnd_im">
          <img src="/image/celebze-big_1.png" />
        </div>

        {/* <div className="dk_s dk_d_b">
          <span className="logoText textCenter_ logo_styl mb-10 dk_mg">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>

          <p className="mb-3 text-muted textCenter_">
            Contact us
            <br />
            celebze.official@gmail.com
            <br />
            +91 88607 46702
            <br />
          </p>
        </div> */}

        <Footer />
      </div>
    );
  }
}

export default Contact;
