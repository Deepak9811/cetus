import React, { Component } from "react";
import Link from "next/Link";
import Loader from "react-loader-spinner";
import Footer from "./common/footer";
import Slider from "./widget/slider";
import MiniSlider from "./widget/mini_slider";
// import Head from "next/head";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
    };
  }

  componentDidMount() {
    this.getPage_title(0);
    this.getPage_title(1);
    this.getPage_title(2);
    this.getPage_title(3);
    this.getPage_title(4);
    this.getPage_title(5);
  }

  getPage_title(value) {
    fetch(`${process.env.PATH_URL}/id-page_title?_id=${value}`, {
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
            [value]: resp.data.page_title,
          });
        } else {
          this.setState({
            err_message: true,
            loader: false,
            [value]: "no data",
          });
        }
      });
    });
  }

  render() {
    return (
      <div>
        {!this.state.loader ? (
          <>
            <Slider />

            {/* <div className="celeb-slider slick-initialized slick-slider">
          <div className="slick-list draggable">
            <div className="thr_str_wr">
              <div className="thr_str">
                <img src="/image/khem_raj.jpg" style={{ marginLeft: "0" }} />
                <img src="/image/shefali.jpeg" />
                <img src="/image/Prateek_.jpeg" />
              </div>
            </div>
          </div>
        </div> */}

            {/* <div className="bnr_ig">
          <section className=" hgt_lgt container">
            <div className="rw_hgt">
              <div className="col-md-3">
                <h1>Heading</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s, w
              </p>
              </div>

              <div className="col-md-7">
                <div className="container">
                  <div className="row">
                    <div className="col-8">
                      <div className="card bigCard h-auto">
                        <img
                          src="./image/shefali.jpeg"
                          className="card-img-top "
                          alt="..."
                        />

                        <div className="card-body px-0">
                          <p className="card-text celebName mb-0">Shefali Bagga</p>
                          <span className="card-text celebTag">TV Actor</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="card smallCard">
                        <img
                          src="./image/shefali_1.jpeg "
                          className="card-img-top h-auto"
                          alt="..."
                        />
                        <div className="card-body px-0">
                          <p className="card-text celebName mb-0">Shefali Bagga</p>
                          <span className="card-text celebTag">TV Actor</span>
                        </div>
                      </div>
                      <div className="card smallCard">
                        <img
                          src="./image/shefali_2.jpeg"
                          className="card-img-top h-auto"
                          alt="..."
                        />
                        <div className="card-body px-0">
                          <p className="card-text celebName mb-0">Dj Pasha Doll</p>
                          <span className="card-text celebTag">DJ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> */}

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[0]}`}
                fetch_url="get-fetured-list"
              />
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

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[1]}`}
                fetch_url="get-mostPopular-list"
              />
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

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[2]}`}
                fetch_url="get-bollywood-list"
              />
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

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[3]}`}
                fetch_url="get-tvSerial-list"
              />
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

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[4]}`}
                fetch_url="get-youTube-list"
              />
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

            {!this.state.loader ? (
              <MiniSlider
                title={`${this.state[5]}`}
                fetch_url="get-socialMedia-list"
              />
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

            <div className="celeb-slider slick-initialized slick-slider">
              <div className="slick-list draggable">
                <div className="bg_b">
                  <img src="./image/celebzeBanner.jpg" />
                </div>
              </div>
            </div>

            <Footer />
          </>
        ) : (
          <div className="loader_in_option" style={{ marginTop: "25%" }}>
            <Loader
             type="Bars"
              color="#00BFFF"
               height={50} 
               width={50}
              // timeout={3000}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
