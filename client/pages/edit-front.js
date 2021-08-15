import React, { PureComponent } from "react";
import Link from "next/link";
// import axios from "axios";
import Header from "./common/header";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

class EditFront extends PureComponent {
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
      where_do_we_find_you: "",
      how_many_followers_do_you_have: "",
      your_description: "",
      video_call_price: "",
      video_message_price: "",
      text_price: "",
      image: "",
      menuListArray: [],
      urlArray: [
        "Add-featured-form-data",
        "Add-mostPopular-form-data",
        "Add-bollywood-form-data",
        "Add-tvSerial-form-data",
        "Add-youTube-form-data",
        "Add-socialMedia-form-data",
      ],
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

  setImage(event) {
    let file = event.target.files[0];

    if (file) {
      if (file !== null || file !== undefined) {
        if (file.size < 200000) {
          this.setState({ image: file });
        } else {
          alert("Image should be less than 200KB");
        }
      }
    }
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.celebrity_id !== "" &&
      this.state.celebrity_name !== "" &&
      this.state.image !== "" &&
      this.state.category !== ""
    ) {
      this.setState({ loader: true });
      this.sumbit();
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    const { celebrity_id, celebrity_name, image, category } = this.state;

    let formdata = new FormData();
    formdata.append("celebrity_id", celebrity_id);
    formdata.append("name", celebrity_name);
    formdata.append("image", image);
    let url;

    this.state.menuListArray.map((obj, i) => {
      if (category == obj.page_title) {
        url = this.state.urlArray[i];
      }
    });
    var location = `${process.env.PATH_URL}/`;
    fetch(`${location}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formdata,
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          if (resp.data == "") {
            alert("Something went wrong.");
            this.setState({ loader: false });
          } else {
            alert(`${this.state.category}` + " " + "Updated");
            this.setState({
              loader: false,
              celebrity_id: "",
              celebrity_name: "",
              image: "",
              category: "",
            });
          }
        } else {
          alert("Something went wrong");
          this.setState({ loader: false });
        }
      });
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Edit Front</title>
        </Head>
        <div className="mg_tp hgt_c">
          <Sidemenu />

          <div className="container-fluid">
            <main
              role="main"
              className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
            >
              <form
                class="form-signin celeb_ad"
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
                <h1 class="h3 mb-3 font-weight-normal textCenter_">
                  Edit Front
                </h1>

                <label for="name" class="sr-only">
                  Course ID
                </label>
                <input
                  type="number"
                  value={this.state.celebrity_id}
                  onChange={(e) =>
                    this.setState({ celebrity_id: e.target.value })
                  }
                  id="name"
                  class="form-control"
                  placeholder="Course ID"
                  required=""
                  autofocus=""
                  autocomplete="on"
                />

                <label for="name" class="sr-only">
                  Course Name
                </label>
                <input
                  type="name"
                  value={this.state.celebrity_name}
                  onChange={(e) =>
                    this.setState({ celebrity_name: e.target.value })
                  }
                  id="name"
                  class="form-control"
                  placeholder="Course Name"
                  required=""
                  autofocus=""
                  autocomplete="on"
                />

                <div className="dte_b mt-3" style={{ position: "relative" }}>
                <select
                    value={this.state.category}
                    onChange={(e) =>
                      this.setState({ category: e.target.value })
                    }
                    className="form-control mt-1 arrow"
                    id="Which_category"
                  >
                    <option value="" hidden>
                      Category :
                    </option>
                    {this.state.menuListArray.map((obj) => {
                      return (
                        <option value={obj.page_title}>{obj.page_title}</option>
                      );
                    })}
                  </select>
                  <label className="down-arrow" for="Which_category"></label>
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Image</p>

                  <input
                    onChange={(event) => this.setImage(event)}
                    type="file"
                    id="platform"
                    class="form-control"
                    placeholder=""
                    required=""
                    autofocus="off"
                    autocomplete="on"
                    accept="image/*"
                  />
                </div>
                <h5 className="rsltn">
                  Image should be less 200KB, Resolution 515 x 618
                </h5>

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
                    class="mt-3 btn btn-lg btn-primary btn-block mg-0-at mg_b-0 mgt-5"
                    value="Add"
                  />
                ) : (
                  <div className="loader_in_option2">
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={30}
                      width={50}
                      // timeout={3000}
                    />
                  </div>
                )}

                <p class="mt-4 mb-3 text-muted textCenter_">© 2021</p>
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

export default EditFront;
