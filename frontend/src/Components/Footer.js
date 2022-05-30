import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Footer extends Component {
  render() {
    return (
      <footer className="home-footer py-5">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-8 footer-brand-layout">
              <h2 className="footer-brand">
                <img src={require("../assets/img/coffee-1.png")} alt="logo-icon" />
                &nbsp;Juncoffee
              </h2>
              <p className="footer-text mt-3">
                Juncoffee is a store that sells some good <br />
                meals, and especially coffee. We provide <br />
                high quality beans
              </p>
              <img src={require("../assets/img/Facebook.png")} className="footer-fb-icon" alt="fb-icon" />
              <img src={require("../assets/img/Twitter-icon.png")} className="footer-twitter-icon" alt="twitter-icon" />
              <img src={require("../assets/img/Instagram.png")} className="footer-ig-icon" alt="ig-icon" />
              <p className="footer-home-copyright">@2022Juncoffee</p>
            </div>
            <div className="footer-nav">
              <div className="col-md-2">
                <h2 className="link-title">Product</h2>
                <div className="footer-home-link">
                  <Link to={"#"}>Download</Link>
                  <Link to={"#"}>Pricing</Link>
                  <Link to={"#"}>Locations</Link>
                  <Link to={"#"}>Countries</Link>
                  <Link to={"#"}>Blog</Link>
                </div>
              </div>
              <div className="col-md-2">
                <h2 className="link-title">Engage</h2>
                <div className="footer-home-link">
                  <Link to={"#"}>Coffe Shop ?</Link>
                  <Link to={"#"}>About Us</Link>
                  <Link to={"#"}>FAQ</Link>
                  <Link to={"#"}>Privacy Policy</Link>
                  <Link to={"#"}>Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
