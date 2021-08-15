import React, { PureComponent } from "react";
import Link from "next/link";
import Head from "next/head";

class Create_account extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      password: "",
      mobile: "",
      email: "",
      loggedin: false,
    };
  }

  name(e) {
    this.setState({ name: e.target.value });
    console.log(e.target.value);
  }

  surname(e) {
    this.setState({ surname: e.target.value });
    console.log(e.target.value);
  }

  mobile(e) {
    this.setState({ mobile: e.target.value });
    console.log(e.target.value);
  }

  email(e) {
    this.setState({ email: e.target.value });
    console.log(e.target.value);
  }

  password(e) {
    this.setState({ password: e.target.value });
    console.log(e.target.value);
  }

  select(e) {
    this.setState({ select: e.target.value });
    console.log(e.target.value);
  }

  gender(e) {
    this.setState({ gender: e.target.value });
    console.log(e.target.value);
  }

  register() {
    const name = this.state.name + " " + this.state.surname;
    console.log(name);
    fetch(`${process.env.PATH_URL}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sign_up_name: name,
        sign_up_mobile: this.state.mobile,
        sign_up_email: this.state.email,
        sign_up_pass: this.state.password,
      }),
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({ loggedin: true });

          // data storge ho jaye local storage mai.
          localStorage.setItem("token", resp.token, "user_id", resp.user_id);
          localStorage.setItem("user_id", resp.user_id);
        } else if (resp.response === "error") {
          console.log("Try with other details");
        }
      });
    });
  }

  render() {
    // if (this.state.loggedin === true) {
    //   return <Redirect to="/home" />;
    // }

    return (
      <div>
        <Head>
          <title>Create Account</title>
        </Head>
        <div className="clr_bck">
          <div className="crt_a_c">
            <div className="create_account_main_div">
              <div className="Sign_up">
                <div className="sign_up_div">
                  Sign up
                  <Link href="/login">
                    <a>
                      <button
                        aria-hidden="false"
                        aria-label="close"
                        className="cancle_back_cookie_page"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill="currentColor"
                            d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                          ></path>
                        </svg>
                      </button>
                    </a>
                  </Link>
                </div>

                <div className="Quick_and_easy">It's quick and easy.</div>
              </div>

              {/* =================Registration========================================= */}

              <div className="create_account_main_div">
                <div className="Sign_up">
                  <div className="create_account_main_div">
                    <div className="create_account_main_div">
                      <input
                        className="name_full"
                        type="First name"
                        placeholder="Full Name"
                        onChange={(e) => this.name(e)}
                      />
                      <input
                        className="name_full surname"
                        type="Surname"
                        placeholder="surname"
                        onChange={(e) => this.surname(e)}
                      />
                    </div>
                  </div>

                  {/* ====mobile===== */}

                  <div className="create_account_main_div">
                    <div className="mobile">
                      <input
                        className="name_full mobile_inpute"
                        type="mobile or email"
                        placeholder="Email Address"
                        onChange={(e) => this.mobile(e)}
                      />
                    </div>
                  </div>

                  <div className="create_account_main_div">
                    <div className="mobile">
                      <input
                        className="name_full mobile_inpute"
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => this.password(e)}
                      />
                    </div>
                  </div>

                  {/* ================================================================ */}

                  <div className="create_account_main_div">
                    <div className="date_of_birth">Gender</div>

                    <div className="for_date_selection">
                      <span datatype="selectors">
                        <span className="gender">
                          <label className="female">
                            Female
                            <input
                              className="inpute_gender_select"
                              type="radio"
                              name="sex"
                              value="1"
                              onChange={(e) => this.gender(e)}
                            />
                          </label>
                        </span>

                        <span className="gender">
                          <label className="female">
                            Male
                            <input
                              className="inpute_gender_select"
                              type="radio"
                              name="sex"
                              value="1"
                              onChange={(e) => this.gender(e)}
                            />
                          </label>
                        </span>

                        <span className="gender">
                          <label className="female">
                            Custom
                            <input
                              className="inpute_gender_select"
                              type="radio"
                              name="sex"
                              value="1"
                              onChange={(e) => this.gender(e)}
                            />
                          </label>
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* =============================== */}

                  <div className="create_account_main_div">
                    <p className="info_sign_up">
                      By clicking Sign Up, you agree to our
                      <a href="/">Terms</a>,<a href="/">Data Policy</a>and
                      <a href="/">Cookie Policy</a>. You may receive SMS
                      notifications from us and can OTP out at any time.
                    </p>
                  </div>

                  {/* ===================================== */}

                  <div className="create_account_main_div">
                    <button
                      className="sing_up_id"
                      type="submit"
                      name="websubmit"
                      onClick={() => this.register(this.state.data)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create_account;
