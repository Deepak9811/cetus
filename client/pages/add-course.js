import React, { PureComponent } from "react";
import Link from "next/link";
// import axios from "axios";
import Footer from "./common/footer";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Protected from "./widget/protected";
import Sidemenu from "./common/sidemenu";

class AddCourse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      name: "",
      phone: "",
      email: "",
      dob: "",
      // gender: "",
      category: "",
      category_id: "",
      where_do_we_find_you: "",
      followers: "",
      your_description: "",
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

  static async getInitialProps({ query }) {
    return { data: query };
  }

  componentDidMount() {
    this.getCategoryList();
    if(this.props){
      if(this.props.data){
        if(this.props.data.id){
            this.getCelebrityData(this.props.data.id)
        }
      }
    }
  }

  
  getCelebrityData(id){
    this.setState({update_request : true})
    fetch(`${process.env.PATH_URL}/course?_id=${id}`, {
      method: "Get",
      headers: {
        Authorization: 1,
      },
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        if(res.data[0]){
            var item = res.data[0]
            this.setState({
              category : item.category,
              name: item.name,
              phone: item.phone,
              email: item.email,
              dob: item.dob,
              // gender: item.gender,
              category: item.category,
              category_id: item.category_id,
              where_do_we_find_you: item.where_do_we_find_you,
              followers: item.followers,
              your_description: item.your_description,
              Feature_1: item.Feature_1,
              Feature_2: item.Feature_2,
              Feature_3: item.Feature_3,
              image: item.image,
              image_2: item.image_2,
              image_3: item.image_3,
              yt_url:item.yt_url,
              custom_option_price : item.custom_option_price,
              custom_option_name :item.custom_option_name,
            })
        }
      });
    });
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
      // this.state.gender !== "" &&
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
      // gender,
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
    let formdata = new FormData()
    formdata.append('name', name)
    formdata.append('phone', phone)
    formdata.append('email', email)
    formdata.append('dob', dob)
    // formdata.append('gender', gender)
    formdata.append('category', category)
    formdata.append('category_id', category_id)
    if(image && !image[0]) formdata.append('image', image && image[0] ?JSON.stringify(image): image)
    if(image_2 && !image_2[0]) formdata.append('image_2', image_2 && image_2[0] ?JSON.stringify(image_2): image_2)
    if(image_3 && !image_3[0]) formdata.append('image_3', image_3 && image_3[0] ?JSON.stringify(image_3): image_3)
    formdata.append('yt_url', yt_url?yt_url:null)
    formdata.append('image_name', 'image')
    formdata.append('where_do_we_find_you', where_do_we_find_you)
    formdata.append('your_description', your_description)
    formdata.append('Feature_1', Feature_1)
    formdata.append('Feature_2', Feature_2)
    formdata.append('Feature_3', Feature_3)
    formdata.append('followers', followers)
    formdata.append('custom_option_name', custom_option_name?custom_option_name:null)
    formdata.append('custom_option_price', custom_option_price?custom_option_price:null)


    var f_url;
    if(this.state.update_request){
      var f_url = `course?_id=${this.props.data.id}`
    }

    else {
      var f_url = `course`
    }
    fetch(`${process.env.PATH_URL}/${f_url}`, {
      method: this.state.update_request?'PUT':'POST',
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
            // gender: "",
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


  printImage(value){
    // console.log("valuye hai", value[0])
    if(value[0]){
        if(value[0].imageSrc){
            return <img className="_print_image" src={value[0].imageSrc}/>
        }
    }
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Add course</title>
        </Head>

        <div className="container-fluid mg_tp">
          <div className="row">
            
            <Sidemenu/>

            <main role="main" className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c">
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
                 Course Name
                </label>
                <input
                  type="name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  id="name"
                  className="form-control mt-3"
                  placeholder="Course Name"
                  required=""
                  autoFocus=""
                  autoComplete="on"
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
                  autoComplete="on"
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
                  autoComplete="on"
                />

                <div className="mt-2">
                  <p className="dte">Date of Start</p>
                  <input
                    type="date"
                    value={this.state.dob}
                    className="form-control"
                    required=""
                    autoFocus=""
                    autoComplete="on"
                    onChange={(e) => this.setState({ dob: e.target.value })}
                  />
                </div>

               

                <div className="dte_b mt-3" >
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
                    className="form-control mt-1 arrow wd-100-i"
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

                <div className="dte_b mt-3" >
                  <select
                    value={this.state.where_do_we_find_you}
                    onChange={(e) =>
                      this.setState({ where_do_we_find_you: e.target.value })
                    }
                    className="form-control gnd mt-1 arrow wd-100-i"
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

                <div className="mt-2">
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
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
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
                    autoComplete="on"
                  />
                </div>

                

                <div className="mt-2">
                  <p className="dte mt-3">Feature 1</p>
                  <input
                    value={this.state.Feature_1}
                    type="text"
                    onChange={(e) =>
                      this.setState({ Feature_1: e.target.value })
                    }
                    id="platform"
                    className="form-control"
                    placeholder="Feature 1"
                    required=""
                    autoFocus=""
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Feature 2</p>
                  <input
                    value={this.state.Feature_2}
                    onChange={(e) =>
                      this.setState({ Feature_2: e.target.value })
                    }
                    type="text"
                    id="platform"
                    className="form-control"
                    placeholder="Feature 2"
                    required=""
                    autoFocus=""
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Feature 3</p>
                  <input
                    value={this.state.Feature_3}
                    onChange={(e) =>
                      this.setState({ Feature_3: e.target.value })
                    }
                    type="text"
                    id="platform"
                    className="form-control"
                    placeholder=""
                    required="Feature 3"
                    autoFocus=""
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Course Image 1</p>
                  {this.printImage(this.state.image)}
                  <input
                    onChange={(event) => this.setImage(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Course Image 1"
                    required=""
                    autoFocus="off"
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Course Image 2</p>
                  {this.printImage(this.state.image_2)}
                  <input
                    onChange={(event) => this.setImage2(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Course Image 2"
                    required=""
                    autoFocus="off"
                    autoComplete="on"
                  />
                </div>

                <div className="mt-2">
                  <p className="dte mt-3">Course Image 3</p>
                 
                  {this.printImage(this.state.image_3)}
                 
                  <input
                    onChange={(event) => this.setImage3(event)}
                    type="file"
                    id="platform"
                    className="form-control"
                    placeholder="Course Image 3"
                    required=""
                    autoFocus="off"
                    autoComplete="on"
                  />
                </div>

                <h5 className="rsltn">
                  Image should be less 200KB, Resolution 515 x 618
                </h5>

                <div className="mt-2">
                  <p className="dte mt-3">Your Description</p>
                  <textarea
                    value={this.state.your_description}
                    onChange={(e) =>
                      this.setState({ your_description: e.target.value })
                    }
                    className="form-control mhght"
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
                    className="mt-3 btn btn-lg btn-primary btn-block mg-0-at"
                    value={this.state.update_request?'Update':'Add New Course'}
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

export default AddCourse;
