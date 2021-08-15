import React, { Component } from "react";
import Link from "next/link";
import Footer from "./common/footer";
import Sidemenu from "./common/sidemenu";
import Head from "next/head";
import Loader from 'react-loader-spinner';
import Protected from './widget/protected';


export class users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [],
      err_message: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.getUsersList();
  }

  getUsersList() {
    fetch(`${process.env.PATH_URL}/get-user-list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok" && resp.data[0]) {
          this.setState({
            loader: false,
            usersArray: resp.data,
          });
        } else {
          this.setState({
            err_message: true,
            loader:false,
            usersArray: "no data"
          });
        }
      });
    });
  }


  UsersDeleteId(item, i){
    var id = item._id;
    fetch(`${process.env.PATH_URL}/users?_id=${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body : JSON.stringify()
    }).then((data) => {
      data.json().then((resp) => {
        console.log(resp);
        if (resp.response == "ok") {
          this.getUsersList()
          alert('Deleted')
        } else {
          alert('Something went wrong')
        }
      });
    });
  }

  render() {
    return (
      <Protected>
        <Head>
          <title>Users</title>
        </Head>

        <div className="mg_tp hgt_c">
            <Sidemenu />
        <div className="container-fluid">
            

            <main role="main" className="wd-100 mg-l-2 mg-t-2 mg-b-5 px-md-4 font_s hgt_c"
              >
              <h2>Users</h2>
              
              
              {!this.state.loader ? (
                  this.state.usersArray == "no data" ? (
                    <p className="loader_in_option">No data found</p>
                  ) : (
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Option</th>

                    </tr>
                  </thead>
                  <tbody>
                  {this.state.usersArray.map((item, i) => (
                        <tr>
                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.gender}</td>

                          <td className="cele-btn">
                            <a onClick={()=> this.UsersDeleteId(item, i)} ><span>Remove</span> </a>
                          </td>

                        </tr>

                    ))}
                    
                  </tbody>
                </table>
              </div>
            )
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


            </main>
          </div>
        </div>

        <Footer />
      </Protected>
    );
  }
}

export default users;
