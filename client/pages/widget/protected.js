import React, { PureComponent } from "react";
import Router from 'next/router';
import Loader from 'react-loader-spinner'


class Protected extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        loading:true
    };
  }

  componentDidMount() {
    var adminStatus = localStorage.getItem("admin");
    //Setting up admin status
    if (!adminStatus) {
      Router.push("/admin");
    }

    else{
        this.setState({
            admin:true,
            loading:false,
        })
    }
  }

  render() {
    return (
        this.state.loading?
        <div className="loader_in_option" >
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={30}
                  width={50}
                  // timeout={3000}
                />
                </div>
                :
            this.state.admin?
            <div>{this.props.children}</div>
            :<p>Please login as admin</p>
    )
  }
}

export default Protected;
