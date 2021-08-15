import React, { PureComponent } from "react";
import Link from "next/link";

class Sidemenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toggleMenu: false,
      menuListArray: [],
    };
  }

  componentDidMount() {
    //page_title
    this.getSideMenuName(0);
  }

  getSideMenuName(value) {
    let i = value;
    if (i >= 6) return;
    fetch(`${process.env.PATH_URL}/id-page_title?_id=${value}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        this.setState({
          menuListArray: [...this.state.menuListArray, resp.data],
        });
        i++;
        this.getSideMenuName(i);
      });
    });
  }

  // toggleMenu() {
  //   let navigation = document.querySelector(".navigation");

  //   let toggle = document.querySelector(".toggle");

  //   navigation.classList.toggle("active");
  // }

  openMenu() {
    this.setState({
      openmenu: true,
      toggleMenu: false,
    });
  }

  closeMenu() {
    this.setState({
      mobileMenu: false,
    });
  }

  render() {
    return (
      <>
        {/* ************************************************************************************************************** */}
        <div
          className="navigation active"
          style={{ width: this.state.toggleMenu ? "200px" : "" }}
          onClick={() => this.openMenu()}
        >
          <ul>
            <li>
              <Link href="/add-course">
                <a>
                  <span className="icon">
                    <svg className="fa fa-home" viewBox="0 0 576 512">
                      <path
                        fill="currentColor"
                        d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Add Course</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/add-coupon">
                <a>
                  <span className="icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="plus-square"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="svg-inline--fa fa-plus-square fa-w-14 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
                        className=""
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Add Coupon</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/coupon">
                <a>
                  <span className="icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="plus-square"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="svg-inline--fa fa-plus-square fa-w-14 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
                        className=""
                      ></path>
                    </svg>
                  </span>
                  <span className="title">All Coupon</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/courses">
                <a href="#">
                  <span className="icon">
                    <svg className="fa fa-user" viewBox="0 0 640 512">
                      <path
                        fill="currentColor"
                        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Courses</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/orders">
                <a href="#">
                  <span className="icon">
                    <svg role="img" viewBox="0 0 576 512">
                      <path
                        fill="currentColor"
                        d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Orders</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/users">
                <a href="#">
                  <span className="icon">
                  <svg  viewBox="0 0 640 512">
                      <path
                        fill="currentColor"
                        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Users</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/edit-categories">
                <a href="#">
                  <span className="icon">
                    <svg className="fa fa-" viewBox="0 0 512 512">
                      <path
                        fill="currentColor"
                        d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Categories</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/edit-front">
                <a href="#">
                  <span className="icon">
                    <svg viewBox="0 0 576 512">
                      <path
                        fill="currentColor"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Edit Front</span>
                </a>
              </Link>
            </li>


            <li>
              <Link href="/sliders">
                <a href="#">
                  <span className="icon">
                    <svg viewBox="0 0 576 512">
                      <path
                        fill="currentColor"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                      ></path>
                    </svg>
                  </span>
                  <span className="title">Slider</span>
                </a>
              </Link>
            </li>

            {this.state.menuListArray.map((obj) => {
              return (
                <li>
                  <Link href={"/" + obj.link}>
                    <a href="#">
                      <span className="icon">
                        <svg className="fa fa-" viewBox="0 0 448 512">
                          <path
                            fill="currentColor"
                            d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                          ></path>
                        </svg>
                      </span>
                      <span className="title">{obj.page_title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="toggle"
          onClick={() => this.setState({ toggleMenu: !this.state.toggleMenu })}
        >
          {/* <span className="icon"> */}
          <svg className="fa sd_s" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
            ></path>
          </svg>

          {/* </span> */}
        </div>

        {/* ************************************************************************************************************** */}
      </>
    );
  }
}

export default Sidemenu;
