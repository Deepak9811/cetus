import React, { PureComponent } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Router from "next/router";
import Loader from "react-loader-spinner";

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      player: false,
      active: 0,
      coupon_code: "",
      // message_text: "",
      // request_to: "",
      request_from: "",
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      someone_else: "",
      // instagram_user: "",
      showMoreDesc: false,
      need_date: "",
      userObj: {
        name: "",
        image: "",
        userId: "",
        your_description: "",
        err_in_fetch: false,
      },
      // insta_dm: true,
      video_byte_active: true,
      orderMenu: false,
      loader: false,
    };
  }


  static async getInitialProps({query}) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return {
      query: query,
      json : json
    }
  }

  componentDidMount() {
    // console.log("diljit",this.props.query.id) 
    // console.log(this.percentage(5000, 18));
    this.url = new window.URL(window.location.href);
    this.user_Id = this.url.search.substring(this.url.search.indexOf("=") + 1);
    fetch(`${process.env.PATH_URL}/course?_id=${this.user_Id}`, {
      method: "Get",
      headers: {
        Authorization: 1,
      },
    }).then((result) => {
      result.json().then((res) => {
        // console.log("image",res.data[0].image[0].imageSrc)

        if (res.response == "ok") {
          if (res.data == "") {
            this.setState({
              err_in_fetch: true,
            });
          } else {
            this.setState({
              data: res.data,
            });
          }
        } else {
          // console.log("error");
        }
      });
    });
  }

 

  componentWillReceiveProps(nextProps) {
    if (nextProps.path !== this.props.path) {
      Router.reload(window.location.pathname);
    }
  }

  getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }

  submitOrder(user_info, amount) {
    // console.log("all data", this.state);
    // console.log("image test",this.state.data[0].image[0].imageSrc)
    var payment = this.state.insta_dm
      ? this.state.data[0].Feature_3
      : this.state.video_call_active
      ? this.state.data[0].Feature_1
      : this.state.video_byte_active
      ? this.state.data[0].Feature_2
      : this.state.custom_option
      ? this.state.data[0].custom_option_price
      : 0;
    fetch(`${process.env.PATH_URL}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: user_info.data._id,
        celebrityId: this.state.data[0]._id, //Celebriy ID
        celebrity_name: this.state.data[0].name, // Celebriy Name
        total_payment: amount,
        subtotal: payment,
        coupon_amount: this.state.coupon_amount_in_rupee,
        coupon_code: this.state.coupon_code,
        status: "2",
        date: this.getCurrentDate(),
        order_type: this.state.insta_dm
          ? "Feature 3"
          : this.state.video_call_active
          ? "Feature 2"
          : this.state.video_byte_active
          ? "Feature 1"
          : this.state.custom_option
          ? "Custom Option"
          : "Unable to detect",
        // // message_text: this.state.message_text,

        // // instagram_user: this.state.instagram_user,
        need_date: this.state.need_date,
        customer_phone: this.state.customer_phone,
        customer_email: this.state.customer_email,
        customer_name: this.state.customer_name,
        someone_else: this.state.someone_else,
        // // request_to: this.state.request_to,
        request_from: this.state.request_from,
        private_request: this.state.private_request
          ? this.state.private_request
          : false,
      }),
    }).then((result) => {
      result.json().then((resp) => {
        // console.log(resp);
        // console.log("image test", this.state);

        var cid = resp.data.celebrityId
        // console.log("cid",resp.data.celebrityId)


        this.sendDatatoOwner(user_info.data._id, amount, payment);
        this.sendThankyou(user_info.data._id, amount, payment,cid);
      });
    });
  }

  showYT() {
    this.setState({
      player: true,
    });
  }

  proceed_to_next() {
    if (this.state.need_date !== "") {
        this.theAction();
    } else {
      this.setState({
        err_message: "Please fill required options.",
      });
      // console.log("piju-8");
    }
  }

  razpay(e) {
    e.preventDefault();
    // console.log(this.state);
    var {
      myself,
      someone_else,
      coupon_amount,
      // message_text,
      need_date,
      private_request,
      instagram_user,
      // request_to,
      request_from,
    } = this.state;

    if (myself || someone_else) {
      
    } else {
      this.setState({
        err_message: "Please select option.",
      });
      // console.log("piju-3");
    }
  }

  theAction(e) {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    if (user_info) {
      this.requestRazpay(e);
      // this.CheckCouponStatus(e);
    } else {
      window.scrollTo(0, 0);
      Router.push(`/login?view=${this.user_Id}`);
    }
  }

  CheckCouponStatus() {
    if (this.state.coupon_code !== "") {
      fetch(
        `${process.env.PATH_URL}/coupon-code?coupon_code=${this.state.coupon_code}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((data) => {
        data.json().then((resp) => {
          // console.log(resp);
          if (resp.response == "ok") {
            // this.checKCouponUsed(resp);
            this.checkAuthCoupon(resp);
          } else {
            this.setState({
              err_coupon: "Please enter a valid Coupon",
            });
          }
        });
      });
    } else {
      // this.requestRazpay();
      alert("Please Fill Coupon");
    }
  }

  checkAuthCoupon(resp) {
    var user_id = JSON.parse(localStorage.getItem("user_id"));
    var coupon_code = resp.data[0].coupon_code;
    // console.log("state",this.state)

    fetch(`${process.env.PATH_URL}/check-couponCode`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        coupon_code: coupon_code,
      }),
    }).then((data) => {
      data.json().then((resp2) => {
        if (resp2.response == "ok") {
          var user_id = JSON.parse(localStorage.getItem("user_id"));
          var coupon_code = resp.data[0].coupon_code;

          var used_time = resp.data[0].used_time;
          // console.log("used_time", used_time);
          // console.log("couponAmount", resp2.data.coupon_amount, "actualAmount", this.printAmount().replace("/-", ""))

          fetch(`${process.env.PATH_URL}/check-couponManage`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user_id,
              coupon_code: coupon_code,
            }),
          }).then((data) => {
            data.json().then((resp3) => {
              // console.log("used_time", parseInt(used_time),"time_used", parseInt(resp3.data.time_used),"id",resp3.data._id);
              if (resp3.response == "ok") {
                if (parseInt(used_time) > parseInt(resp3.data.time_used)) {
                  if (resp2.data.coupon_amount) {
                    if (
                      Number(resp2.data.coupon_amount) <=
                      this.printAmount().replace("/-", "")
                    ) {
                      this.setState({
                        coupon_status: "Coupon Applied",
                        coupon_type: resp.data[0].coupon_type,
                        coupon_amount_in_rupee: resp.data[0].coupon_amount,
                      });
                    } else {
                      this.setState({
                        err_coupon:
                          "Coupon amount should be more than booking amount.",
                      });
                    }
                  }
                } else if (
                  parseInt(used_time) <= parseInt(resp3.data.time_used)
                ) {
                  this.setState({
                    err_coupon: "You exceeded the limit of coupon.",
                  });
                }
              } else {
                this.setState({
                  coupon_status: "Coupon Applied",
                  coupon_type: resp.data[0].coupon_type,
                  coupon_amount_in_rupee: resp.data[0].coupon_amount,
                });
              }
            });
          });
          // after fetch 3
        } else {
        }
      });
    });
  }

  addUserToCouponUsedList() {
    var user_id = JSON.parse(localStorage.getItem("user_id"));

    var coupon_code = this.state.coupon_code;

    fetch(`${process.env.PATH_URL}/coupon-code?coupon_code=${coupon_code}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp2) => {
        if (resp2.response == "ok") {
          var user_id = JSON.parse(localStorage.getItem("user_id"));
          var coupon_code = resp2.data[0].coupon_code;

          var used_time = resp2.data[0].used_time;

          // console.log("used_timeused_timeuse",used_time)

          fetch(`${process.env.PATH_URL}/check-couponManage`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user_id,
              coupon_code: coupon_code,
            }),
          }).then((data) => {
            data.json().then((resp3) => {
              if (resp3.response == "ok") {
                if (parseInt(used_time) > parseInt(resp3.data.time_used)) {
                  var _id = resp3.data._id;
                  // console.log("hello","time_usedtime_used",parseInt(resp3.data.time_used),"_id_id",_id)

                  fetch(`${process.env.PATH_URL}/couponManage?_id=${_id}`, {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      time_used: resp3.data.time_used + 1,
                    }),
                  }).then((data) => {
                    data.json().then((resp) => {
                      if (resp.response == "ok") {
                        // console.log("coupon updated".resp.response);
                      } else {
                        // alert("Something went wrong");
                      }
                    });
                  });
                }
              } else {
                var user_id = JSON.parse(localStorage.getItem("user_id"));

                fetch(`${process.env.PATH_URL}/couponManage`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    user_id: user_id,
                    coupon_code: this.state.coupon_code,
                    time_used: 1,
                  }),
                }).then((data) => {
                  data.json().then((resp) => {
                    if (resp.response == "ok") {
                      // console.log("coupon added".resp);
                    } else {
                      // alert("Something went wrong");
                    }
                  });
                });
              }
            });
          });
        }
      });
    });
  }

  requestRazpay(validity, coupon, coupon_status) {
    if (this.state.coupon_status) {
      var user_info = JSON.parse(localStorage.getItem("user_info"));
      var local_email = user_info.data.email;
      var price = this.priceMoney();
      var xtotal_amount = Number(price);
      var total_amount = Number(xtotal_amount);

      var couponTotalAmount = total_amount;
      // console.log(
      //   "!IMPORTANT",JSON.stringify({ price: this.priceMoney(),xtotal_amount: Number(price),total_amount: Number(xtotal_amount),couponTotalAmount: couponTotalAmount * 100,
      //   })
      // );

      const orderUrl = `${process.env.PATH_URL}/razpay?amount=${
        couponTotalAmount * 100
      }`;
      fetch(orderUrl, {
        method: "POST",
        headers: {
          Authorization: 1,
        },
      }).then((result) => {
        // console.log(couponTotalAmount);
        result.json().then(async (res) => {
          // console.log("res", res);
          var options = {
            // key: "rzp_test_gi866dQEQC5ElU", //test mode
            key: "rzp_live_nmaRTNIKkopgh8",
            amount: res.data.amount_due,
            currency: "INR",
            name: "Pay to Celebze",
            // text:"",
            description: "Inclusive Tax",
            order_id: res.data.id,
            // image: "https://example.com/your_logo",

            handler: async (response) => {
              this.checkOrder(response, "ok", couponTotalAmount);

              if ((response, "ok")) {
                this.setState({
                  loader: true,
                });
                // alert("deepak", response);
                this.addUserToCouponUsedList();
                this.sendThankyou(user_info.data._id, payment, amount);
                this.sendDatatoOwner(user_info.data._id, payment, amount);
              }
            },
            order_id: res.id,
            prefill: {
              name: "",
              email: "@gmail.com",
              contact: "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();

          rzp1.on("payment.failed", function (response) {
            this.checkOrder(response, "error");
          });
        });
      });
    } else {
      var user_info = JSON.parse(localStorage.getItem("user_info"));
      var local_email = user_info.data.email;
      var price = this.priceMoney();
      var xtotal_amount = Number(price);
      var total_amount = Number(xtotal_amount);

      const orderUrl = `${process.env.PATH_URL}/razpay?amount=${
        total_amount * 100
      }`;
      fetch(orderUrl, {
        method: "POST",
        headers: {
          Authorization: 1,
        },
      }).then((result) => {
        result.json().then(async (res) => {
          var options = {
            // key: "rzp_test_gi866dQEQC5ElU", //test mode
            key: "rzp_live_nmaRTNIKkopgh8",
            amount: res.data.amount_due,
            currency: "INR",
            name: "Pay to Celebze",
            // text:"",
            description: "Inclusive Tax",
            order_id: res.data.id,
            // image: "https://example.com/your_logo",

            handler: async (response) => {
              this.checkOrder(response, "ok", total_amount);
              if ((response, "ok")) {
                this.setState({
                  loader: true,
                });
                // alert("deepak", response);
                // this.sendThankyou(user_info.data._id, payment);
                // console.log("sendThankyou", sendThankyou);
                this.sendDatatoOwner(user_info.data._id, payment);
                this.sendThankyou(user_info.data._id, payment, amount);
              }
            },
            order_id: res.id,
            prefill: {
              name: "",
              email: "@gmail.com",
              contact: "",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();

          rzp1.on("payment.failed", function (response) {
            this.checkOrder(response, "error");
          });
        });
      });
    }
  }

  sendDatatoOwner(user_id, payment, amount) {
    fetch(`${process.env.PATH_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        form_type: 6,
        mail_to: "info@celebze.com",
        userId: user_id,
        celebrityId: this.state.data[0]._id,
        celebrity_name: this.state.data[0].name,
        total_payment: payment,
        subtotal: amount,
        status: "2",
        date: this.getCurrentDate(),
        order_type: this.state.insta_dm
          ? "Feature 3"
          : this.state.video_call_active
          ? "Feature 2"
          : this.state.video_byte_active
          ? "Feature 1"
          : this.state.custom_option
          ? "Custom Option"
          : "Unable to detect",
        // message_text: this.state.message_text,
        instagram_user: this.state.instagram_user,
        need_date: this.state.need_date,
        customer_phone: this.state.customer_phone,
        customer_email: this.state.customer_email,
        customer_name: this.state.customer_name,
        someone_else: this.state.someone_else,
        // // request_to: this.state.request_to,
        request_from: this.state.request_from,
        private_request: this.state.private_request
          ? this.state.private_request
          : false,
      }),
    });
  }

  sendThankyou(user_id, payment, amount,cid) {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    var local_email = user_info.data.email;
    // console.log("cid",cid);
    this.setState({
      loader: true,
    });
    fetch(`${process.env.PATH_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mail_to: local_email,
        // mail_to: "theartistnw@gmail.com",
        form_type: 5,

        celebrity_name: this.state.data[0].name,
        total_payment: payment,
        need_date: this.state.need_date, //delivery date
        date: this.getCurrentDate(), //booking date

        order_type: this.state.insta_dm
          ? "Feature 3"
          : this.state.video_call_active
          ? "Feature 2"
          : this.state.video_byte_active
          ? "Feature 1"
          : this.state.custom_option
          ? "Custom Option"
          : "Unable to detect",

        // photo:this.state.data[0].image[0].imageSrc,
        celebrityId:cid,

        customer_email: this.state.customer_email,
        customer_name: this.state.customer_name,
        customer_phone: this.state.customer_phone,
        // // request_to: this.state.request_to,
        request_from: this.state.request_from,
        // message_text: this.state.message_text,
      }),
    }).then((data)=>{
      data.json().then((resp)=>{
        // console.log("thnks",resp)
        this.setState({
          loader:false,
        });
        if(resp.response == "ok"){
          
        }
      })
    })
  }

  percentage(num, per) {
    return (num / 100) * per;
  }

  checkOrder(response, value, amount) {
    var user_info = JSON.parse(localStorage.getItem("user_info"));
    if (response.razorpay_payment_id && value == "ok") {
      this.submitOrder(user_info, amount);
      this.setState({
        orderMenu: true,
        loader: true,
      });
    } else if (response.razorpay_payment_id && value == "error") {
      // console.log("Payment Failed !!");
    } else {
      // console.log("Payment Failed");
    }
    // this.setState({ payment_response_div: true, payment_data: response });
  }

  makeUrlEmbed(e) {
    var value = e;
    if (value.includes("watch?v=")) {
      var value = value.replace("watch?v=", "embed/");
      return value;
    } else {
      return value;
    }
  }

  applyCoupon() {
    this.setState({
      err_coupon: false,
    });
    this.CheckCouponStatus();
  }

  printAmount() {
    var data = this.state.data;
    var amount = this.state.insta_dm
      ? data[0].Feature_3
      : this.state.video_call_active
      ? data[0].Feature_1
      : this.state.video_byte_active
      ? data[0].Feature_2
      : this.state.custom_option
      ? data[0].custom_option_price
      : null;

    var total_amount;
    if (this.state.coupon_status) {
      if (this.state.coupon_type == "Percentage") {
        var percentage_amount =
          (amount.replace("/-", "") *
            Number(this.state.coupon_amount_in_rupee)) /
          100;
        var total_amount = amount.replace("/-", "") - Number(percentage_amount);
      } else {
        var total_amount =
          amount.replace("/-", "") - Number(this.state.coupon_amount_in_rupee);
      }
    } else {
      var total_amount = amount;
    }
    return total_amount;
  }

  priceMoney() {
    // var amount = this.state.insta_dm
    //   ? this.state.data[0].Feature_3
    //   : this.state.video_call_active
    //   ? this.state.data[0].Feature_1
    //   : this.state.video_byte_active
    //   ? this.state.data[0].Feature_2
    //   : this.state.custom_option
    //   ? this.state.data[0].custom_option_price
    //   : 0;

    var get_amount = this.printAmount();
    var amount;
    if (typeof get_amount == "number") {
      var amount = get_amount;
    } else {
      var amount = get_amount.replace("/-", "");
    }
    var per_price = this.percentage(amount, 18);
    return Number(amount) + Number(per_price);
  }

  closeOrderMenu() {
    this.setState({
      orderMenu: false,
    });
  }

  render() {
    var data = this.state.data;

    return (
      <div className="main fadeIn">
        <Head>
          <title>Verify</title>
        </Head>

        {/* order Overlay */}
        {this.state.orderMenu ? (
          <>
            <div className="vwnev"></div>

            {!this.state.loader ? (
              <div className="vwnev_d">
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

                <h3>Your order has been completed</h3>

                <Link href="/">
                <button className="btn dark-btn lg  db booknow-btn wd-50 mg-0-a">
                  <span id="paynowBTNText">Continue</span>
                </button>
                </Link>

              </div>
            ) : (
              <div className="loader_in_option ld_in_op">
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={60}
                  width={80}
                  // timeout={3000}
                />
              </div>
            )}
          </>
        ) : null}

        {data !== null ? (
          !this.state.err_in_fetch ? (
            <>
              <div
                className="lightbox-component"
                style={{ display: this.state.player ? "block" : "none" }}
              >
                <div className="lightbox-content">
                  <div className="video-overlay-component">
                    <div
                      className="video-wrapper"
                      style={{ transform: "scale(1)" }}
                    >
                      <div
                        className="video-player"
                        style={{ width: "1366px", height: "407px" }}
                      >
                        <div style={{ width: "100%", height: "100%" }}>
                          <iframe
                            frameBorder="0"
                            allowFullScreen="1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="YouTube video player"
                            width="100%"
                            height="100%"
                            src={
                              data[0].yt_url
                                ? this.makeUrlEmbed(data[0].yt_url)
                                : null
                            }
                            id="widget2"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className="cross-sign close-icon"
                    onClick={() => this.setState({ player: false })}
                  >
                    x
                  </a>
                </div>
              </div>

              <div className="container celb-cont">
                <section className="celebrity-container">
                  <div className="celebrity-image-left">
                    <div className="celebrity-image corner-img">
                      <div className="celeb-image-slider">
                        <div className="celeb-slide-img pst_r">
                          <img
                            className="celeb-slide-img"
                            src={
                              this.state.active == 0
                                ? data[0].image
                                  ? data[0].image[0].imageSrc
                                  : null
                                : this.state.active == 1
                                ? data[0].image_2
                                  ? data[0].image_2[0].imageSrc
                                  : null
                                : this.state.active == 2
                                ? data[0].image_3
                                  ? data[0].image_3[0].imageSrc
                                  : null
                                : this.state.active == 3
                                ? data[0].image
                                  ? data[0].image[0].imageSrc
                                  : null
                                : null
                            }
                          />

                          {this.state.active == 3 ? (
                            <div
                              onClick={() => this.setState({ active: 3 })}
                              className="__shadow__play"
                            >
                              <svg
                                onClick={() => this.showYT()}
                                className={`mini_pin_yt vd_cnt ${
                                  this.state.active == 3
                                    ? "active_image_pin"
                                    : null
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="white"
                                  d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
                                  className="_path_pin"
                                ></path>
                              </svg>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* Small Pins */}
                      <div style={{ marginTop: 12 }}>
                        {data[0].image[0] ? (
                          <img
                            onClick={() => this.setState({ active: 0 })}
                            className={`celeb-slide-img mini_pins ${
                              this.state.active == 0 ? "active_image_pin" : null
                            }`}
                            src={
                              data[0].image ? data[0].image[0].imageSrc : null
                            }
                          />
                        ) : null}
                        {data[0].image_2[0] ? (
                          data[0].image_2[0].imageSrc ? (
                            <img
                              onClick={() => this.setState({ active: 1 })}
                              className={`celeb-slide-img mini_pins ${
                                this.state.active == 1
                                  ? "active_image_pin"
                                  : null
                              }`}
                              src={
                                data[0].image_2[0]
                                  ? data[0].image_2[0].imageSrc
                                  : null
                              }
                            />
                          ) : null
                        ) : null}
                        {data[0].image_3[0] ? (
                          data[0].image_3[0].imageSrc ? (
                            <img
                              onClick={() => this.setState({ active: 2 })}
                              className={`celeb-slide-img mini_pins ${
                                this.state.active == 2
                                  ? "active_image_pin"
                                  : null
                              }`}
                              src={
                                data[0].image_3[0]
                                  ? data[0].image_3[0].imageSrc
                                  : null
                              }
                            />
                          ) : null
                        ) : null}

                        {data[0].yt_url !== "null" ? (
                          <div onClick={() => this.setState({ active: 3 })}>
                            <svg
                              // onClick={() => this.showYT()}
                              className="mini_pin_yt"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="white"
                                d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
                                className="_path_pin"
                              ></path>
                            </svg>

                            <div className="shade_black"></div>

                            <img
                              className={`celeb-slide-img mini_pins ${
                                this.state.active == 3
                                  ? "active_image_pin"
                                  : null
                              }`}
                              src={
                                data[0].image ? data[0].image[0].imageSrc : null
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div
                    className="celeb-detail-box video-call-service"
                    id="FormBox"
                  >
                    <form id="formBookNow">
                      <div className="celeb-detail-wrap">
                        <h2 className="section-title celeb-name">
                          {data[0].name}
                        </h2>

                        <div className="celeb-tags">
                          <div className="celeb-tag-wrap">
                            <span className="celeb-tag" tabIndex="0">
                              {data[0].category}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`celeb-short-desp collapse-desp ${
                            this.state.showMoreDesc
                              ? "expand-desp"
                              : "line-clamp"
                          }`}
                        >
                          <p>{data[0].your_description}</p>
                        </div>

                        <a
                          onClick={() =>
                            this.setState({
                              showMoreDesc: this.state.showMoreDesc
                                ? false
                                : true,
                            })
                          }
                          className="expand-link"
                        >
                          {this.state.showMoreDesc
                            ? "show less -"
                            : "show more +"}
                        </a>

                        <div className="celeb-products">
                          <div className="celeb-top-nav">
                            <h5 className="Detail-title">REQUEST FOR</h5>
                          </div>

                          <div className="service-list">
                            {data[0].Feature_2 !== "0" ? (
                              <div
                                className="celeb-service"
                                style={{ width: "20%" }}
                              >
                                <a
                                  className="servicesTab"
                                  data-service="video_message"
                                  data-servicename="Video Message"
                                >
                                  <label
                                    className={`celeb-label vm-label ${
                                      this.state.video_byte_active
                                        ? "vc-label"
                                        : null
                                    }`}
                                    htmlFor="video_msg"
                                    onClick={() =>
                                      this.setState({
                                        video_byte_active: true,
                                        video_call_active: false,
                                        insta_dm: false,
                                        custom_option: false,
                                      })
                                    }
                                  >
                                    <div className="service-price">
                                      <div className="offer-price">
                                        <span className="currency">₹</span>
                                        <span
                                          className="pricing"
                                          id="videoMessageOfferPrice"
                                        >
                                          {data[0].Feature_2}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="service-name mg-b-20-p">
                                      <h3>Feature 1</h3>
                                      {/* <span className="box-note">5 Mint</span> */}
                                    </div>
                                  </label>
                                </a>
                              </div>
                            ) : null}

                            {data[0].Feature_1 !== "0" ? (
                              <div
                                className="celeb-service"
                                style={{ width: "20%" }}
                              >
                                <a
                                  className="servicesTab"
                                  data-service="video_call"
                                  data-servicename="Feature 2"
                                >
                                  <label
                                    className={`celeb-label ${
                                      this.state.video_call_active
                                        ? "vc-label"
                                        : null
                                    }`}
                                    htmlFor="video_call"
                                    onClick={() =>
                                      this.setState({
                                        custom_option: false,
                                        video_call_active: true,
                                        video_byte_active: false,
                                        insta_dm: false,
                                      })
                                    }
                                  >
                                    <div className="service-price">
                                      <div></div>
                                      <div className="offer-price">
                                        <span className="currency">₹</span>
                                        <span
                                          className="pricing"
                                          id="videoCallOfferPrice"
                                        >
                                          {data[0].Feature_1}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="service-name">
                                      <h3>Feature 2</h3>
                                      <span className="box-note"></span>
                                      {/* <span
                                      className="box-note"
                                      id="videoCallDurationSelectedLabel"
                                    >
                                    </span> */}
                                    </div>
                                  </label>
                                </a>
                              </div>
                            ) : null}

                            {data[0].Feature_3 !== "0" ? (
                              <div
                                className="celeb-service"
                                style={{ width: "20%" }}
                              >
                                <a
                                  className="servicesTab"
                                  data-service="video_call"
                                  data-servicename="Feature 2"
                                >
                                  <label
                                    className={`celeb-label ${
                                      this.state.insta_dm ? "vc-label" : null
                                    }`}
                                    onClick={() =>
                                      this.setState({
                                        custom_option: false,
                                        video_call_active: false,
                                        video_byte_active: false,
                                        insta_dm: true,
                                      })
                                    }
                                  >
                                    <div className="service-price">
                                      <div></div>
                                      <div className="offer-price">
                                        <span className="currency">₹</span>
                                        <span className="pricing">
                                          {data[0].Feature_3}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="service-name mg-b-20-p">
                                      <h3>Feature 3 </h3>
                                      {/* <span
                                      className="box-note"
                                      id="videoCallDurationSelectedLabel"
                                    >
                                    </span> */}
                                    </div>
                                  </label>
                                </a>
                              </div>
                            ) : null}
                            <div
                              className="celeb-service"
                              style={{ width: "20%" }}
                            >
                              <Link href="/brand-queries">
                                <a
                                  className="servicesTab"
                                  data-service="video_call"
                                  data-servicename="Feature 2"
                                >
                                  <label className={`celeb-label`}>
                                    {/* <div className="service-price">
                                      <div></div>
                                      <div className="offer-price">
                                        <span className="currency">&nbsp;</span>
                                        <span className="pricing"></span>
                                      </div>
                                    </div> */}
                                    <div className="service-name mg-b-20-p">
                                      <h3>Brand Queries </h3>
                                    </div>
                                  </label>
                                </a>
                              </Link>
                            </div>

                            {data[0].custom_option_name !== "null" ? (
                              <div className="celeb-service">
                                <a
                                  className="servicesTab"
                                  data-service="video_message"
                                  data-servicename="Video Message"
                                >
                                  <label
                                    className={`celeb-label ${
                                      this.state.custom_option
                                        ? "vc-label"
                                        : null
                                    }`}
                                    htmlFor="video_msg"
                                    onClick={() =>
                                      this.setState({
                                        custom_option: true,
                                        video_byte_active: false,
                                        video_call_active: false,
                                        insta_dm: false,
                                      })
                                    }
                                  >
                                    <div className="service-price">
                                      <div className="offer-price">
                                        <span className="currency">₹</span>
                                        <span
                                          className="pricing"
                                          id="videoMessageOfferPrice"
                                        >
                                          {data[0].custom_option_price}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="service-name">
                                      <h3>{data[0].custom_option_name}</h3>
                                      {/* <span className="box-note">5 Mint</span> */}
                                    </div>
                                  </label>
                                </a>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="booking-section">
                          <input
                            id="slug"
                            name="artist_slug"
                            type="hidden"
                            value="gaurav-pandey"
                          />
                          <input
                            id="artist_id"
                            name="artist_id"
                            type="hidden"
                            value="5fa53cba6338900476211442"
                          />
                          <input
                            id="product_name"
                            name="product_name"
                            type="hidden"
                            value="Feature 2 by Gaurav"
                          />
                          <input
                            id="message_type"
                            name="message_type"
                            type="hidden"
                            value="videocall"
                          />
                          <input
                            name="currency_code"
                            type="hidden"
                            value="INR"
                          />
                          <input name="amount" type="hidden" value="3999" />
                          <input name="amount_gst" type="hidden" value="720" />
                          <input
                            name="amount_total"
                            type="hidden"
                            value="4719"
                          />
                          <input name="usd_amount" type="hidden" value="54" />
                          <input
                            name="usd_amount_gst"
                            type="hidden"
                            value="9.72"
                          />
                          <input
                            name="usd_amount_total"
                            type="hidden"
                            value="63.72"
                          />
                          <input
                            name="amount_discount"
                            type="hidden"
                            value="0"
                          />
                          <input
                            name="applied_amount"
                            type="hidden"
                            value="0"
                          />
                          <input name="coupon_id" type="hidden" value="" />
                          <input name="coupon_code" type="hidden" value="" />

                          <div className="booking-box">
                            <div className="booking-left">
                              {/* <div
                          className="form-container request-form-box spacing-wrap"
                          id="videoCallDurationBlock"
                        >
                          <h3 className="bform-title">
                            <img src="https://d306zg4758tw6z.cloudfront.net/cb/img/duraton_icon.svg" />{" "}
                            CALL DURATION
                          </h3>
                          <div className="form-wrap-group mwrap-100 mb-0">
                            <div className="form-group spac-r mb-0">
                              <select
                                className="form-control"
                                name="duration"
                                id="videoCallDuration"
                              >
                                .
                                <option
                                  value="2"
                                  data-price="3999"
                                  data-priceusd="54"
                                  selected=""
                                >
                                  2 Minutes
                                </option>
                                <option
                                  value="3"
                                  data-price="5999"
                                  data-priceusd="81"
                                >
                                  3 Minutes
                                </option>
                                <option
                                  value="5"
                                  data-price="13999"
                                  data-priceusd="189"
                                >
                                  5 Minutes
                                </option>
                                <option
                                  value="10"
                                  data-price="21999"
                                  data-priceusd="297"
                                >
                                  10 Minutes
                                </option>
                              </select>
                            </div>
                          </div>
                        </div> */}

                              <div className="form-container request-form-box spacing-wrap">
                                {/* Heading */}
                                <h3 className="bform-title">
                                  <img src="https://d306zg4758tw6z.cloudfront.net/cb/img/request_form.svg" />
                                  REQUEST FOR
                                  {this.state.video_byte_active
                                    ? " Feature 1"
                                    : this.state.video_call_active
                                    ? " Feature 2"
                                    : this.state.insta_dm
                                    ? " Feature 3"
                                    : this.state.custom_option
                                    ? this.state.data[0].custom_option_name
                                    : null}
                                </h3>
                                <div id="videoMessageService">
                                  {/* For whome */}

                                  {/* <div
                                    className="form-group"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    <p className="custom-radio">
                                      <input
                                        onClick={() =>
                                          this.setState({
                                            myself: true,
                                            someone_else: false,
                                          })
                                        }
                                        type="radio"
                                        id="purchaser"
                                        name="bookedFor"
                                        className="bookingForRadio"
                                        data-booked_htmlFor="me"
                                        value="me"
                                        checked={this.state.myself}
                                      />
                                      <label htmlFor="purchaser">My Self</label>
                                    </p>
                                    <p className="custom-radio">
                                      <input
                                        onClick={() =>
                                          this.setState({
                                            someone_else: true,
                                            myself: false,
                                          })
                                        }
                                        type="radio"
                                        id="someoneElse"
                                        name="bookedFor"
                                        data-booked_htmlFor="someone"
                                        value="someone"
                                        className="bookingForRadio"
                                      />
                                      <label htmlFor="someoneElse">
                                        Someone Else
                                      </label>
                                    </p>
                                  </div> */}

                                  {/* {this.state.someone_else ? (
                                    <div className="form-wrap-group to_from">
                                      <div className="form-group spac-r">
                                        <label className="form-label">To </label>
                                        <input
                                          onChange={(e) =>
                                            this.setState({
                                              // request_to: e.target.value,
                                            })
                                          }
                                          type="email"
                                          className="form-control"
                                          id="to_name"
                                          name="email"
                                          // value={this.state.request_to}
                                          placeholder="Your Email"
                                        />
                                      </div>
                                      <div className="form-group spac-l">
                                        <label className="form-label">From</label>
                                        <input
                                          onChange={(e) =>
                                            this.setState({
                                              request_from: e.target.value,
                                            })
                                          }
                                          type="email"
                                          className="form-control"
                                          id="from_name"
                                          name="email"
                                          value={this.state.request_from}
                                          placeholder="Email"
                                        />
                                      </div>
                                    </div>
                                  ) : // SELF INFORMATION */}
                                  {/* this.state.myself ? (
                                    <div className="form-wrap-group to_from">
                                      <div className="form-group spac-r">
                                        <label className="form-label">Name </label>
                                        <input
                                          onChange={(e) =>
                                            this.setState({
                                              customer_name: e.target.value,
                                            })
                                          }
                                          type="text"
                                          className="form-control"
                                          id="to_name"
                                          name="to_name"
                                          value={this.state.customer_name}
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  ) : null} */}

                                  {/* Message Box */}
                                  {/* <div className="form-group mb-10">
                                    <label className="form-label msg-label">
                                      <p>
                                        Please describe, What you want on your
                                        special day.
                                      </p>
                                      <div id="the-count" className="float-right"> */}
                                        {/* <span id="current">0</span>
                                        <span id="maximum">/ 250</span> */}
                                      {/* </div>
                                    </label>
                                    <textarea
                                      // value={this.state.message_text}
                                      onChange={(e) =>
                                        this.setState({
                                          // message_text: e.target.value,
                                        })
                                      }
                                      className="form-control frm-booknow-message"
                                      id="userMessageVideoMessage"
                                      name="message"
                                      placeholder="e.g. I would want you to wish my wife Shweta a very happy 35th birthday. She is a big fan of yours :)"
                                      rows="6"
                                      maxLength="250"
                                      required=""
                                    ></textarea>

                                    {this.state.insta_dm ? (
                                      <div>
                                        <p className="form-label msg-label mt-10">
                                          Instagram Account
                                        </p>

                                        <input
                                          value={this.state.instagram_user}
                                          onChange={(e) =>
                                            this.setState({
                                              instagram_user: e.target.value,
                                            })
                                          }
                                          className="form-control frm-booknow-message"
                                          id="userMessageVideoMessage"
                                          name="message"
                                          placeholder="@username "
                                          rows="6"
                                          maxLength="250"
                                          required=""
                                        />
                                        <p className="form-note w-100 mb-8">
                                          <span className="bold">Note</span>
                                          <br />
                                          *Please make sure this instagram
                                          account is not private.
                                          <br />
                                          *We will deliver in this Account.
                                        </p>
                                      </div>
                                    ) : null}
                                  </div> */}

                                  {/* Call Duration */}

                                  {/* {this.state.video_call_active?
                                  <div className="form-wrap-group mwrap-100 mb-10">
                                    <label className="form-label">
                                      Call Duration
                                    </label>
                                    <div className="duration-wrap" style={{width : "100%"}} >
                                      <div className="form-group spac-r mb-0" style={{float:'left'}} >
                                        <select
                                          className="form-control valid"
                                          name="duration"
                                          id="videoCallDuration"
                                          aria-invalid="false"
                                        >
                                          <option
                                            value="5"
                                            data-price="15000"
                                            data-priceusd="200"
                                            selected=""
                                          >
                                            5 Minutes{" "}
                                          </option>
                                        </select>
                                      </div>
                                      <div className="form-group spac-l mb-0" style={{float:'left'}} >
                                        <select
                                          className="form-control"
                                          name="time"
                                          id="videoCallDurationTimeSlot"
                                        >
                                          <option value="">
                                            Select a Time Slot
                                          </option>
                                          <option value="10:00 AM">
                                            10:00 AM
                                          </option>
                                          <option value="10:20 AM">
                                            10:20 AM
                                          </option>
                                          <option value="02:50 PM">
                                            02:50 PM
                                          </option>
                                          <option value="05:10 PM">
                                            05:10 PM
                                          </option>
                                        </select>
                                      </div>
                                      <div id="timeslotResults"></div>
                                    </div>
                                  </div>

                                  :null} */}

                                  {/* Last Section */}
                                  {/* {this.state.insta_dm ? null : ( */}
                                  <>
                                    <div className="form-group">
                                      <label htmlFor="date-time" className="form-label">
                                        By when do you need
                                        {this.state.video_byte_active
                                          ? " Feature 1"
                                          : this.state.video_call_active
                                          ? " Feature 2"
                                          : this.state.insta_dm
                                          ? " Feature 3"
                                          : this.state.custom_option
                                          ? this.state.data[0]
                                              .custom_option_name
                                          : null}
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control date-control schedule_at hasDatepicker"
                                        id="date-time"
                                        name="schedule_at"
                                        placeholder="dd/mm/yyyy"
                                        value={this.state.need_date}
                                        onChange={(e) =>
                                          this.setState({
                                            need_date: e.target.value,
                                          })
                                        }
                                        autoComplete="off"
                                      />
                                    </div>

                                    <div>
                                      <p className="form-label msg-label mt-10">
                                        Do you have any coupon ?
                                      </p>

                                      <input
                                        value={this.state.coupon_code}
                                        onChange={(e) =>
                                          this.setState({
                                            coupon_code: e.target.value,
                                            err_coupon: false,
                                          })
                                        }
                                        className="form-control frm-booknow-message"
                                        id="userMessageVideoMessage"
                                        name="message"
                                        placeholder="Code"
                                        rows="6"
                                        required=""
                                      />
                                      <labe
                                        onClick={() => this.applyCoupon()}
                                        className="pd-0 wd-i-25 btca btn dark-btn mgt-1 lg  db"
                                      >
                                        Apply
                                      </labe>

                                      {/* className="btn dark-btn lg  db booknow-btn" */}
                                    </div>

                                    {/* Error Message */}
                                    {this.state.err_coupon ? (
                                      <p style={{ fontSize: 13, color: "red" }}>
                                        {this.state.err_coupon}
                                      </p>
                                    ) : null}

                                    {this.state.coupon_status ? (
                                      <p
                                        style={{ fontSize: 13, color: "green" }}
                                      >
                                        {this.state.coupon_status}
                                      </p>
                                    ) : null}

                                    {/* EMAIL & CONTACT IF MYSELF */}
                                    <div className="form-wrap-group to_from">
                                        <div className="form-group spac-r">
                                          <label className="form-label" htmlFor="email">
                                            Email
                                          </label>
                                          <input
                                            onChange={(e) =>
                                              this.setState({
                                                customer_email: e.target.value,
                                              })
                                            }
                                            type="email"
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            value={this.state.customer_email}
                                            placeholder="Email"
                                            autoComplete=""
                                          />
                                        </div>

                                      <div className="form-group spac-l">
                                        <label className="form-label">
                                          Contact No.
                                        </label>
                                        <input
                                          onChange={(e) =>
                                            this.setState({
                                              customer_phone: e.target.value,
                                            })
                                          }
                                          type="number"
                                          className="form-control"
                                          id="from_name"
                                          name="from_name"
                                          value={this.state.customer_phone}
                                          placeholder="Contact No."
                                          autoComplete=""
                                        />
                                      </div>
                                      <p className="form-note w-100 mb-8">
                                        <span className="bold">Note</span>
                                        <br />
                                        *your required request will be delivered
                                        in this contact.
                                      </p>
                                    </div>

                                    {/* <div className="form-group mb-0">
                                      <label
                                        className="custom-checkbox"
                                        htmlFor="make_private"
                                      >
                                        Don’t make this video public on Celebze
                                        <input
                                          onChange={() =>
                                            this.setState({
                                              private_request: this.state
                                                .private_request
                                                ? false
                                                : true,
                                            })
                                          }
                                          type="checkbox"
                                          name="make_private"
                                          id="make_private"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <br />
                                    </div> */}
                                  </>
                                  {/* // )} */}
                                </div>

                                <p className="form-note w-100 mb-8">
                                  <span className="bold">Note:</span>
                                  <br />
                                  *We will deliver your order within 7 days..
                                </p>

                                <p className="form-note w-100 mb-0">
                                  <span className="bold">Disclaimer:</span>
                                  <br />
                                  *The above rates are not applicable for
                                  branded/promotional requests.
                                  <br />
                                  Avoid profanity and misbehaviour. Do not use
                                  bad words or your request may be quarantined
                                  and the amount won’t be refunded. T&amp;C
                                  Apply.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error Message */}
                      {this.state.err_message ? (
                        <p style={{ fontSize: 13, color: "red" }}>
                          {this.state.err_message}
                        </p>
                      ) : null}

                      <div id="failedResult"></div>
                      <div className="book-fixed-box">
                        <div className="book-price">
                          <p>
                            <span className="currency">₹</span>
                            <span className="pricing" id="finalAmountApplied">
                              {this.printAmount(data)}
                            </span>
                          </p>
                          <span className="gst-text">Exclusive of 18% GST</span>
                        </div>

                        <button
                          className="btn dark-btn lg  db booknow-btn"
                          id="rzp-button1"
                          data-toggle="tooltip"
                          type="submit"
                          onClick={(e) => {
                            this.razpay(e);
                          }}
                        >
                          Book <span id="paynowBTNText">Now</span>
                        </button>
                      </div>
                      <div className="booking-process">
                        <h3>Booking Process</h3>
                        <ul>
                          <li>
                            <span>1</span>
                            <h4>
                              Your order updates and your booking receipt would
                              be shared on the email id provided by you
                            </h4>
                          </li>
                          <li>
                            <span> 2</span>
                            <h4>
                              When your request is completed, we shall share the
                              link on your phone number and in your email inbox
                            </h4>
                          </li>
                          <li>
                            <span>3</span>
                            <h4>
                              If
                                is not able to complete your request, we shall
                                refund the entire money immediately{" "}
                            </h4>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </>
          ) : null
        ) : (
          <div
            className="loader_in_option2"
            style={{ marginBottom: "10%", marginTop: "10%" }}
          >
            <Loader type="Oval" color="#00BFFF" height={30} width={50} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default View;
