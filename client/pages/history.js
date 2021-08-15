import React, { Component } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Router from "next/router";
import Loader from "react-loader-spinner";

export class history extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [],
      err_message: false,
      loader: true,
      orderArray: [],
    };
  }

  componentDidMount() {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    if (user_info) {
      this.getOrdersList();
      this.setState({
        user: true,
        name: user_info.data.name,
        _id: user_info.data._id,
        dob: user_info.data.dob,
        gender: user_info.data.gender,
        phone: user_info.data.phone,
      });
    } else {
      Router.push("/login");
      this.setState({ user: false });
    }
  }

  getOrdersList() {
    // var userId = item._id;
    var user_info = JSON.parse(localStorage.getItem("user_info"));

    fetch(
      `${process.env.PATH_URL}/orders/all-orders?userId=${user_info.data._id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    ).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.response == "ok" && resp.data[0]) {
          this.setState({
            loader: false,
            orderArray: resp.data,
          });
        } else {
          this.setState({
            err_message: true,
            loader: false,
            orderArray: "no data",
          });
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>History</title>
        </Head>

        {this.state.user ? (
          <>
            <div className="container-fluid mg_tp">
              <div className="row">
                <nav
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  id="sidebarMenu"
                  className="hide_on_ col-md-3 col-lg-2 d-md-block bg-light sidebar pd_l show"
                >
                  <div className="sidebar-sticky pt-3 sidenav">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <Link href="profile">
                          <a className="nav-link">
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
                        <a className="nav-link active collapsible">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-file"
                          >
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                          </svg>
                          History
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>

                <main
                  role="main"
                  className="col-md-9 ml-sm-auto col-lg-10 px-md-4"
                >
                  <h2>Orders</h2>

                  {!this.state.loader ? (
                    this.state.orderArray == "no data" ? (
                      <p className="loader_in_option">No data found</p>
                    ) : (
                      <div
                        className="table-responsive"
                        style={{ margin: "10px" }}
                      >
                        <table className="table table-striped table-sm">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>User ID</th>
                              <th>Celebrity ID</th>
                              <th>Payment</th>
                              <th>Status</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.orderArray.map((item, i) => (
                              <tr>
                                <td>{item._id}</td>
                                <td>{item.userId}</td>
                                <td>{item.celebrityId}</td>
                                <td>{item.payment}</td>
                                <td>
                                  {item.status == 1
                                    ? "Completed"
                                    : item.status == 2
                                    ? "Pending"
                                    : item.status == 3
                                    ? "Canceled"
                                    : null}
                                </td>
                                <td>{item.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
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
      </div>
    );
  }
}

export default history;
