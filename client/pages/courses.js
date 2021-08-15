import React, { PureComponent } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Sidemenu from "./common/sidemenu";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";

class profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      celebrityArray: [],
      err_message: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.getCelebrityList();
  }

  getCelebrityList() {
    fetch(`${process.env.PATH_URL}/courses`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok" && resp.data[0]) {
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

  deleteCelebrityId(item, i) {
    var id = item._id;
    fetch(`${process.env.PATH_URL}/course?_id=${id}`, {
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
          this.getCelebrityList();
          alert("Deleted");
        } else {
          alert("Something went wrong");
        }
      });
    });
  }

  render() {
    return (
      <>
        <Protected>
          <Head>
            <title>courses</title>
          </Head>

          <div className="mg_tp hgt_c">
            <Sidemenu />

            <div className="container-fluid">
              <main
                role="main"
                className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
              >
                <h2>Courses</h2>

                {!this.state.loader ? (
                  this.state.celebrityArray == "no data" ? (
                    <p className="loader_in_option">No data found</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped table-sm">
                        <thead>
                          <tr>
                            <th scope="col">Course Id</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Feature 1</th>
                            <th scope="col">Feature 2</th>
                            <th scope="col">Feature 3</th>
                            {/* <th scope="col">DOM</th> */}
                            <th scope="col">Category</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Option</th>
                            <th scope="col">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.celebrityArray.map((item, i) => (
                            <tr>
                              <td scope="row">{item._id}</td>
                              <td>{item.name}</td>
                              <td>{item.Feature_1}</td>
                              <td>{item.Feature_2}</td>
                              <td>{item.Feature_3}</td>
                              {/* <td>{item.dob}</td> */}
                              <td>{item.where_do_we_find_you}</td>
                              <td>{item.phone}</td>
                              <td>{item.email}</td>

                              <td className="cele-btn">
                                <a
                                  onClick={() =>
                                    this.deleteCelebrityId(item, i)
                                  }
                                >
                                  <span>Remove</span>
                                </a>
                              </td>

                              <td className="cele-btn">
                                <Link href={`add-course?id=${item._id}`}>
                                  <a> <span>Edit</span></a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
            <Footer />
          </div>
        </Protected>
      </>
    );
  }
}

export default profile;
