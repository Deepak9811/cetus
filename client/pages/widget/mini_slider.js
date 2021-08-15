import React, { PureComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";

import Loader from "react-loader-spinner";

import Link from "next/link";

class MiniSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      data: [],
      loader: true,
    };
  }

  componentDidMount() {
    this.getCategoryArray();
  }

  getCategoryArray() {
    // console.log("props",this.props)
    fetch(`${process.env.PATH_URL}/${this.props.fetch_url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((res) => {
        if (res.response == "ok") {
          if (res.data == "") {
            this.setState({data : 'error',
            loader: false,})
          }
          else{
            this.setState({
              data: res.data,
              loader: false,
            });
          }
        } else {
          this.setState({
            loader: false,
          });
        }
      });
    });
  }

  componentWillMount() {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  }

  render() {
    return (
      <>
         {this.state.data !== 'error'?
        <section className="celeb-cat-section">
          <div className="container">
            <div className="heading-wrap">
              <div className="heading-left text-left">
                <h2 className="section-title">{this.props.title}</h2>
              </div>
            </div>
            <Swiper
            className="mg-t-1"
              autoplay={true}
              breakpoints={{
                // when window width is >= 640px
                0: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },

                500: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                700: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },

                800: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                1100: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },


                1200: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },

                1300: {
                  slidesPerView: 5,
                  spaceBetween:20,
                },
              }}
              navigation
              // spaceBetween={30}
              // slidesPerView={5}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
               {!this.state.loader ? (
                this.state.data.map((data, i) => (
                  <React.Fragment key={i}>
                    <SwiperSlide>
                      <MiniCap
                        name={data.name}
                        image={data.image[0].imageSrc}
                        id={data.celebrity_id}
                      />
                    </SwiperSlide>
                  </React.Fragment>
                  ))
                ) : (
                  <div
                    className="loader_in_option2"
                    style={{ marginBottom: "10%", marginTop: "10%" }}
                  >
                    <Loader type="Oval" color="#00BFFF" height={30} width={50} />
                  </div>
                )}
            </Swiper>
            
          </div>
        </section>
        :
        null
        }
      </>
    );
  }
}

export default MiniSlider;

class MiniCap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  url;

  render() {
    this.url = "view?userId=" + this.props.userId;
    return (
      <div className="celeb-slider slick-initialized slick-slider">
        <div className="slick-list draggable">
          <div className="slick-track">
            <div className="celeb-slide slick-slide slick-cloned">
              <div className="celeb-box">
                <Link href={`/view?userId=${this.props.id}`}>
                  <a className="display-block" tabindex="-1">
                    <div className="celeb-img-wrap">
                      <div className="celeb-img bg-lazy">
                        <img src={this.props.image} />
                      </div>
                    </div>
                    <div className="celeb-desp">
                      <span>
                        <h3> {this.props.name} </h3>
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
