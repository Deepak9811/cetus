import React, { PureComponent } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

class EditCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      loader: true,
      err_message: false,
    };
  }

  componentDidMount() {
    this.getCelebrityList();
  }

  getCelebrityList() {
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
            loader: false,
            celebrityArray: resp.data,
          });
        } else {
          this.setState({
            err_message: true,
            loader: false,
            celebrityArray: "no data",
          });
        }
      });
    });
  }

  deleteCetegoryId(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/category/category?_id=${id}`, {
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
          this.getCelebrityList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
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

  submit(e) {
    e.preventDefault();

    const { image, name } = this.state;

    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);

    fetch(`${process.env.PATH_URL}/category/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.data !== "") {
          alert("Category Added.");
          this.getCelebrityList();
          this.setState({
            image: "",
            name: "",
          });
        } else {
          alert("Please fill the Category");
        }
      });
    });
  }

  updateStatusValue(_id, value) {
    fetch(`${process.env.PATH_URL}/category/categorieUpdateUpdate?_id=${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Category_status: value,
      }),
    }).then((data) => {
      data.json().then((resp) => {
        alert("Category Updated");
        window.location.reload();
      });
    });
  }

  updateCategory(e, _id) {
    e.preventDefault();

    const { image, name } = this.state;

    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);

    fetch(`${process.env.PATH_URL}/category/category?_id=${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        // console.log(resp);
        if (resp.data !== "") {
          alert("Category Added.");
          this.getCelebrityList();
          this.setState({
            image: "",
            name: "",
          });
        } else {
          alert("Please fill the Category");
        }
      });
    });
  }

  render() {
    return (
      <>
        <Protected>
          <Head>
            <title>Edit Categories</title>
          </Head>

          <div className="mg_tp hgt_c">
            <Sidemenu />

            <div className="container-fluid">
              <main
                role="main"
                className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
              >
                <h2>All Categories</h2>

                <div className="ctg_in">
                  <form onSubmit={(e) => this.submit(e)}>
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      id="phone"
                      className="form-control mt-3 sz_inp"
                      placeholder="Enter Category"
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

                    <input
                      type="submit"
                      className="mt-3 btn btn-lg btn-primary btn-block sz_inp dk_png9"
                      value="Add"
                    />
                  </form>
                </div>

                {/* *************************************UPDATE-CATEGORIES******************************************************* */}

                {/* ************************************************************************************************************** */}

                {!this.state.loader ? (
                  this.state.celebrityArray == "no data" ? (
                    <p className ="loader_in_option">No data found</p>
                  ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped table-sm">
                        <thead>
                          <tr>
                            <th>Category Id</th>
                            <th>Category's Name</th>
                            <th>Show</th>
                            <th>Option</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.celebrityArray.map((item, i) => (
                            <tr>
                              <td>{item._id}</td>
                              <td>{item.name}</td>
                              <td>
                                <select
                                  className="slct"
                                  name="Status"
                                  id="cars"
                                  value={item.Category_status}
                                  onChange={(e) =>
                                    this.updateStatusValue(
                                      item._id,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="1">True</option>
                                  <option value="2">False</option>
                                </select>
                              </td>

                              <td className="cele-btn">
                                <a
                                  onClick={() => this.deleteCetegoryId(item, i)}
                                >
                                  <span>Remove</span>
                                </a>
                              </td>

                              <td className="cele-btn">
                                <Link href={`u-edit-categories?id=${item._id}`}>
                                  <a>
                                    <span>Edit</span>{" "}
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
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
        </Protected>
        <Footer />
      </>
    );
  }
}

export default EditCategories;
