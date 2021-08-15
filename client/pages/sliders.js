import React, { Component } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

export class Sliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banners: [],
      err_message: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.getBAnnersList();
  }

  getBAnnersList() {
    
    fetch(`${process.env.PATH_URL}/banners`, {
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
            banners: resp.data,
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

  deleteFeaturedId(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/banner?_id=${id}`, {
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
          alert("Deleted");

          this.getBAnnersList();
        //   window.location.reload();
          this.setState({
            loader:false
          })
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  submit(e) {
    e.preventDefault();

   

    const { image, title } = this.state;

    let formdata = new FormData();
    formdata.append("title", title);
    formdata.append("image", image);

    fetch(`${process.env.PATH_URL}/banner`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.data !== "") {
            
          this.setState({
            image: "",
            title: "",
            loader:false
          });
          alert("Category Added.");
          this.getBAnnersList();
        } else {
          alert("Please fill the Category");
          this.setState({
              loader:false
          })
        }
      });
    });
  }

  setImage(event) {
    let file = event.target.files[0];
    // console.log("setImage()", file);
    if (file !== null) {
      if (file.size < 200000) {
        this.setState({ image: file });
      } else {
        alert("Image should be less than 200KB");
      }
    }
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Sliders</title>
        </Head>

        <div className="mg_tp hgt_c">
          <Sidemenu />


          {!this.state.loader ? (

          <div className="container-fluid">
            <main
              role="main"
              className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
            >
              <h2 className="wd-20 fl">Sliders</h2>

              {/* ------------ADD-BANNERS-------------------------------------------------- */}

              <div className="ctg_in">
                <form onSubmit={(e) => this.submit(e)}>
                  <input
                    type="text"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    id="phone"
                    className="form-control mt-3 sz_inp"
                    placeholder="Enter title"
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />

                  <div className="dte_b mt-2">
                    {/* <p className="dte mt-3">Image</p> */}
                    <input
                      onChange={(event) => this.setImage(event)}
                      type="file"
                      id="platform"
                      className="form-control  mt-3 sz_inp"
                      placeholder="Text Message Price"
                      required=""
                      autoFocus="off"
                      autoComplete="off"
                    />
                  </div>

                  

                  {!this.state.loader ? (
                    <input
                      type="submit"
                      className="mt-3 btn btn-lg btn-primary btn-block sz_inp dk_png9"
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
                </form>
              </div>

              {/* ----------------------------------------------------------------------------- */}
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Sliders ID</th>
                        <th>Sliders Name</th>
                        <th>Sliders Title</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.banners.map((item, i) => (
                        <tr>
                          <td>{item._id}</td>
                          <td style={{ width: "10%" }}>
                            <img src={item.image.toString()} />
                          </td>
                          <td>{item.title}</td>

                          <td className="cele-btn">
                            <a onClick={() => this.deleteFeaturedId(item, i)}>
                              <span>Remove</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             
            </main>
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
        </div>

        <Footer />
      </Protected>
    );
  }
}

export default Sliders;
