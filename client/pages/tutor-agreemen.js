import React, { PureComponent } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./common/footer";

class Agreement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      s_o_w_o: "",
      screen_name: "",
      profession: "",
      resident_of: "",
      permanent_address: "",
      mobile: "",
      email: "",
      website: "",
      any_other_social_platform: "",
      bank_detail: "",
      bank_branch_address: "",
      account_holder_name: "",
      account_no: "",
      ifsc: "",
      bank_swift: "",
      aadhar: "",
      pan: "",
      gst_detail: "",
      name_of_company: "",
      gstin_reg_no: "",
      state_: "",
      checked: false,
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

  s_o_w_o(e) {
    this.setState({
      s_o_w_o: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  screen_name(e) {
    this.setState({
      screen_name: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  profession(e) {
    this.setState({
      profession: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  resident_of(e) {
    this.setState({
      resident_of: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  permanent_address(e) {
    this.setState({
      permanent_address: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  mobile(e) {
    this.setState({
      mobile: e.target.value,
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

  photographs(e) {
    this.setState({
      photographs: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  website(e) {
    this.setState({
      website: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  any_other_social_platform(e) {
    this.setState({
      any_other_social_platform: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  bank_detail(e) {
    this.setState({
      bank_detail: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  bank_branch_address(e) {
    this.setState({
      bank_branch_address: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  account_holder_name(e) {
    this.setState({
      account_holder_name: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  account_no(e) {
    this.setState({
      account_no: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  ifsc(e) {
    this.setState({
      ifsc: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  bank_swift(e) {
    this.setState({
      bank_swift: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  aadhar(e) {
    this.setState({
      aadhar: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  pan(e) {
    this.setState({
      pan: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  gst_detail(e) {
    this.setState({
      gst_detail: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  name_of_company(e) {
    this.setState({
      name_of_company: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  gstin_reg_no(e) {
    this.setState({
      gstin_reg_no: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  state_(e) {
    this.setState({
      state_: e.target.value,
      err_message: false,
      success_message: false,
    });
  }

  checked(e) {
    if (this.state.checked) {
      this.setState({ checked: false });
    } else {
      this.setState({
        checked: true,
      });
    }
  }

  check(e) {
    e.preventDefault();
    if (
      this.state.name !== "" &&
      this.state.s_o_w_o !== "" &&
      this.state.screen_name !== "" &&
      this.state.profession !== "" &&
      this.state.resident_of !== "" &&
      this.state.permanent_address !== "" &&
      this.state.mobile !== "" &&
      this.state.email !== "" &&
      this.state.website !== "" &&
      this.state.any_other_social_platform !== "" &&
      this.state.bank_detail !== "" &&
      this.state.bank_branch_address !== "" &&
      this.state.account_holder_name !== "" &&
      this.state.account_no !== "" &&
      this.state.ifsc !== "" &&
      this.state.bank_swift !== "" &&
      this.state.aadhar !== "" &&
      this.state.pan !== "" &&
      this.state.gst_detail !== "" &&
      this.state.name_of_company !== "" &&
      this.state.gstin_reg_no !== "" &&
      this.state.state_ !== ""
    ) {
      if (this.state.checked) {
        this.sumbit();
        this.setState({ loader: true });
      } else {
        this.setState({ err_message: "Please accept terms & conditions." });
      }
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    console.log(this.props);
    const {
      name,
      s_o_w_o,
      screen_name,
      profession,
      resident_of,
      permanent_address,
      mobile,
      email,
      website,
      any_other_social_platform,
      bank_detail,
      bank_branch_address,
      account_holder_name,
      account_no,
      ifsc,
      bank_swift,
      aadhar,
      pan,
      gst_detail,
      name_of_company,
      gstin_reg_no,
      state_,
    } = this.state;

    fetch("https://node-api-08.el.r.appspot.com/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // mail_to:'VirajMalhotraa@gmail.com',
        mail_to: "celebze.official@gmail.com",
        form_type: 2,
        name: name,
        email: email,
        s_o_w_o: s_o_w_o,
        screen_name: screen_name,
        profession: profession,
        resident_of: resident_of,
        permanent_address: permanent_address,
        mobile: mobile,
        website: website,
        any_other_social_platform: any_other_social_platform,
        bank_detail: bank_detail,
        bank_branch_address: bank_branch_address,
        account_holder_name: account_holder_name,
        account_no: account_no,
        bank_swift: bank_swift,
        aadhar: aadhar,
        ifsc: ifsc,
        pan: pan,
        gst_detail: gst_detail,
        name_of_company: name_of_company,
        gstin_reg_no: gstin_reg_no,
        state_: state_,
        subject: "1 New Enquery [Form 2].",
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
      <>
        <Head>
          <title>celebrities</title>
        </Head>




        <form className="form-signin" onSubmit={(e) => this.check(e)}>
          <span
            className="logoText textCenter_ logo_styl"
            style={{ marginLeft: "40%", width: "50%" }}
          >
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

          <label htmlFor="s_o_w_o" className="sr-only">
            S/o /W/o
          </label>
          <input
            type="name"
            onChange={(e) => this.s_o_w_o(e)}
            id="s_o_w_o"
            className="form-control mt-3"
            placeholder="S/o /W/o"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="screen_name" className="sr-only">
            Screen Name
          </label>
          <input
            type="name"
            onChange={(e) => this.screen_name(e)}
            id="screen_name"
            className="form-control mt-3"
            placeholder=" Screen Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="profession" className="sr-only">
            Profession
          </label>
          <input
            type="name"
            onChange={(e) => this.profession(e)}
            id="profession"
            className="form-control mt-3"
            placeholder="Profession"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="resident_of" className="sr-only">
            Resident of
          </label>
          <input
            type="name"
            onChange={(e) => this.resident_of(e)}
            id="resident_of"
            className="form-control mt-3"
            placeholder="Resident of"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="permanent_address" className="sr-only">
            Permanent address
          </label>
          <input
            type="name"
            onChange={(e) => this.permanent_address(e)}
            id="permanent_address"
            className="form-control mt-3"
            placeholder="Permanent address"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="mobile" className="sr-only">
            Mobile/Cellular No.
          </label>
          <input
            type="number"
            onChange={(e) => this.mobile(e)}
            id="mobile"
            className="form-control mt-3"
            placeholder="Mobile/Cellular No."
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="website" className="sr-only">
            Website(if any)
          </label>
          <input
            type="name"
            onChange={(e) => this.website(e)}
            id="website"
            className="form-control mt-3"
            placeholder="Website(if any)"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="any_other_social_platform" className="sr-only">
            Any other social media platforms
          </label>
          <input
            type="name"
            onChange={(e) => this.any_other_social_platform(e)}
            id="any_other_social_platform"
            className="form-control mt-3"
            placeholder="Any other social media platforms"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="photographs" className="sr-only">
            Latest's Photographs (Minimum 4)Upload/Link/Email)
          </label>
          <input
            type="name"
            onChange={(e) => this.photographs(e)}
            id="photographs"
            className="form-control mt-3"
            placeholder="Latest's Photographs (Minimum 4)Upload/Link/Email)"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => this.email(e)}
            id="email"
            className="form-control mt-3"
            placeholder="Email"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="bank_detail" className="sr-only">
            Bank Detail
          </label>
          <input
            type="name"
            onChange={(e) => this.bank_detail(e)}
            id="bank_detail"
            className="form-control mt-3"
            placeholder="Bank Detail"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="bank_branch_address" className="sr-only">
            Bank Branch address
          </label>
          <input
            type="name"
            onChange={(e) => this.bank_branch_address(e)}
            id="bank_branch_address"
            className="form-control mt-3"
            placeholder="Bank Branch Address"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="account_holder_name" className="sr-only">
            Account Holder Name
          </label>
          <input
            type="name"
            onChange={(e) => this.account_holder_name(e)}
            id="account_holder_name"
            className="form-control mt-3"
            placeholder="Account Holder Name"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="account_no" className="sr-only">
            Account No
          </label>
          <input
            type="name"
            onChange={(e) => this.account_no(e)}
            id="account_no"
            className="form-control mt-3"
            placeholder="Account No"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="ifsc" className="sr-only">
            IFSC*
          </label>
          <input
            type="name"
            onChange={(e) => this.ifsc(e)}
            id="ifsc"
            className="form-control mt-3"
            placeholder="IFSC*"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="bank_swift" className="sr-only">
            Bank Swift
          </label>
          <input
            type="name"
            onChange={(e) => this.bank_swift(e)}
            id="bank_swift"
            className="form-control mt-3"
            placeholder="Bank Swift"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="aadhar" className="sr-only">
            Aadhar*
          </label>
          <input
            type="number"
            onChange={(e) => this.aadhar(e)}
            id="aadhar"
            className="form-control mt-3"
            placeholder="Aadhar*"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="pan" className="sr-only">
            PAN*
          </label>
          <input
            type="name"
            onChange={(e) => this.pan(e)}
            id="pan"
            className="form-control mt-3"
            placeholder="PAN"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="gst_detail" className="sr-only">
            GST Details(if Any):
          </label>
          <input
            type="name"
            onChange={(e) => this.gst_detail(e)}
            id="gst_detail"
            className="form-control mt-3"
            placeholder="GST Details(if Any):"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="name_of_company" className="sr-only">
            Name of Company:
          </label>
          <input
            type="name"
            onChange={(e) => this.name_of_company(e)}
            id="name_of_company"
            className="form-control mt-3"
            placeholder="Name of Company:"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="gstin_reg_no" className="sr-only">
            GSTIN Registeration No.
          </label>
          <input
            type="name"
            onChange={(e) => this.gstin_reg_no(e)}
            id="gstin_reg_no"
            className="form-control mt-3"
            placeholder="GSTIN Registeration No."
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <label htmlFor="state_" className="sr-only">
            State
          </label>
          <input
            type="name"
            onChange={(e) => this.state_(e)}
            id="state_"
            className="form-control mt-3"
            placeholder="State"
            required=""
            autoFocus=""
            autoComplete="off"
          />

          <div className="dte_b " style={{ marginTop: "15px", padding: "5px" }}>
            <input
              type="checkbox"
              style={{ marginRight: "5px", marginTop: "1px" }}
              className="chk_bx"
              required=""
              autoFocus=""
              autoComplete="off"
              checked={this.state.checked}
              onChange={(e) => this.checked(e)}
            />
            <label className="dte">
              I Accept all the{" "}
              <Link href="/">
                <a>terms </a>
              </Link>
              and
              <Link href="/">
                <a> conditions.</a>
              </Link>
            </label>
          </div>

          {this.state.err_message ? (
            <p className="err_message mt-2">{this.state.err_message}</p>
          ) : null}

          {this.state.success_message ? (
            <p className="success_message mt-2">{this.state.success_message}</p>
          ) : null}

          <button
            className="mt-3 btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Submit
          </button>
          <p className="mt-2 mb-3 text-muted textCenter_">© 2021</p>
        </form>

        {/* <style>{`
        html {
          overflow:hidden;
        }
      `}</style> */}
        <Footer />
      </>
    );
  }
}

export default Agreement;
