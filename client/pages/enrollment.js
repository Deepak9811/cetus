import React, { Component } from "react";
import Link from "next/link";

export class enrollment extends Component {

  constructor(props){
      super(props);
      this.closePopup = this.closePopup.bind(this);
  }

  closePopup(){
    this.props.close();
  }
  render() {
    // console.log(this.props.toggleE);
    return (
      <div style={this.props.toggleE?{display:"block"}:{display:"none"}}>
        <div className="overlay" onClick={this.closePopup}></div>
        <div className="modal_en" style={{"zIndex":"9"}}>
          <section className="modal-card-body" data-v-6725bf8f="">
            <div id="headsection" data-v-6725bf8f="">
              <p id="heading" className="dark_text bold" data-v-6725bf8f="">
                Want to join as a celebrity?
              </p>
              <img onClick={this.closePopup}
                src="https://media.wysh.app/webassets/icons/times.svg"
                alt=""
                style={{ width: "2.2em", cursor: "pointer", padding: "10px" }}
                data-v-6725bf8f=""
              />
            </div>
            <p
              className="dark_text"
              style={{ fontSize: "14px" }}
              data-v-6725bf8f=""
            >
              You have a strong fan base and want to wysh your fans? Get in
              <br data-v-6725bf8f="" />
              touch with us and you may join WYSH
            </p>

            <div data-v-6725bf8f="">
              <div style={{ display: "flex" }} data-v-6725bf8f="">
                <div className="inputcontainer" data-v-6725bf8f="">
                  <p
                    className="dark_text"
                    style={{ fontWeight: "500" }}
                    data-v-6725bf8f=""
                  >
                    Name
                  </p>
                  <input
                    type="text"
                    className="input inputbox"
                    data-v-6725bf8f=""
                  />
                </div>
                <div
                  className="inputcontainer"
                  style={{ paddingLeft: "20%" }}
                  data-v-6725bf8f=""
                >
                  <p
                    className="dark_text"
                    style={{ fontWeight: "500" }}
                    data-v-6725bf8f=""
                  >
                    Phone
                  </p>
                  <div
                    className="field has-addons"
                    style={{ marginBottom: "0" }}
                    data-v-6725bf8f=""
                  >
                    <p
                      className="control"
                      style={{ paddingTop: "5px", paddingRight: "5px;" }}
                      data-v-6725bf8f=""
                    >
                      +91-
                    </p>

                    <p className="control is-expanded" data-v-6725bf8f="">
                      <input
                        type="number"
                        pattern="[0-9]"
                        className="input inputbox"
                        style={{
                          fontSize: "16px",
                          paddingLeft: "0",
                          color: "rgb(0, 0, 0)",
                          paddingTop: "6px",
                          borderRadius: "none",
                        }}
                        data-v-6725bf8f=""
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex" }} data-v-6725bf8f="">
                <div className="inputcontainer" data-v-6725bf8f="">
                  <p
                    className="dark_text"
                    style={{ fontWeight: "500" }}
                    data-v-6725bf8f=""
                  >
                    Choose your Platform
                  </p>
                  <div className="control is-fullwidth" data-v-6725bf8f="">
                    <div
                      className="select"
                      style={{ width: "100%" }}
                      data-v-6725bf8f=""
                    >
                      <div
                        className="dropdown"
                        style={{ width: "100%" }}
                        data-v-6725bf8f=""
                      >
                        <div
                          className="dropdown-trigger"
                          style={{ width: "100%" }}
                          data-v-6725bf8f=""
                        >
                          <button
                            aria-haspopup="true"
                            aria-controls="dropdown-menu3"
                            className="button platformbutton"
                            style={{
                              width: "100%",
                              justifyContent: "flex-start",
                              height: "28px",
                            }}
                            data-v-6725bf8f=""
                          >
                            <span data-v-6725bf8f=""></span>
                          </button>
                        </div>

                        <div
                          id="dropdown-menu3"
                          role="menu"
                          className="dropdown-menu"
                          style={{ width: "100%" }}
                          data-v-6725bf8f=""
                        >
                          <div className="dropdown-content" data-v-6725bf8f="">
                            <a
                              className="dropdown-item"
                              style={{ fontSize: "16px" }}
                              data-v-6725bf8f=""
                            >
                              Instagram
                            </a>

                            <a
                              className="dropdown-item"
                              style={{ fontSize: "16px" }}
                              data-v-6725bf8f=""
                            >
                              Twitter
                            </a>
                            <a
                              className="dropdown-item"
                              style={{ fontSize: "16px" }}
                              data-v-6725bf8f=""
                            >
                              Youtube
                            </a>
                            <a
                              className="dropdown-item"
                              style={{ fontSize: "16px" }}
                              data-v-6725bf8f=""
                            >
                              Facebook
                            </a>
                            <a
                              className="dropdown-item"
                              style={{ fontSize: "16px" }}
                              data-v-6725bf8f=""
                            >
                              TikTok
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="inputcontainer"
                  style={{ paddingLeft: "20%", width: "59%" }}
                  data-v-6725bf8f=""
                >
                  <p
                    className="dark_text"
                    style={{ fontWeight: "500" }}
                    data-v-6725bf8f=""
                  >
                    Your Platform Handle
                  </p>
                  <input
                    type="text"
                    
                    className="input inputbox"
                    data-v-6725bf8f=""
                  />
                </div>
              </div>

              <div data-v-6725bf8f=""></div>

              <div style={{ display: "flex" }} data-v-6725bf8f="">
                <div className="inputcontainer" data-v-6725bf8f="">
                  <p
                    className="dark_text"
                    style={{ fontWeight: "500" }}
                    data-v-6725bf8f=""
                  >
                    Email
                  </p>
                  <input
                    type="text"
                   
                    className="input inputbox"
                    data-v-6725bf8f=""
                  />
                </div>
                <div
                  className="inputcontainer"
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    paddingLeft: "20%",
                  }}
                  data-v-6725bf8f=""
                >
                  <button
                    className="button is-fullwidth purple-button"
                    style={{ width: "250px" }}
                    data-v-6725bf8f=""
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default enrollment;
