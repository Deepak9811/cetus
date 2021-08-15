import React, { PureComponent } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./common/footer";

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      choose_platform: "",
      handle_platform: "",
      err_message: false,
      success_message: false,
    };
  }

  name(e) {
    this.setState({
      name: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  phone(e) {
    this.setState({
      phone: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  email(e) {
    this.setState({
      email: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  choose_platform(e) {
    this.setState({
      choose_platform: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  handle_platform(e) {
    this.setState({
      handle_platform: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.choose_platform !== "" &&
      this.state.handle_platform !== ""
    ) {
      this.sumbit();
      this.setState({ loader: true });
    } else {
      this.setState({ err_message: "Please enter the form correctly." });
    }
  }

  sumbit() {
    const { name, email, phone, choose_platform, handle_platform } = this.state;

    fetch("https://node-api-08.el.r.appspot.com/contact", {
      // fetch('https://cele-api.df.r.appspot.com/contact', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // mail_to:'VirajMalhotraa@gmail.com',
        mail_to: "celebze.official@gmail.com",
        name: name,
        email: email,
        choose_platform: choose_platform,
        handle_platform: handle_platform,
        phone: phone,
        subject: "1 New Enquery.",
        site: "Celebze",
      }),
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response === "ok") {
          this.setState({
            err_message: false,
            success_message: "Your request of enrollment has been submitted.",
          });
        } else {
          this.setState({
            err_message: "Something wents wrong.",
          });
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Form </title>
        </Head>


        <form className="form-signin" onSubmit={(e) => this.check(e)}>
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
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
            onChange={(e) => this.name(e)}
            id="name"
            className="form-control"
            placeholder="Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="phone" className="sr-only">
            S/o /W/o
          </label>
          <input
            type="number"
            onChange={(e) => this.phone(e)}
            id="S/o /W/o"
            className="form-control mt-3"
            placeholder="S/o /W/o"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="phone" className="sr-only">
            Screen Name
          </label>
          <input
            type="Name"
            onChange={(e) => this.phone(e)}
            id="phone"
            className="form-control mt-3"
            placeholder=" Screen Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="email" className="sr-only">
            Profession
          </label>
          <input
            type="email"
            onChange={(e) => this.email(e)}
            id="email"
            className="form-control mt-3"
            placeholder=" Profession"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="choose_platform" className="sr-only">
            Resident of
          </label>
          <input
            type="name"
            onChange={(e) => this.choose_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Resident of"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Permanent address
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Permanent address"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Mobile/Cellular No.
          </label>
          <input
            type="number"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Mobile/Cellular No."
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Website(if any)
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Website(if any)"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Any other social media platforms
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Any other social media platforms"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Latest's Photographs (Minimum 4)Upload/Link/Email)
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Latest's Photographs (Minimum 4)Upload/Link/Email)"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Email
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Email"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Bank Detail
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Bank Detail"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Bank Branch address
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Bank Branch Address"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Account Holder Name
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Account Holder Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Account No
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Account No"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            IFCS*
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="IFCS*"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Bank Swift
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Bank Swift"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Aadhar*
          </label>
          <input
            type="number"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Aadhar*"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            PAN*
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="Bank Swift"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            GST Details(if Any):
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="GST Details(if Any):"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            Name of Company:
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder=" Name of Company:"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            GSTIN Registeration No.
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="GSTIN Registeration No."
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="handle_platform" className="sr-only">
            State
          </label>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control mt-3"
            placeholder="State"
            required=""
            autoFocus=""
            autoComplete="off"
          />
          {/* 
        <div classNameName="dte_b mt-2">
          <p classNameName="dte">Date of birth</p>
          <input
            type="date"
            className="form-control"
            required=""
            autoFocus=""
            autoComplete="off"
          />
        </div> */}

          {/* <div classNameName="dte_b" style={{ position: "relative" }}>
          <p classNameName="dte">Gender</p>
          <select
            aria-label="Gender"
            name="Gender"
            title="gender"
            classNameName="form-control mt-3 arrow "
            style={{ padding: "13px" }}
          >
            <option value="0" hidden>
              Gender
            </option>

            <option value="1">Male</option>

            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
          <label classNameName="down-arrow"></label>
        </div>

        <div classNameName="dte_b mt-3">
          <select classNameName="form-control  mt-1 arrow" id="Which_of_the_option">
            <option value="0" hidden>
              Which of the option best covers you?
            </option>
            <option value="1">
              I understand the product. Let's get it rolling
            </option>
            <option value="2">
              I do not understand the product. Make me understand now
            </option>
            <option value="3">
              I do not understand the product. Make me understand now
            </option>
          </select>
          <label classNameName="down-arrow" htmlFor="Which_of_the_option"></label>
        </div>

        <div classNameName="dte_b mt-3" style={{ position: "relative" }}>
          <select classNameName="form-control mt-1 arrow" id="Select_an_Option">
            <option value="0" hidden>
              Select an Option to complete the process?
            </option>
            <option value="1">
              Complete the on-boarding process now in 3 simple steps?
            </option>

            <option value="2">Complete the on-boarding process later</option>
          </select>
          <label classNameName="down-arrow" htmlFor="Select_an_Option"></label>
        </div> */}

          {/* <div classNameName="dte_b mt-3" style={{ position: "relative" }}>
          <select classNameName="form-control mt-1 arrow" id="Which_category">
            <option value="0" hidden>
              Which category best describe you?
            </option>
            <option value="1">VJ</option>
            <option value="2">Content Creator</option>
            <option value="3">Commentator</option>
            <option value="4">Spirituality</option>
            <option value="5">Product</option>
            <option value="6">DJ</option>
            <option value="7">Author</option>
            <option value="8">Comedian</option>
            <option value="9">Magician</option>
            <option value="10">Rapper</option>
            <option value="11">Choregrapher</option>
            <option value="12">Fashion Designer</option>
            <option value="13">Public Figure</option>
            <option value="14">RJ</option>
            <option value="15">Writer</option>
            <option value="16">Director</option>
            <option value="17">Music Composer</option>
            <option value="18">Speaker</option>
            <option value="19">Influencer</option>
            <option value="20">Anchor</option>
            <option value="21">Photographer</option>
            <option value="22">Dancer</option>
            <option value="23">Singer</option>
            <option value="24">Fitness</option>
            <option value="25">Model</option>
            <option value="26">Blogger</option>
            <option value="27">Sportsperson</option>
            <option value="28">Tik Tok Star</option>
            <option value="29">Instagrammer</option>
            <option value="30">YouTuber</option>
            <option value="31">TV star</option>
            <option value="32">Movie Star</option>
          </select>
          <label classNameName="down-arrow" htmlFor="Which_category"></label>
        </div>

        <div classNameName="dte_b mt-3" style={{ position: "relative" }}>
          <select
            classNameName="form-control gnd mt-1 arrow "
            id="where_do_you_live"
          >
            <option value="0" hidden>
              Where do we find you ?
            </option>
            <option value="1">Twitter</option>
            <option value="2">Facebook</option>
            <option value="3">Instagram</option>
            <option value="4">YouTube</option>
            <option value="5">TikTok</option>
            <option value="6">Other</option>
          </select>
          <label classNameName="down-arrow" htmlFor="where_do_you_live"></label>
        </div>

        <div classNameName="dte_b mt-2">
          <p classNameName="dte mt-3">Your handle :</p>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control"
            placeholder="@Tringlndia"
            required=""
            autoFocus=""
            autoComplete="off"
          />
        </div> */}

          {/* <div classNameName="dte_b mt-2">
          <p classNameName="dte mt-3">How many followers do you have :</p>
          <input
            type="name"
            onChange={(e) => this.handle_platform(e)}
            id="platform"
            className="form-control"
            placeholder="400k"
            required=""
            autoFocus=""
            autoComplete="off"
          />
        </div> */}

          {/* <div classNameName="dte_b mt-2">
          <p classNameName="dte mt-3">Your Description</p>
          <textarea className="form-control"></textarea>
          <h6 className="cnt_ch">Character count: 0/5000</h6>
        </div> */}

          <div className="dte_b mt-2">
            <p className="dte"></p>
            <input
              type="checkbox"
              className="form-control"
              required=""
              autoFocus=""
              autoComplete="off"
            />
          </div>

          {this.state.err_message ? (
            <p className="err_message mt-2">{this.state.err_message}</p>
          ) : null}

          {this.state.success_message ? (
            <p className="success_message mt-2">{this.state.success_message}</p>
          ) : null}

          <button className="mt-3 btn btn-lg btn-primary btn-block" type="submit">
            Submit
          </button>
          <p className="mt-2 mb-3 text-muted textCenter_">© 2021</p>
        </form>

        <Footer />
      </div>
    );
  }
}

export default Form;
