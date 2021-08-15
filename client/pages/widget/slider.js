import React, { PureComponent } from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  // EffectCoverflow,
  EffectFlip,
  EffectCube,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import Loader from "react-loader-spinner";

class Slider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loader: true,
    };
  }
  componentDidMount() {
    this.getBanner();
  }
  componentWillMount() {
    SwiperCore.use([
      Navigation,
      Pagination,
      A11y,
      Autoplay,
      EffectFlip,
      EffectCube,
      EffectFade,
    ]);
  }

  getBanner() {
    fetch(`${process.env.PATH_URL}/banners`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((result) => {
      result.json().then((res) => {
        // console.log("this.state", this.state.data);
        if (res.response == "ok") {
          this.setState({
            data: res.data,
            loader: false,
          });
          // console.log("data", this.state.data);
        } else {
          this.setState({
            loader: false,
          });
        }
      });
    });
  }

  render() {
    return (
      <div className="wp">
        <Swiper
          effect="fade"
          loop={true}
          // speed={10}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={true}
          navigation
          pagination={{ clickable: true }}
        >
          {!this.state.loader ? (
            this.state.data.map((item, index) => (
              <React.Fragment key={index}>
                <SwiperSlide>
                  {/* {console.log("image",item.image.toString() )} */}
                  <Link href="/categories">
                    <a>
                      <img src={item.image.toString()} />
                    </a>
                  </Link>
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
    );
  }
}

export default Slider;
