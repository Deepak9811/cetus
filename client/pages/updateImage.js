import React, { PureComponent } from "react";
import Link from "next/link";
// import axios from "axios";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";

class AddCeleb extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      name: "",
      phone: "",
      email: "",
      dob: "",
      gender: "",
      category: "",
      category_id: "",
      where_do_we_find_you: "",
      followers: "",
      your_description: "Hi, I am new on Celebze.com - Book me now.",
      Feature_1: "",
      Feature_2: "",
      Feature_3: "",
      image: "",
      image_2: "",
      image_3: "",
      yt_url: "",
      custom_option_price: "",
      custom_option_name: "",
      categoryArray: [],
    };
  }

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList() {
    fetch(`${process.env.PATH_URL}/category/categorys`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          this.setState({
            categoryArray: resp.data,
          });
        } else {
          this.setState({
            err_in_fetch: true,
          });
        }
      });
    });
  }

  setImage(event) {
    let file = event.target.files[0];
    console.log("setImage()", file);
    if (file !== null) {
      if (file.size < 200000) {
        this.setState({ image: file });
      } else {
        alert("Image should be less than 200KB");
      }
    }
  }

  setImage2(event) {
    let file = event.target.files[0];
    console.log("setImage()", file);
    if (file !== null) {
      if (file.size < 200000) {
        this.setState({ image_2: file });
      } else {
        alert("Image should be less than 200KB");
      }
    }
  }

  setImage3(event) {
    let file = event.target.files[0];
    console.log("setImage()", file);
    if (file !== null) {
      if (file.size < 200000) {
        this.setState({ image_3: file });
      } else {
        alert("Image should be less than 200KB");
      }
    }
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.dob !== "" &&
      this.state.gender !== "" &&
      this.state.category !== "" &&
      this.state.category_id !== "" &&
      this.state.where_do_we_find_you !== "" &&
      this.state.followers !== "" &&
      this.state.Feature_1 !== "" &&
      this.state.Feature_2 !== "" &&
      this.state.Feature_3 !== "" &&
      this.state.image !== "" &&
      this.state.your_description !== ""
    ) {
      this.setState({ loader: true });
      this.sumbit();
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    const {
      name,
      phone,
      email,
      dob,
      gender,
      category,
      category_id,
      where_do_we_find_you,
      followers,
      Feature_1,
      Feature_2,
      Feature_3,
      image,
      image_2,
      image_3,
      yt_url,
      your_description,
      custom_option_name,
      custom_option_price,
    } = this.state;

    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("dob", dob);
    formdata.append("gender", gender);
    formdata.append("category", category);
    formdata.append("category_id", category_id);
    formdata.append("image", image);
    formdata.append("image_2", image_2 ? image_2 : null);
    formdata.append("image_3", image_3 ? image_3 : null);
    formdata.append("yt_url", yt_url ? yt_url : null);
    formdata.append("image_name", "image");
    formdata.append("where_do_we_find_you", where_do_we_find_you);
    formdata.append("your_description", your_description);
    formdata.append("Feature_1", Feature_1);
    formdata.append("Feature_2", Feature_2);
    formdata.append("Feature_3", Feature_3);
    formdata.append(
      "followers",
      followers
    );
    formdata.append(
      "custom_option_name",
      custom_option_name ? custom_option_name : null
    );
    formdata.append(
      "custom_option_price",
      custom_option_price ? custom_option_price : null
    );

    fetch(`${process.env.PATH_URL}/course`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok") {
          this.setState({
            loader: false,
            name: "",
            phone: "",
            email: "",          
            dob: "",
            gender: "",
            category: "",
            category_id: "",
            image: "",
            image_2: "",
            image_3: "",
            yt_url: "",
            where_do_we_find_you: "",
            followers: "",
            price: "",
            your_description: "",
            Feature_1: "",
            Feature_2: "",
            Feature_3: "",
          });
          alert("Celebrity Added.");
        } else {
          this.setState({
            err_message: "Something wents wrong",
            loader: false,
          });
        }
      });
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Add cource</title>
        </Head>

        <div className="container-fluid mg_tp">
          <div className="row">
            <nav
              style={{ paddingLeft: "0", paddingRight: "0" }}
              id="sidebarMenu"
              className="hide_on_ pd_l d-md-block bg-light sidebar show col-md-3 col-lg-2"
            >
              <div className="sidebar-sticky pt-3 sidenav">
                <ul className="nav flex-column ">
                  <li className="nav-item">
                    <Link href="add-course">
                      <a className="nav-link active collapsible">
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
                        Add Celebrity
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/courses">
                      <a className=" nav-link ">
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
                        cource <span className="sr-only">(current)</span>
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/orders">
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
                        Orders
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/users">
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
                        Users
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                      <Link href="/edit-categories">
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
                          Categories
                        </a>
                      </Link>
                    </li>

                  <li className="nav-item">
                    <Link href="/edit-front">
                      <a className="nav-link ">
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
                        Edit Front
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/featured">
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
                        Feaured
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/most-popular">
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
                        Most popular
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/bollywood">
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
                        Bollywood
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/tv-serial">
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
                        TV Serial
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/you-tuber">
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
                        You Tuber
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/social-media">
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
                        Social Media
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/report">
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
                        Report
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <form
                className="form-signin celeb_ad"
                onSubmit={(e) => this.check(e)}
                enctype="multipart/form-data"
                method="post"
              >
                <span className="logoText textCenter_ logo_styl">
                  <Link href="#">
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
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
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
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
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
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  id="email"
                  className="form-control mt-3"
                  placeholder="Email"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />

                <div className="dte_b mt-2">
                  <p className="dte">Date of birth</p>
                  <input
                    type="date"
                    value={this.state.dob}
                    className="form-control"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                    onChange={(e) => this.setState({ dob: e.target.value })}
                  />
                </div>

                <div className="dte_b" style={{ position: "relative" }}>
                  <select
                    value={this.state.gender}
                    aria-label="Gender"
                    name="Gender"
                    title="gender"
                    className="form-control mt-3 arrow "
                    onChange={(e) => this.setState({ gender: e.target.value })}
                  >
                    <option value="" hidden>
                      Gender
                    </option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="down-arrow"></label>
                </div>

                <div className="dte_b mt-3" style={{ position: "relative" }}>
                  <select
                    value={this.state.category_id}
                    onChange={(e) => {
                      var index = e.nativeEvent.target.selectedIndex;
                      var category_name = e.nativeEvent.target[index].text;
                      this.setState({
                        category_id: e.target.value,
                        category: category_name,
                      });
                    }}
                    className="form-control mt-1 arrow"
                    id="Which_category"
                  >
                    <option value="" hidden>
                      Category :
                    </option>
                    {this.state.categoryArray.map((item, i) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                  <label className="down-arrow" htmlFor="Which_category"></label>
                </div>

                <div className="dte_b mt-3" style={{ position: "relative" }}>
                  <select
                    value={this.state.where_do_we_find_you}
                    onChange={(e) =>
                      this.setState({ where_do_we_find_you: e.target.value })
                    }
                    className="form-control gnd mt-1 arrow "
                    id="where_do_you_live"
                  >
                    <option value="" hidden>
                      Social Media
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
                  <p className="dte mt-3">Total followers:</p>
                  <input
                    value={this.state.followers}
                    type="name"
                    onChange={(e) =>
                      this.setState({
                        followers: e.target.value,
                      })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="400k"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Youtube URL</p>
                  <input
                    value={this.state.yt_url}
                    type="name"
                    onChange={(e) =>
                      this.setState({
                        yt_url: e.target.value,
                      })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="Link"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Custom Option Name</p>
                  <input
                    value={this.state.custom_option_name}
                    type="name"
                    onChange={(e) =>
                      this.setState({
                        custom_option_name: e.target.value,
                      })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="Custom Option Name"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Custom Option Price</p>
                  <input
                    value={this.state.custom_option_price}
                    type="name"
                    onChange={(e) =>
                      this.setState({
                        custom_option_price: e.target.value,
                      })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="Custom Option Price"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Feature 2 Price</p>
                  <input
                    value={this.state.Feature_1}
                    type="text"
                    onChange={(e) =>
                      this.setState({ Feature_1: e.target.value })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="Feature 2 Price"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Video Message Price</p>
                  <input
                    value={this.state.Feature_2}
                    onChange={(e) =>
                      this.setState({ Feature_2: e.target.value })
                    }
                    type="text"
                    id="platform"
                    className="form-control"
                    placeholder="Video Message Price"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Text Message Price</p>
                  <input
                    value={this.state.Feature_3}
                    onChange={(e) =>
                      this.setState({ Feature_3: e.target.value })
                    }
                    type="text"
                    id="platform"
                    className="form-control"
                    placeholder="Text Message Price"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Image</p>

                  <input
                    onChange={(event) => this.setImage(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Text Message Price"
                    required=""
                    autoFocus="off"
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Image 2</p>

                  <input
                    onChange={(event) => this.setImage2(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Text Message Price"
                    required=""
                    autoFocus="off"
                    autoComplete="off"
                  />
                </div>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Image 3</p>

                  <input
                    onChange={(event) => this.setImage3(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Text Message Price"
                    required=""
                    autoFocus="off"
                    autoComplete="off"
                  />
                </div>

                <h5 className="rsltn">
                  Image should be less 200KB, Resolution 515 x 618
                </h5>

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Your Description</p>
                  <textarea
                    value={this.state.your_description}
                    onChange={(e) =>
                      this.setState({ your_description: e.target.value })
                    }
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

                {!this.state.loader ? (
                  <input
                    type="submit"
                    className="mt-3 btn btn-lg btn-primary btn-block"
                    value="Add"
                  />
                ) : (
                  <div className="loader_in_option2">
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={30}
                      width={50}
                    />
                  </div>
                )}

                <p className="mt-4 mb-3 text-muted textCenter_">© 2021</p>
              </form>

              {/* *************************************** */}
            </main>
          </div>
        </div>

        <Footer />
      </Protected>
    );
  }
}

export default AddCeleb;
