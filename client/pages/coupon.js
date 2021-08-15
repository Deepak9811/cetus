import React, { Component } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

export class Coupon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [],
      err_message: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.getCouponsList();
  }

  getCouponsList() {
    fetch(`${process.env.PATH_URL}/coupons`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.response == "ok") {
          this.setState({
            loader: false,
            usersArray: resp.data,
          });
        } else {
          this.setState({
            err_message: true,
            loader: false,
          });
        }
      });
    });
  }

  DeleteCoupon(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/coupon?_id=${id}`, {
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
          this.getCouponsList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Coupon's List</title>
        </Head>

        <div className="mg_tp hgt_c">
            <Sidemenu />


        <div className="container-fluid">
           

            <main role="main"className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c">
              <h2>All Coupon</h2>

              {!this.state.loader ? (
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Coupon Id</th>
                        <th>Coupon Name</th>
                        <th>Coupon Code</th>
                        <th>Coupon Amount</th>
                        <th>Coupon Used</th>
                        <th>Coupon Type</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.usersArray.map((item, i) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.coupon_name}</td>
                          <td>{item.coupon_code}</td>
                          <td>{item.coupon_amount}</td>
                          <td>{item.used_time}</td>
                          <td>{item.coupon_type}</td>

                          <td className="cele-btn">
                            <a onClick={() => this.DeleteCoupon(item, i)}>
                              <span>Remove</span>
                              
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            </main>
          </div>
        </div>

        <Footer />
      </Protected>
    );
  }
}

export default Coupon;
