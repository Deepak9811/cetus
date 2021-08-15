import React, { PureComponent } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Router from "next/router";

class profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
    };
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

  componentDidMount() {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    console.log(user_info);
    if (user_info) {
      this.setState({
        user: true,
        name: user_info.data.name,
        email: user_info.data.email,
        dob: user_info.data.dob,
        gender: user_info.data.gender,
        phone: user_info.data.phone,
      });
    } else {
      Router.push("/login");
      this.setState({ user: false });
    }
  }

  updateClick(value) {
    console.log(this.state.name);
    const user_id = localStorage.getItem("user_id");
    const user_info = localStorage.getItem("user_info");
    var update_value;
    if (value == "name") {
      var update_value = JSON.stringify({ name: this.state.name });
    } else if (value == "email") {
      var update_value = JSON.stringify({ email: this.state.email });
    } else if (value == "phone") {
      var update_value = JSON.stringify({ phone: this.state.phone });
    } else if (value == "password") {
      var update_value = JSON.stringify({ password: this.state.password });
    }

    fetch(`${process.env.PATH_URL}/update-userData?_id=${user_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: update_value,
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.data !== "") {
          localStorage.setItem("user_info", JSON.stringify(resp));
          localStorage.setItem("user_name", JSON.stringify(resp.data.name));
          localStorage.setItem("user_id", JSON.stringify(resp.data._id));
          alert("Updated successfully");
        } else {
          alert("Something went wrong.");
        }
      });
    });
  }

  render() {
    console.log("username", this.props);
    var { name, phone, email } = this.state;
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>

        {this.state.user ? (
          <>
            <div className="container-fluid mg_tp">
              <div className="row">
                <nav
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  id="sidebarMenu"
                  className="hide_on_ pd_l  d-md-block bg-light sidebar  show col-md-3 col-lg-2"
                >
                  <div className="sidebar-sticky pt-3 sidenav">
                    <ul className="nav flex-column ">
                      <li className="nav-item">
                        <Link href="#">
                          <a className="collapsible nav-link active collapsible">
                            <svg
                              className="feather feather-home menufas"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="users"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                              ></path>
                            </svg>
                            Profile <span className="sr-only">(current)</span>
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/history">
                          <a className="nav-link">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-file"
                            >
                              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                              <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                            History
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>

                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
                >
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Profile</h1>
                  </div>

                  {/* ******************************************************************* */}

                  <div className="mg_f wJpH8c">
                    <article className="GIxHAe">
                      <div className="XLK0Od">
                        <div className="ahh38c">
                          <div className="ugt2L aK2X8b t97Ap iDdZmf">
                            <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                              <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                                <div className="VJbqBb" role="text">
                                  <div className="row mx-0 w-100">
                                    <div className="col-4">Name</div>
                                    <div className="col-4">{name}</div>
                                    <div className="col-4">
                                      <span
                                        onClick={() =>
                                          this.setState({
                                            active_password: false,
                                            active_phone: false,
                                            active_email: false,
                                            active_name: this.state.active_name
                                              ? false
                                              : true,
                                          })
                                        }
                                        className="float-right chevron-custom"
                                      >
                                        {/* Down */}
                                        {this.state.active_name ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z"
                                              className=""
                                            ></path>
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
                                              className=""
                                            ></path>
                                          </svg>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {this.state.active_name ? (
                                  <div className="bx_nm">
                                    <div className="chng_n_m">
                                      <p className="chng_n">
                                        Change your name please
                                      </p>
                                      <label
                                        htmlFor="inputEmail"
                                        className="sr-only"
                                      >
                                        Full Name
                                      </label>
                                      <input
                                        value={this.state.name}
                                        onChange={(event) =>
                                          this.setState({
                                            name: event.target.value,
                                          })
                                        }
                                        style={{
                                          width: "20%",
                                          marginRight: "10px",
                                          display: "unset",
                                          minWidth:"246px",
                                        }}
                                        type="name"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Full Name"
                                        required=""
                                        autoFocus=""
                                        autoComplete="off"
                                      />

                                      <div>
                                        <button
                                          onClick={() => {
                                            this.updateClick("name");
                                          }}
                                          className="btn btn-lg btn-primary  bn"
                                          type="submit"
                                          style={{minWidth:"110px"}}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </span>
                            </div>
                          </div>

                          {/* <div className="ugt2L aK2X8b t97Ap iDdZmf">
                        <div className="cv2gi" role="presentation">
                          <div className="Q5jTGb"></div>
                        </div> */}

                          {/* <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                          <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                            <div className="VJbqBb" role="text">
                              <div className="row mx-0 w-100">
                                <div className="col-4">BIRTHDAY</div>
                                <div className="col-4">{dob}</div>
                                <div className="col-4">
                                  <span className="float-right"></span>
                                </div>
                              </div>
                            </div> */}

                          {/* <div className="bx_nm">
                              <div className="chng_n_m">
                                <p className="chng_n">Change your Birthday</p>
                                <label htmlFor="inputEmail" className="sr-only">
                                  birthday
                                </label>
                                <input
                                  style={{
                                    width: "20%",
                                    marginRight: "10px",
                                    display: "unset",
                                  }}
                                  type="date"
                                  id="inputEmail"
                                  className="form-control"
                                  placeholder="birthday"
                                  required=""
                                  autoFocus=""
                                  autoComplete="off"
                                />

                                <div>
                                  <button
                                    style={{
                                      width: "20%",
                                      marginTop: "10px",
                                    }}
                                    className="bn btn btn-lg btn-primary "
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          {/* </span> */}
                          {/* </div> */}
                          {/* </div> */}

                          {/* <div className="ugt2L aK2X8b t97Ap iDdZmf">
                        <div className="cv2gi" role="presentation">
                          <div className="Q5jTGb"></div>
                        </div>

                        <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                          <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                            <div className="VJbqBb" role="text">
                              <div className="row mx-0 w-100">
                                <div className="col-4">GENDER</div>
                                <div className="col-4">{gender}</div>
                                <div className="col-4">
                                  <span className="float-right"></span>
                                </div>
                              </div>
                            </div> */}

                          {/* <div className="bx_nm">
                              <div className="chng_n_m">
                                <p className="chng_n">Change your Gender</p>

                                <select
                                  aria-label="Gender"
                                  name="Gender"
                                  title="gender"
                                  className="form-control mt-3 arrow "
                                  style={{
                                    width: "20%",
                                    height: "40px",
                                    paddingTop: "0",
                                    paddingBottom: "0",
                                  }}
                                >
                                  <option value="" hidden>
                                    Gender
                                  </option>

                                  <option value="1">Male</option>

                                  <option value="2">Female</option>
                                  <option value="3">Other</option>
                                </select>

                                <div>
                                  <button
                                    style={{
                                      width: "20%",
                                      marginTop: "10px",
                                    }}
                                    className="bn btn btn-lg btn-primary"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div> */}
                          {/* </span>
                        </div>
                      </div> */}

                          <div className="ugt2L aK2X8b t97Ap iDdZmf">
                            <div className="cv2gi" role="presentation">
                              <div className="Q5jTGb"></div>
                            </div>

                            <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                              <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                                <div className="VJbqBb" role="text">
                                  <div className="row mx-0 w-100">
                                    <div className="col-4">PASSWORD</div>
                                    <div className="col-4">************</div>
                                    <div className="col-4">
                                      <span
                                        onClick={() =>
                                          this.setState({
                                            active_name: false,
                                            active_email: false,
                                            active_phone: false,
                                            active_password: this.state
                                              .active_password
                                              ? false
                                              : true,
                                          })
                                        }
                                        className="float-right"
                                      >
                                        {/* Down */}
                                        {this.state.active_password ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z"
                                              className=""
                                            ></path>
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
                                              className=""
                                            ></path>
                                          </svg>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {this.state.active_password ? (
                                  <div className="bx_nm">
                                    <div className="chng_n_m">
                                      <p className="chng_n">
                                        Change your Password
                                      </p>
                                      <label
                                        htmlFor="inputEmail"
                                        className="sr-only"
                                      >
                                        Password
                                      </label>
                                      <input
                                        style={{
                                          width: "20%",
                                          marginRight: "10px",
                                          display: "unset",
                                          minWidth:"246px"
                                        }}
                                        type="Password"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Password"
                                        required=""
                                        autoFocus=""
                                        autoComplete="off"
                                      />
                                      <label
                                        htmlFor="inputEmail"
                                        className="sr-only"
                                      >
                                        Comfirm Password
                                      </label>
                                      <input
                                        value={this.state.email}
                                        onChange={(event) =>
                                          this.setState({
                                            email: event.target.value,
                                          })
                                        }
                                        style={{
                                          width: "20%",
                                          marginRight: "10px",
                                          display: "unset",
                                          minWidth:"246px"
                                        }}
                                        type="Password"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder=" Comfirm Password"
                                        required=""
                                        autoFocus=""
                                        autoComplete="off"
                                      />

                                      <div>
                                        <button
                                          style={{
                                            width: "20%",
                                            marginTop: "10px",
                                            minWidth:"110px"
                                          }}
                                          onClick={() => {
                                            this.updateClick("email");
                                          }}
                                          className="bn btn btn-lg btn-primary "
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </span>
                            </div>
                          </div>

                          <div className="ugt2L aK2X8b t97Ap iDdZmf">
                            <div className="cv2gi" role="presentation">
                              <div className="Q5jTGb"></div>
                            </div>

                            <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                              <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                                <div className="VJbqBb" role="text">
                                  <div className="row mx-0 w-100">
                                    <div className="col-4">PHONE</div>
                                    <div className="col-4">{phone}</div>
                                    <div className="col-4">
                                      <span
                                        onClick={() =>
                                          this.setState({
                                            active_name: false,
                                            active_email: false,
                                            active_password: false,
                                            active_phone: this.state
                                              .active_phone
                                              ? false
                                              : true,
                                          })
                                        }
                                        className="float-right"
                                      >
                                        {/* Down */}
                                        {this.state.active_phone ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z"
                                              className=""
                                            ></path>
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
                                              className=""
                                            ></path>
                                          </svg>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {this.state.active_phone ? (
                                  <div className="bx_nm">
                                    <div className="chng_n_m">
                                      <p className="chng_n">
                                        Change your Phone
                                      </p>
                                      <label
                                        htmlFor="inputEmail"
                                        className="sr-only"
                                      >
                                        Phone
                                      </label>
                                      <input
                                        value={this.state.phone}
                                        onChange={(event) =>
                                          this.setState({
                                            phone: event.target.value,
                                          })
                                        }
                                        style={{
                                          width: "30%",
                                          marginRight: "10px",
                                          display: "unset",
                                          minWidth:"246px"
                                        }}
                                        type="number"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Phone"
                                        required=""
                                        autoFocus=""
                                        autoComplete="off"
                                      />

                                      <div>
                                        <button
                                          onClick={() => {
                                            this.updateClick("phone");
                                          }}
                                          style={{
                                            width: "20%",
                                            marginTop: "10px",
                                            minWidth:"110px"
                                          }}
                                          className="bn btn btn-lg btn-primary btn-block"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </span>
                            </div>
                          </div>

                          <div className="ugt2L aK2X8b t97Ap iDdZmf">
                            <div className="cv2gi" role="presentation">
                              <div className="Q5jTGb"></div>
                            </div>

                            <div className="VfPpkd-ksKsZd-XxIAqe CmhoVd">
                              <span className="VZLjze Wvetm I6g62c N5YmOc kJXJmd">
                                <div className="VJbqBb" role="text">
                                  <div className="row mx-0 w-100">
                                    <div className="col-4">Email</div>
                                    <div className="col-4">{email}</div>
                                    <div className="col-4">
                                      <span
                                        onClick={() =>
                                          this.setState({
                                            active_name: false,
                                            active_phone: false,
                                            active_password: false,
                                            active_email: this.state
                                              .active_email
                                              ? false
                                              : true,
                                          })
                                        }
                                        className="float-right"
                                      >
                                        {/* Down */}
                                        {this.state.active_email ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M4.465 366.475l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L224 178.053l195.494 195.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.051c-4.686-4.686-12.284-4.686-16.971 0L4.465 349.505c-4.687 4.686-4.687 12.284 0 16.97z"
                                              className=""
                                            ></path>
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            style={{ width: "12px" }}
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
                                              className=""
                                            ></path>
                                          </svg>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {this.state.active_email ? (
                                  <div className="bx_nm">
                                    <div className="chng_n_m">
                                      <p className="chng_n">
                                        Change your email
                                      </p>
                                      <label
                                        htmlFor="inputEmail"
                                        className="sr-only"
                                      >
                                        email
                                      </label>
                                      <input
                                        value={this.state.email}
                                        onChange={(event) =>
                                          this.setState({
                                            email: event.target.value,
                                          })
                                        }
                                        style={{
                                          width: "30%",
                                          marginRight: "10px",
                                          display: "unset",
                                          minWidth:"246px"
                                        }}
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="email"
                                        required=""
                                        autoFocus=""
                                        autoComplete="off"
                                      />

                                      <div>
                                        <button
                                          onClick={() => {
                                            this.updateClick("email");
                                          }}
                                          style={{
                                            width: "20%",
                                            marginTop: "10px",
                                            minWidth:"110px"
                                          }}
                                          className="bn btn btn-lg btn-primary btn-block"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/* *************************************** */}
                </main>
              </div>
            </div>
          </>
        ) : (
          <div className="user_login_notice">
            <p>
              Please{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>{" "}
              to continue
            </p>
          </div>
        )}

        <Footer />
      </>
    );
  }
}

export default profile;
