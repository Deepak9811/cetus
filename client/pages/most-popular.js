import React, { Component } from "react";
import Link from "next/link";
import Header from "./common/header";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

export class mostPopular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [],
      err_message: false,
      loader: true,
      headingEdit: false,
      page_title: "",
    };
  }

  page_title(e) {
    this.setState({ page_title: e.target.value });
    console.log(e.target.value);
  }

  componentDidMount() {
    this.getMostPopularList();
    this.getPage_title();
  }

  getPage_title() {
    fetch(`${process.env.PATH_URL}/id-page_title?_id=1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        console.log("Deepak", resp);
        if (resp.response == "ok") {
          this.setState({
            // loader: false,
            page_title: resp.data.page_title,
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

  check(e) {
    e.preventDefault();
    if (this.state.page_title !== "") {
      this.setState({ loader: true });
      this.page_titleUpdate();
    } else {
      this.setState({ err_message: "Please fill the fields." });
    }
  }

  page_titleUpdate(e) {
    fetch(`${process.env.PATH_URL}/page_title?_id=1`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        page_title: this.state.page_title,
      }),
    }).then((data) => {
      data.json().then((resp) => {
        console.log("updata", resp);
        if (resp.response == "ok") {
          alert("Updated");
          window.location.reload();
          // Router.push("/featured");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  getMostPopularList() {
    fetch(`${process.env.PATH_URL}/get-mostPopular-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok") {
          this.setState({
            loader: false,
            usersArray: resp.data,
          });
        } else {
          this.setState({
            err_message: "no data found",
            loader: false,
            usersArray: "no data",
          });
        }
      });
    });
  }

  deleteMostPopularId(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/mostPopularDelete?_id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok") {
          this.getMostPopularList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  headingEdit() {
    this.setState({
      headingEdit: true,
    });
  }

  closeheadingEdit() {
    this.setState({
      headingEdit: false,
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Most Popular</title>
        </Head>
        <Header />

        {this.state.headingEdit ? (
          <>
            <div
              className="vwnev"
              onClick={() => this.closeheadingEdit()}
            ></div>
            <div className="vwnev_d vwn_p_h">
              <div
                onClick={() => this.closeheadingEdit()}
                className="go_back_nav"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    fill="currentColor"
                    d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                  ></path>
                </svg>
              </div>

              <div className="ctg_in">
                <form
                  className="mg-5"
                  onSubmit={(e) => {
                    this.check(e);
                  }}
                >
                  <div className="wd-100 fl mg_b-3 txt-a-l fnt-s-2_5">
                    <span className="wd-50 fl">{this.state.page_title}</span>
                  </div>

                  <input
                    value={this.state.page_title}
                    onChange={(e) =>
                      this.setState({ page_title: e.target.value })
                    }
                    type="text"
                    id="title"
                    className="form-control mt-3 mg_b-5"
                    placeholder="Enter Heading"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />

                  {this.state.err_message ? (
                    <p className="err_message mt-2">{this.state.err_message}</p>
                  ) : null}

                  {!this.state.loader ? (
                    <input
                      type="submit"
                      className="mt-3 btn btn-lg btn-primary btn-block  dk_png9"
                      value="Update"
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
                </form>
              </div>
            </div>
          </>
        ) : null}

        <div className="mg_tp hgt_c">
          <Sidemenu />

          <div className="container-fluid">
            <main
              role="main"
              className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
            >
              <h2 className="wd-30 fl">{this.state.page_title}</h2>

              <div
                className="wd-5 fl txt-a ed_h mgt-1"
                onClick={() =>
                  this.setState({
                    headingEdit: true,
                  })
                }
              >
                <h6
                // onClick={()=>this.setState({headingEdit:true,
                //   page_title:item.page_title
                // })}
                >
                  Edit
                </h6>
              </div>

              {!this.state.loader ? (
                this.state.usersArray == "no data" ? (
                  <p className="loader_in_option">No data found </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th>Celebrity ID</th>
                          <th>Celebrity Name</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.usersArray.map((item, i) => (
                          <tr>
                            <td>{item._id}</td>
                            <td>{item.name}</td>

                            <td className="cele-btn">
                              <a
                                onClick={() =>
                                  this.deleteMostPopularId(item, i)
                                }
                              >
                                <span>Remove</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="loader_in_option fl">
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

export default mostPopular;
