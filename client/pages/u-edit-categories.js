import React, { PureComponent } from "react";
import Link from "next/link";
// import axios from "axios";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Router  from "next/router";

class AddCeleb extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      name: "",
      image: "",
    };
  }

  static async getInitialProps({ query }) {
    return { data: query };
  }

  componentDidMount() {
    if(this.props){
      if(this.props.data){
        if(this.props.data.id){
            this.getData(this.props.data.id)
        }
      }
    }
  }

  
  getData(id){
    this.setState({update_request : true})
    fetch(`${process.env.PATH_URL}/category/category?_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: 1,
      },
    }).then((result) => {
      result.json().then((res) => {
        if(res.data[0]){
            var item = res.data[0]
            this.setState({
              name: item.name,
              image: item.image,
            })
        }
      });
    });
  }

  setImage(event) {
    let file = event.target.files[0];
    if (file !== null) {
      if (file.size < 200000) {
        this.setState({ image: file });
      } else {
        alert("Image should be less than 200KB");
      }
    }
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.image !== ""
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
      image,
    } = this.state;
    let formdata = new FormData()
    formdata.append('name', name)

    if(this.state.image.lastModified){
      formdata.append('image', image)
    }

    else if(this.state.image[0]){
      if(this.state.image[0].imageSrc){
        formdata.append('image', this.state.image[0].imageSrc)
      }
      else{
        formdata.append('image', this.state.image[0])
      }
    }

    fetch(`${process.env.PATH_URL}/category/category?_id=${this.props.data.id}`, {
      method: this.state.update_request?'PUT':'POST',
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          alert("Category Updated.");
          Router.push("/edit-categories")
        } else {
          this.setState({
            err_message: "Something wents wrong",
            loader: false,
          });
        }
      });
    });
  }


  printImage(value){
    if(value[0]){
      if(value[0].imageSrc){
            return <img className="_print_image" src={value[0].imageSrc}/>
      }
      else{
            return <img className="_print_image" src={value[0]}/>
      }
    }
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Edit Categories</title>
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
                        Celebrities <span className="sr-only">(current)</span>
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

                <div className="dte_b mt-2">
                  <p className="dte mt-3">Image</p>
                  {this.printImage(this.state.image)}
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
                    value={this.state.update_request?'Update':'Add New'}
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
