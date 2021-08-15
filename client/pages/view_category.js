import React, { PureComponent } from "react";
import Footer from "./common/footer";
import Link from "next/Link";
import Head from "next/head";
import Loader from 'react-loader-spinner';
import Router from 'next/router';


class Category extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image:"",
      loading:true, 
      categoryArray:[]
    };
  }

  static async getInitialProps({query}) {
    return { path:query.id }
  }

  componentDidMount(){
    console.log(this.props)
    this.getAllCategoryListById();
  }

  getAllCategoryListById() {
    this.url = new window.URL(window.location.href);
    this.category_id = this.url.search.substring(this.url.search.indexOf("=") + 1);
    fetch(`${process.env.PATH_URL}/courseCategory?category_id=${this.category_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.data[0]) {
          this.setState({
            loading:false,
            categoryArray:resp.data
          });
        } else {
          this.setState({
            err_in_fetch: true,
            loading:false,
            categoryArray:'no data'
          });
        }
      });
    });
  }


  componentWillReceiveProps (nextProps) {
    if(nextProps.path !== this.props.path) {
      Router.reload(window.location.pathname);
    } 
 }




  render() {
    return (
      <>
      <Head>
          <title>Category</title>
        </Head>

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
            </ul>
          </div>

          {!this.state.loading?
            this.state.categoryArray == "no data"? <p className="loader_in_option">No data found</p>:
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
                    <Link 
                      href={`/view?id=${item._id}`}
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
                            <img src={item.image?item.image[0].imageSrc:null} />
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
                  ))}
                  
                  {/* ******************************************************************************************************************** */}
                </div>
              </div>
            </div>
          </section>
            :  


            <div className="loader_in_option _pil" >
            <Loader
              type="Oval"
              color="#00BFFF"
              height={30}
              width={50}
              // timeout={3000}
            />
            </div>
            }
          
        </div>

      

        <Footer />
      </>
    );
  }
}

export default Category;
