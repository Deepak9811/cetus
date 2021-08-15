import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import Input from "./input";

import invoke from "react-native-webview-invoke/browser";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      admin: false,
      panel: false,
      categoryArray: [],
      celebrityNameArray: [],
      mobileMenu: false,
      searchMenu: false,
      headingEdit: false,
      mobile: false,
    };
  }

  isMobileApp = invoke.bind("isMobileApp");
  async componentDidMount() {
    this.Credentials();
    this.getCategoryList();

    this.isMobileApp().then((value) => {
      if (value) this.setState({ mobile: true });
      else this.setState({ mobile: false });
    });
  }

  // componentDidMount() {
  //   this.Credentials();
  //   this.getCategoryList();

  //   // if (this.detectMob() && navigator.appCodeName!=="Mozilla") this.setState({ mobile: false });
  //   // else this.setState({ mobile: true });

  //   this.isMobileApp().then((value) => {
  //     if (value) this.setState({ mobile: true });
  //     else this.setState({ mobile: false });
  //   });
  // }

  logoutUser() {
    localStorage.removeItem("user_info");
    localStorage.clear();
    // Router.push("/login");
    window.location.href = "/";
  }

  Credentials() {
    var currentRoute = Router.pathname;
    var adminStatus = localStorage.getItem("admin");
    var userStatus = localStorage.getItem("user_info");
    var user_name = localStorage.getItem("user_name");
    this.setState({ user_name: user_name });
    //Setting up admin status
    if (adminStatus) {
      this.setState({ admin: true });
    } else {
      this.setState({ admin: false });
    }

    //Setting up user status
    if (userStatus) {
      this.setState({ user: true });
    } else {
      this.setState({ user: false });
    }

    //Admin awake hide login button.
    if (
      currentRoute == "/orders" ||
      currentRoute == "/courses" ||
      currentRoute == "/add-course" ||
      currentRoute == "/add-course" ||
      currentRoute == "/users" ||
      currentRoute == "/edit-front" ||
      currentRoute == "/featured" ||
      currentRoute == "/tv-serial" ||
      currentRoute == "/social-media" ||
      currentRoute == "/most-popular" ||
      currentRoute == "/bollywood" ||
      currentRoute == "/you-tuber"
    ) {
      this.setState({ panel: true });
    } else {
      this.setState({ panel: false });
    }
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

  showbox(e, onFocus) {
    if (onFocus) e.target.nextSibling.classList.add("show");
    else
      setTimeout(() => {
        e.target.nextSibling.classList.remove("show");
      }, 200);
  }

  setValue(value) {
    alert(value);
  }

  SearchCheck(e) {
    e.preventDefault();
  }

  logoutAdmin() {
    this.setState({ admin: false });
    localStorage.removeItem("admin");
    localStorage.clear();

    Router.push("/");
  }

  headingEdit() {
    this.setState({
      headingEdit: true,
    });
  }

  openSearchMenu() {
    this.setState({
      searchMenu: true,
    });
  }

  closSearchMenu() {
    this.setState({
      searchMenu: false,
    });
  }

  openMobileMenu() {
    this.setState({
      mobileMenu: true,
    });
  }

  closeMobileMenu() {
    this.setState({
      mobileMenu: false,
    });
  }

  writeName() {
    if (this.state.user_name) {
      var name = this.state.user_name;
      var d_name = name.replace('"', " ");
      var f_name = d_name.replace('"', " ");
      return f_name;
    }
  }

  // detectMob(agent = null) {
  //   let ag;
  //   if (agent) ag = agent;
  //   else ag = navigator.userAgent;
  //   const toMatch = [
  //     /Android/i,
  //     /webOS/i,
  //     /iPhone/i,
  //     /iPad/i,
  //     /iPod/i,
  //     /BlackBerry/i,
  //     /Windows Phone/i,
  //   ];

  //   return toMatch.some((toMatchItem) => {
  //     return ag.match(toMatchItem);
  //   });
  // }

  render() {
    return (
      <>
        {this.state.mobileMenu ? (
          <div className="overlay_mobile">
            <div className="close_btn">
              <span className="close_menu">Menu</span>

              <div onClick={() => this.closeMobileMenu()}>
                <svg
                  className="go_back_nav"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                  ></path>
                </svg>
              </div>
            </div>
            <ul>
              <li>
                <Link href="/how-it-works">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">How It Works</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/history">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">Find Your Booking</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">About us</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/polices">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">Privacy policy</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">Contact us</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/term">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">Terms of use</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/faq">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl"> FAQ's</span>
                    </div>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/brand-queries">
                  <a onClick={() => this.closeMobileMenu()}>
                    <div className="core_nv">
                      <span className="dk_cl">Brand Queries</span>
                    </div>
                  </a>
                </Link>
              </li>

              {this.state.user ? (
                <>
                  <li>
                    <Link href="/profile">
                      <a onClick={() => this.closeMobileMenu()}>
                        <div className="core_nv">
                          <span className="dk_cl">{this.writeName()}</span>
                        </div>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <div className="core_nv">
                      <Link href="/login">
                        <a onClick={() => this.logoutUser()}>
                          <span className="dk_cl">Logout</span>
                        </a>
                      </Link>
                    </div>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">
                    <a onClick={() => this.closeMobileMenu()}>
                      <div className="core_nv">
                        <span className="dk_cl">Log In</span>
                      </div>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ) : null}

        {this.state.searchMenu ? (
          <div className="overlay_mobile">
            <div className="close_btn">
              <span className="close_menu">Search</span>

              <div onClick={() => this.closSearchMenu()}>
                <svg
                  className="go_back_nav"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="dk-se-m">
              <Input
                listArray={this.state.celebrityNameArray.map((object) => {
                  object.showItem = object.name;
                  return object;
                })}
                onSelectInput={(object) => {
                  this.setState({
                    name: object.showItem,
                  });
                }}
              />
            </div>
          </div>
        ) : null}

        {/*-----------------main Header---------------------------------------------------- */}

        <header id="header">
          {this.state.admin ? (
            <div className="admin-bar">
              <p className="adp_text">
                You are loggedin as admin. Click to {"  "}
                <span className="under_8" onClick={() => this.logoutAdmin()}>
                  Logout
                </span>
              </p>
            </div>
          ) : null}
          <div className="container">
            <div className="header-wrapper">
              <Link href="/">
                <a
                  className="logo szg cur-pointer"
                  //  style={{ color: "#56288b" }}
                >
                  <img src="/image/clbze_logo.png" />
                </a>
              </Link>

              <div className="srch_c dropdown hide_on_">
                <Input
                  listArray={this.state.celebrityNameArray.map((object) => {
                    object.showItem = object.name;
                    return object;
                  })}
                  onSelectInput={(object) => {
                    this.setState({
                      name: object.showItem,
                    });
                  }}
                />
              </div>

              <div className="header-right">
                <ul>
                  <>
                    <li
                      className="dis_block show_on_ mg-i-0"
                      onClick={() => this.openSearchMenu()}
                    >
                      <span className="sign-in-btn  popup-btn wd-i-100 mg-i-a">
                        <span className="nav_menu wdp-i-20 clsea">
                          <svg viewBox="0 0 512 512">
                            <path
                              fill="currentColor"
                              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                            ></path>
                          </svg>
                        </span>
                      </span>
                    </li>

                    {this.state.mobile ? (
                      <></>
                    ) : (
                      <li className="left_on_ ">
                        <div className="dropdown">
                          <span className="dropbtn">
                            <Link href="/">
                              <a className="categories-link ctg">Home</a>
                            </Link>
                          </span>
                        </div>
                      </li>
                    )}

                    {this.state.mobile ? (
                      <></>
                    ) : (
                      <li className="left_on_  mg-r-0 mdc">
                        <div className="dropdown">
                          <span className="dropbtn">
                            <Link href="/categories">
                              <a className="categories-link ctg wd-90">
                                Categories
                              </a>
                            </Link>
                          </span>

                          <div className="dropdown-content hide_on_">
                            {this.state.categoryArray !== ""
                              ? this.state.categoryArray.map((item, i) =>
                                  item.Category_status == 1 ? (
                                    <Link
                                      href={`/view_category?id=${item._id}`}
                                    >
                                      <span>{item.name}</span>
                                    </Link>
                                  ) : null
                                )
                              : null}
                          </div>
                        </div>
                      </li>
                    )}

                    <li className="hide_on_" id="overlay" onClick="off()">
                      <Link href="/how-it-works">
                        <a className="sign-in-btn popup-btn">
                          <span className="nav-text" id="text">
                            How It Works
                          </span>
                        </a>
                      </Link>
                    </li>

                    {!this.state.panel ? (
                      !this.state.user ? (
                        <li className="hide_on_" id="overlay" onClick="off()">
                          <Link href="/login">
                            <a className="sign-in-btn  popup-btn">
                              <span className="nav-text w100" id="text">
                                Log In
                              </span>
                            </a>
                          </Link>
                        </li>
                      ) : null
                    ) : null}

                    {this.state.user ? (
                      <li className="hide_on_" id="overlay">
                        <span
                        // onClick={()=> this.logoutUser()}
                        >
                          <div className="dropdown">
                            <span className="dropbtn">
                              <span
                                className="categories-link ctg"
                                style={{ maxwith: "200px" }}
                              >
                                {this.writeName()}
                              </span>
                            </span>

                            <div className="dropdown-content ovr_flw content-x-1">
                              <div
                                className="hide_on_"
                                id="overlay"
                                onClick="off()"
                              >
                                <Link href="/profile">
                                  <a className="sign-in-btn  popup-btn">
                                    <span className="w100" id="text">
                                      Profile
                                    </span>
                                  </a>
                                </Link>
                              </div>

                              {!this.state.panel ? (
                                !this.state.user ? (
                                  <div
                                    className="hide_on_"
                                    id="overlay"
                                    onClick="off()"
                                  >
                                    <Link href="/login">
                                      <a className="sign-in-btn  popup-btn">
                                        <span
                                          className="nav-text w100"
                                          id="text"
                                        >
                                          Log In
                                        </span>
                                      </a>
                                    </Link>
                                  </div>
                                ) : null
                              ) : null}

                              {this.state.user ? (
                                <div className="hide_on_" id="overlay">
                                  <a
                                    onClick={() => this.logoutUser()}
                                    className="sign-in-btn  popup-btn"
                                  >
                                    <span className="w100" id="text">
                                      Logout
                                    </span>
                                  </a>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </span>
                      </li>
                    ) : null}

                    <li
                      className="dis_block show_on_ wd-i-20 mg-i-0 fr-i"
                      onClick={() => this.openMobileMenu()}
                    >
                      <span className="sign-in-btn  popup-btn wd-i-100 fr-i ">
                        <span className="nav_menu wdp-i-20">
                          <svg role="img" viewBox="0 0 448 512">
                            <path
                              fill="currentColor"
                              d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                            ></path>
                          </svg>
                        </span>
                      </span>
                    </li>
                  </>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
