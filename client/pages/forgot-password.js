import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./common/footer";
import Router from 'next/router';

export class forgotpage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email:'',
      err_message: false,
      loader: false,
      enter_recovery : false
    };
  }
  
  generateToken(length){
    this.setState({
      loader:true
    })
    if(this.state.email){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.updateTempToken(result)
    }
  }

  updateTempToken(token) {
    fetch(`${process.env.PATH_URL}/temp-generator?email=${this.state.email}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({temp_token : token})
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.data !== "") {
          if(resp.data !== null){
              this.sendMail(resp.data.temp_token)
          }
          else{
            this.setState({
              loader:false,
              message :"Please check your email"
            });
          }
          
        } else {
            this.setState({
            loader:false,
            message :"Something went wrong."
          });
        }
      });
    });
  }

  
  sendMail(res){
    fetch(`${process.env.PATH_URL}/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ form_type : 3,  mail_to :  this.state.email , temp_token : res })
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok") {
          this.setState({
            loader: false,
          });
          Router.push("/recovery")
        } else {
          this.setState({
            err_message: true,
            loader:false,
          });
        }
      });
    });
  }


  render() {
    return (
      <>
        <Head>
          <title>Forgot Password</title>
        </Head>


        <div className="form-signin md-8">
          <span className="logoText textCenter_ logo_styl">
            <Link href="/">
              <a className="logo szg">
                <img src="./image/clbze_logo.png" />
              </a>
            </Link>
          </span>

          <h1 className="h3 mb-3 font-weight-normal textCenter_">
            Forgot Password
          </h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
            autoComplete="off"
            onChange={(event) => this.setState({ email: event.target.value, message : false })}
          />

          {this.state.enter_recovery?
            <>
            <label htmlFor="inputEmail" className="sr-only">
            Please Enter Recovery Code
          </label>
          <input
            type="password"
            id="inputEmail"
            className="form-control"
            placeholder="Recovery Code"
            required=""
            autoFocus=""
            autoComplete="off"
            onChange={(event) => this.setState({ recovery_code: event.target.value, message : false })}
          />
          </>
          :null}
          {this.state.message?<p style={{marginTop:12, fontSize:'12px'}} >{this.state.message}</p>:null}
          {!this.state.loader?
          <button onClick={()=> this.generateToken(6)} className="btn btn-lg btn-primary btn-block mt-10" type="submit">
            Continue
          </button>
          : (
            <div className="showbox_">
              <div className="loader_">
                <svg className="circular_" viewBox="25 25 50 50">
                  <circle
                    className="path_"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
            </div>
          )}

        </div>

        <Footer/>
      </>
    );
  }
}

export default forgotpage;
