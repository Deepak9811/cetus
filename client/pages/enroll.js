import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import Footer from "./common/footer";
import Head from "next/head";

class Enroll extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      // choose_platform: "",
      // handle_platform: "",
      dob: "",
      // gender: "",
      // best_option_covers: "",
      // on_boarding_process: "",
      category: "",
      social_platform: "",
      social_platform_handle: "",
      total_followers: "",
      description: "",
      err_message: false,
      success_message: false,
      categoryArray:[]
    };
  }


  componentDidMount(){
    this.getCategoryList()
  }


  getCategoryList() {
    fetch(`${process.env.PATH_URL}/category/categorys`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if(resp.response == 'ok'){
          this.setState({
            categoryArray : resp.data
          })
        }
        else{
          this.setState({
            err_in_fetch : true
          })
        }


      });
    });
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

  // choose_platform(e) {
  //   this.setState({
  //     choose_platform: e.target.value,
  //     err_message: false,
  //     success_message: false,
  //   });
  // }

  // handle_platform(e) {
  //   this.setState({
  //     handle_platform: e.target.value,
  //     err_message: false,
  //     success_message: false,
  //   });
  // }

  dob(e) {
    this.setState({
      dob: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  // gender(e) {
  //   const value = e.target.value;
  //   if (value == 1) {
  //     this.setState({
  //       gender: "male",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else if (value == 2) {
  //     this.setState({
  //       gender: "female",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else if (value == 3) {
  //     this.setState({
  //       gender: "other",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else {
  //     this.setState({
  //       gender: "",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   }
  // }

  // best_option_covers(e) {
  //   const value = e.target.value;
  //   if (value == 1) {
  //     this.setState({
  //       best_option_covers: "I understand the product. Let's get it rolling",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else if (value == 2) {
  //     this.setState({
  //       best_option_covers:
  //         "I do not understand the product. Make me understand now",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else if (value == 3) {
  //     this.setState({
  //       best_option_covers:
  //         "I do not understand the product. Make me understand now",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else {
  //     this.setState({
  //       best_option_covers: "",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   }
  // }

  // on_boarding_process(e) {
  //   const value = e.target.value;
  //   if (value == 1) {
  //     this.setState({
  //       on_boarding_process:
  //         "Complete the on-boarding process now in 3 simple steps",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else if (value == 2) {
  //     this.setState({
  //       on_boarding_process: "Complete the on-boarding process later",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   } else {
  //     this.setState({
  //       on_boarding_process: "",
  //       err_message: false,
  //       success_message: false,
  //     });
  //   }
  // }

  category(e) {
    const value = e.target.value;
    if (value == "" || value == undefined || value == null) {
      this.setState({
        category: "",
        err_message: false,
        success_message: false,
      });
    } else {
      this.setState({
        category: value,
        err_message: false,
        success_message: false,
      });
    }
  }

  social_platform(e) {
    const value = e.target.value;
    if (value == "" || value == undefined || value == null) {
      this.setState({
        social_platform: "",
        err_message: false,
        success_message: false,
      });
    } else {
      this.setState({
        social_platform: value,
        err_message: false,
        success_message: false,
      });
    }
  }

  social_platform_handle(e) {
    this.setState({
      social_platform_handle: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  total_followers(e) {
    this.setState({
      total_followers: e.target.value,
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
      // this.state.choose_platform !== "" &&
      // this.state.handle_platform !== "" &&
      this.state.dob !== "" &&
      // this.state.gender !== "" &&
      // this.state.best_option_covers !== "" &&
      // this.state.on_boarding_process !== "" &&
      // this.state.category !== "" &&
      this.state.social_platform !== "" &&
      this.state.social_platform_handle !== "" &&
      this.state.total_followers !== "" &&
      this.state.description !== ""
    ) {
      this.sumbit();
      this.setState({ loader: true });
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    const {
      name,
      email,
      phone,
      // choose_platform,
      // handle_platform,
      description,
      dob,
      // gender,
      // best_option_covers,
      // on_boarding_process,
      category,
      social_platform,
      social_platform_handle,
      total_followers,
    } = this.state;

    // fetch("https://cele-api.df.r.appspot.com/Add-celebrities", {
      fetch(`${process.env.PATH_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mail_to: "theartistnw@gmail.com",
        // mail_to: "virajmalhotraa@gmail.com",
        name: name,
        form_type: 1,
        email: email,
        // choose_platform: choose_platform,
        // handle_platform: handle_platform,
        phone: phone,
        social_platform_handle: social_platform_handle,
        // on_boarding_process: on_boarding_process,
        // gender: gender,
        category: category,
        total_followers: total_followers,
        social_platform: social_platform,
        // best_option_covers: best_option_covers,
        dob: dob,
        description: description,
        subject: "1 New Enquery [FORM 1].",
        site: "Cetus Academy",
      }),
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({
            err_message: false,
            success_message: "Your request of enrollment has been submitted.",
          });
          Router.push("/tutor-agreement");
        } else {
          this.setState({
            err_message: "Something wents wrong.",
          });
        }
      });
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>Enroll</title>
        </Head>


        <form className="form-signin" onSubmit={(e) => this.check(e)}>
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>
          <h1 className="h3 mb-3 font-weight-normal textCenter_">
            Please Enter Details
          </h1>

          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="name"
            onChange={(e) => this.name(e)}
            id="name"
            className="form-control"
            placeholder="Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="phone" className="sr-only">
            Phone
          </label>
          <input
            type="number"
            onChange={(e) => this.phone(e)}
            id="phone"
            className="form-control mt-3"
            placeholder="Phone"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => this.email(e)}
            id="email"
            className="form-control mt-3"
            placeholder="Email"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          {/* <label htmlFor="choose_platform" className="sr-only">
          Choose your Platform
        </label>
        <input
          type="name"
          onChange={(e) => this.choose_platform(e)}
          id="platform"
          className="form-control mt-3"
          placeholder="Choose your Platform"
          required=""
          autoFocus=""
          autoComplete="off"
        /> */}

          {/* <label htmlFor="handle_platform" className="sr-only">
          Your Platform Handle
        </label>
        <input
          type="name"
          onChange={(e) => this.handle_platform(e)}
          id="platform"
          className="form-control mt-3"
          placeholder="Your Platform Handle"
          required=""
          autoFocus=""
          autoComplete="off"
        /> */}

          <div className="dte_b mt-2">
            <p className="dte">Date of start</p>
            <input
              type="date"
              className="form-control"
              required=""
              autoFocus=""
              autoComplete="off"
              onChange={(e) => this.dob(e)}
            />
          </div>

          {/* <div className="dte_b" style={{ position: "relative" }}> */}
            {/* <p className="dte">Gender</p> */}
            {/* <select
              aria-label="Gender"
              name="Gender"
              title="gender"
              className="form-control mt-3 arrow "
              onChange={(e) => this.gender(e)}
              // style={{ padding: "13px" }}
            >
              <option value="" hidden>
                Gender
              </option>

              <option value="1">Male</option>

              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
            <label className="down-arrow"></label>
          </div> */}

          {/* <div className="dte_b mt-3">
            <select
              onChange={(e) => this.best_option_covers(e)}
              className="form-control  mt-1 arrow"
              id="Which_of_the_option"
            >
              <option value="" hidden>
                Which of the option best covers you?
              </option>

              <option value="1">
                I understand the product. Let's get it rolling
              </option>

              <option value="2">
                I do not understand the product. Make me understand now
              </option>

              <option value="3">
                I do not understand the product. Make me understand now
              </option>
            </select>
            <label className="down-arrow" htmlFor="Which_of_the_option"></label>
          </div> */}

          {/* <div className="dte_b mt-3" style={{ position: "relative" }}>
          <select
            onChange={(e) => this.on_boarding_process(e)}
            className="form-control mt-1 arrow"
            id="Select_an_Option"
          >
            <option value="0">Select an Option to complete the process?</option>
            <option value="1">
              Complete the on-boarding process now in 3 simple steps?
            </option>

            <option value="2">Complete the on-boarding process later</option>
          </select>
          <label className="down-arrow" htmlFor="Select_an_Option"></label>
        </div> */}

          <div className="dte_b mt-3" style={{ position: "relative" }}>
            <select
              onChange={(e) => this.category(e)}
              className="form-control mt-1 arrow"
              id="Which_category"
            >
              <option value="" hidden>
                Which category best describe you?
              </option>

              {this.state.categoryArray.map((item, i)=>(
                <option value={item._id}>{item.name}</option>
              ))}
             
            </select>
            <label className="down-arrow" htmlFor="Which_category"></label>
          </div>

          <div className="dte_b mt-3" style={{ position: "relative" }}>
            <select
              onChange={(e) => this.social_platform(e)}
              className="form-control gnd mt-1 arrow "
              id="where_do_you_live"
            >
              <option value="" hidden>
                Where do we find you ?
              </option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="Other">Other</option>
            </select>
            <label className="down-arrow" htmlFor="where_do_you_live"></label>
          </div>

          <div className="dte_b mt-2">
            <p className="dte mt-3">Your handle :</p>
            <input
              type="name"
              onChange={(e) => this.social_platform_handle(e)}
              id="platform"
              className="form-control"
              placeholder="@Username"
              required=""
              autoFocus=""
              autoComplete="off"
            />
          </div>

          <div className="dte_b mt-2">
            <p className="dte mt-3">How many followers do you have :</p>
            <input
              type="name"
              onChange={(e) => this.total_followers(e)}
              id="platform"
              className="form-control"
              placeholder="400k"
              required=""
              autoFocus=""
              autoComplete="off"
            />
          </div>

          <div className="dte_b mt-2">
            <p className="dte mt-3">Your Description</p>
            <textarea
              onChange={(e) => this.description(e)}
              className="form-control mhght"
            ></textarea>
            {/* <h6 className="cnt_ch">Character count: 0/5000</h6> */}
          </div>

          {this.state.err_message ? (
            <p className="err_message mt-2">{this.state.err_message}</p>
          ) : null}

          {this.state.success_message ? (
            <p className="success_message mt-2">{this.state.success_message}</p>
          ) : null}

          <input
            type="submit"
            className="mt-3 btn btn-lg btn-primary btn-block mg-0-at"
            value="Enroll"
          />

          <p className="mt-4 mb-3 text-muted textCenter_">© 2021</p>
        </form>

        <Footer />
      </>
    );
  }
}

export default Enroll;
