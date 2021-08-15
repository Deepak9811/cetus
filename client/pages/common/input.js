import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArray: [],
      searchvalue: "",
      showNoResult: "",
      headingEdit: false,
      showSearchContent:false
    };
  }
  componentDidMount(){
    if(location.pathname=="/") this.setState({searchvalue:""});
    window.addEventListener('popstate', (e)=>{
      if(location.pathname=="/") this.setState({searchvalue:""});
    });
    window.addEventListener("keydown", event => {
      console.log(event)
      let ele = document.querySelector("#input_search a.active");
      if (event.isComposing || event.keyCode == 40) {
        console.log(event);
        if(ele) {
          ele.classList.remove("active");
          if(ele.nextSibling) ele.nextSibling.classList.add("active");
        }
        else if(document.querySelectorAll("#input_search a").length) document.querySelectorAll("#input_search a")[0].classList.add("active");
        return;
      }
      if (event.isComposing || event.keyCode == 38) {
        console.log(event);
        if(ele) {
          ele.classList.remove("active");
          if(ele.previousSibling) ele.previousSibling.classList.add("active");
        }
        else if(document.querySelectorAll("#input_search a").length) document.querySelectorAll("#input_search a")[0].classList.add("active");
        return;
      }

      if (event.isComposing || event.keyCode == 13) {
        if(document.querySelector("#input_search a.active")) location.href=`view?id=${document.querySelector("#input_search a.active").id}`
      }
    });
  
  }
  searchCelebitybyName(value) {
    this.setState({ listArray: [] });
    this.setState({ searchvalue: value });
    if (!value) {
      this.setState({ listArray: [] });
    }
    let sParameter = value;
    sParameter = encodeURIComponent(sParameter.trim()) //"Test%20-%20Text"

    fetch(`${process.env.PATH_URL}/search?q=` + sParameter, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then((data) => {
      data.json().then((resp) => {
        if (resp.response == "ok") {
          this.setState({
            listArray: resp.data,
          });
        } else {
          this.setState({ listArray: [] });
        }
      });
    });
  }

  pushToDestination(value) {
    Router.push(`/view?id=${value}`);
  }

  closeheadingEdit(e) {
    e.target.parentElement.classList.toggle("show");
    this.setState({
      headingEdit: false,
    });
  }

  render() {
    return (
      <div className="input-con">
        <div
          className="ovrlay"
          style={{ background: "transparent" }}
          onClick={(e) => this.closeheadingEdit(e)}
        ></div>

        <div className="sr_b_w">
          <input
            onChange={(e) => {
              this.searchCelebitybyName(e.target.value);
            }}
            onFocus={(e)=>{
              this.setState({showSearchContent:true})
            }}
            onBlur={(e)=>{
              setTimeout(() => {
                this.setState({showSearchContent:false})
              }, 500);
            }}
            name="abc"
            className="serh_input"
            type="text"
            autoComplete="off"
            value={this.state.searchvalue}
            placeholder="Search"
          />

          <button type="submit" className="sr_b">
            <svg viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              ></path>
            </svg>
          </button>
        </div>
        <ul id="input_search" className="xx-ul dropdown-content" style={{ display: this.state.showSearchContent?'block':'none' }}>
          {this.state.listArray.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Link href={`view?id=${item._id}`}>
                  <a id={item._id}>
                    <li onClick={() => this.setState({ listArray: [] })}>
                      <span>{item.name}</span>
                    </li>
                  </a>
                </Link>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Input;