import React, { Component } from "react";
import Link from "next/link";
import Header from "./common/header";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";

import Sidemenu from "./common/sidemenu";

export class history extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [],
      err_message: false,
      loader: true,
      orderMenu: false,
    };
  }

  componentDidMount() {
    this.getOrdersList();
  }

  getOrdersList() {
    fetch(`${process.env.PATH_URL}/orders/orders-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          if (resp.data[0]) {
            this.setState({
              loader: false,
              orderArray: resp.data,
            });
          } else {
            this.setState({
              loader: false,
              orderArray: "no data",
            });
          }
        } else {
          this.setState({
            err_message: true,
            loader: false,
          });
        }
      });
    });
  }

  deleteOrder(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/orders/delete-orders?_id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.response == "ok") {
          this.getOrdersList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  updateStatusValue(item, i, value) {
    this.state.orderArray[i].status = value;
    this.setState({});
  }

  updateStatusValueToServer(item, i) {
    var order_id = item._id;
    var status = item.status;
    fetch(`${process.env.PATH_URL}/orders/ordersUpdate?_id=${order_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.response == "ok") {
          alert("Status Updated");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  orderDeleteId(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/orders/delete-orders?_id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.response == "ok") {
          this.getOrdersList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  orderMenu() {
    this.setState({
      orderMenu: true,
    });
  }

  closeOrderMenu() {
    this.setState({
      orderMenu: false,
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Orders</title>
        </Head>

        {this.state.orderMenu ? (
          <>
            <div className="vwnev" onClick={() => this.closeOrderMenu()}></div>
            <div className="vwnev_d vwn_p_h">
              <div
                onClick={() => this.closeOrderMenu()}
                className="go_back_nav"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                  ></path>
                </svg>
              </div>

              <div onClick={() => this.setState({ orderMenu: true })}>
                <div className="msg_t">
                  <div className="msg_t_m">message</div>
                  <span className="msg_t_s">: {this.state.message_text}</span>
                </div>

                <div className="msg_t mgt">
                  <div className="msg_t_m">Need Date</div>
                  <span className="msg_t_s">: {this.state.need_date}</span>
                </div>

                <div className="msg_t mgt">
                  <div className="msg_t_m">Someone Else</div>
                  <span className="msg_t_s">: {this.state.someone_else}</span>
                </div>

                <div className="msg_t mgt">
                  <div className="msg_t_m">Request To</div>
                  <span className="msg_t_s">: {this.state.request_to}</span>
                </div>

                <div className="msg_t mgt">
                  <div className="msg_t_m">Request From</div>
                  <span className="msg_t_s">: {this.state.request_from}</span>
                </div>

                {/* <div className="msg_t mgt">
                  <div className="msg_t_m">
                  coupon
                    </div>
                  <span className="msg_t_s">:  {this.state.coupon_amount}</span>
                </div> */}
              </div>
            </div>
          </>
        ) : null}

        <div className="mg_tp hgt_c">
          <Sidemenu />

          <div className="container-fluid">
            {/* MAIN */}
            <main
              role="main"
              className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
            >
              <h2>Orders</h2>

              {!this.state.loader ? (
                this.state.orderArray == "no data" ? (
                  <p className="loader_in_option">No data found</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>User's Name</th>
                          <th>Celebrity's Id</th>
                          <th>Celebrity's Name</th>
                          <th>Coupon Code</th>
                          <th>Coupon Amount</th>
                          <th>Subtotal</th>
                          <th>Including Tax</th>
                          <th>Total Payment</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Details</th>
                          <th>Option</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orderArray.map((item, i) => (
                          <tr>
                            <td>{item._id}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.celebrityId}</td>
                            <td>{item.celebrity_name}</td>
                            <td>{item.coupon_code}</td>
                            <td>{item.coupon_amount}</td>
                            <td>{item.subtotal}</td>
                            <td>18%</td>
                            <td>{item.total_payment}</td>

                            <td>
                              <select
                                name="Status"
                                id="cars"
                                value={item.status}
                                onChange={(e) =>
                                  this.updateStatusValue(
                                    item,
                                    i,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="1">Complete</option>
                                <option value="2">Pending</option>
                                <option value="3">Cancel</option>
                              </select>
                            </td>

                            <td>{item.date}</td>

                            <td className="cele-btn">
                              <a
                                onClick={() =>
                                  this.setState({
                                    orderMenu: true,
                                    message_text: item.message_text,
                                    need_date: item.need_date,
                                    someone_else: item.someone_else,
                                    request_to: item.request_to,
                                    request_from: item.request_from,
                                  })
                                }
                              >
                                <span>view</span>
                              </a>
                            </td>

                            <td
                              className="cele-btn"
                              onClick={() =>
                                this.updateStatusValueToServer(item, i)
                              }
                            >
                              <a>
                                <span>Save</span>
                              </a>
                            </td>
                            <td
                              className="cele-btn"
                              onClick={() => this.deleteOrder(item, i)}
                            >
                              <a>
                                <span>Delete</span>
                              </a>
                            </td>
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

        <Footer />
      </Protected>
    );
  }
}

export default history;
