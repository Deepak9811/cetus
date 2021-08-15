import React, { PureComponent } from "react";
import Footer from "./common/footer";
import Link from "next/Link";
import Head from "next/head";
import Loader from 'react-loader-spinner';


class Category extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image:"",
      loading:true, 
      categoryArray:[]
    };
  }

  componentDidMount(){
    this.getCategoryList();
  }

  getCategoryList() {
    fetch(`${process.env.PATH_URL}/category/categorys`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          this.setState({
            categoryArray: resp.data,
            loading:false,
          });
        } else {
          this.setState({
            err_in_fetch: true,
          });
        }
      });
    });
  }

  getAllCategoryListById() {
    fetch(`${process.env.PATH_URL}/courseCategory?category_id=${category_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp) {
          this.setState({
            loading:false,
          });
        } else {
          this.setState({
            err_in_fetch: true,
          });
        }
      });
    });
  }


  printImage(value){
    if(value[0]){
      if(value[0].imageSrc){
            return <img className="_print_image" src={value[0].imageSrc}/>
      }
      else{
            return <img className="_print_image" src={value[0]}/>
      }
    }
  }

  render() {
    return (
      <>
      <Head>
          <title>Category</title>
        </Head>

        {!this.state.loading?
        <div className="main fadeIn">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li>
                <Link href="/categories">
                  <a>Categories</a>
                </Link>
              </li>

              <li>
                <Link href="/categories">
                  <a>All</a>
                </Link>
              </li>
            </ul>
          </div>

          <section className="celeb-listing-section">
            <div className="">
              <div className="wth_m celeb-listing-right">
                <input
                  id="artist_last_page"
                  name="last_page"
                  type="hidden"
                  value="83"
                />{" "}
                <div className="celeb-listing" id="div-artist-list">
                  {this.state.categoryArray.map((item, index)=>(
                    item.Category_status == 1?
                    <Link 
                      href={`/view_category?id=${item._id}`}
                    >
                    <div className="celeb-slide">
                    <div className="celeb-box">
                      <a href="#">
                        <div className="celeb-img-wrap">
                          <div
                            className="celeb-img bg-lazy"
                            style={{
                              backgroundPosition: "center top",
                            }}
                          >
                            {this.printImage(item.image)}
                            {/* <img src={item.image?item.image[0].imageSrc?item.image[0].image:null} /> */}
                          </div>
                        </div>
                      </a>

                      <div className="celeb-desp">
                        <a href="/aaradhya-nchandra">
                          <h3>{item.name}</h3>
                        </a>
                      </div>
                    </div>
                  </div>
                  </Link>
                  :null
                  ))}
                  
                </div>
              </div>
            </div>
          </section>
        </div>

        :
        <div className="loader_in_option _pil">
        <Loader
          type="Oval"
          color="#00BFFF"
          height={30}
          width={100}
          // timeout={3000}
        />
        </div>
        }

        <Footer />
      </>
    );
  }
}

export default Category;
