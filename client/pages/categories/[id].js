import React, { PureComponent } from 'react'
import Router from 'next/router';
import Loader from 'react-loader-spinner';
import Head from 'next/head';
import Header from '../common/header';
import Footer from '../common/footer';
import Link from 'next/link';
import next from 'next';

class ID extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
          categoryArray:[],
          loading:true
        }
    }

    static async getInitialProps({query}) {
      const res = await fetch(`${process.env.PATH_URL}/course-category?_id=${query}`)
      const json = await res.json()
      return { path:query.id }
    }

    componentDidMount(){
     this.getCategoryList(this.props.path)
    }

    getCategoryList(query) {
        fetch(`${process.env.PATH_URL}/course-category?_id=${query}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }).then((data) => {
          data.json().then((resp) => {
            if (resp.response == "ok") {
                if(resp.data == ""){
                   this.setState({_error: true, loading:false})
                }
                else{
                  this.setState({
                    categoryArray: resp.data,
                    loading:false
                  });
                }
              
            } else {
              this.setState({
                err_in_fetch: true,
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
        <Header />
        

        {!this.state.loading?
          !this.state._error?
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

                  {/* ************************************************************************************************************ */}
                  
                  {this.state.categoryArray.map((item, index)=>(
                    <Link href={{
                      pathname: '/categories/[slug]',
                      query: { slug: item._id },
                    }}
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
                            <img src={item.image[0].imageSrc} />
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
        </div>
        :
        <p className="loader_in_option _pil" >No Celebrity Found</p>

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

        <Footer />
      </>
    );
  }
}

export default ID;
