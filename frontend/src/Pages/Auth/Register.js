import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    email: "",
    password: "",
    phone_number: "",
    isError: false,
    errorMsg: "",
    isSuccess: false,
  };

  componentDidMount() {
    document.title = "Juncoffee - Register";
  }
  signUp(e) {
    e.preventDefault();
    const { email, password, phone_number } = this.state;
    const body = {
      email,
      password,
      phone_number,
    };
    axios
      .post("http://localhost:5000/auth/register", body)
      .then((result) => {
        alert(result.data.message);
        this.setState({
          isSuccess: true,
        });
      })
      .catch((error) => {
        this.setState({
          isError: true,
          errorMsg: error.response.data.error,
        });
      });
  }
  render() {
    if (this.state.isSuccess) {
      return <Navigate to="/auth/login" />;
    }

    return (
      <div className="container-auth">
        <div className="column-image">
          <img src={require("../../assets/img/robert-bye-95vx5QVl9x4-unsplash.jpg")} className="side-image-register" alt="aside" />
        </div>

        <div className="column-main">
          <header className="side-title">
            <img src={require("../../assets/img/coffee-1.png")} className="logo" alt="logo-icon" />
            <h2 className="header-title">Juncoffee</h2>
            <h1 className="page-title">Sign Up</h1>
          </header>
          <section className="register">
            <div className="register-form">
              <label htmlFor="email">Email Address :</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
              />

              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
              <label htmlFor="phone_number">Phone Number :</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter Your Phone Number"
                onChange={(e) => {
                  this.setState({
                    phone_number: e.target.value,
                  });
                }}
              />
              {this.state.isError ? <div className="text-danger fw-bold fs-6">{this.state.errorMsg}</div> : <></>}
              <button className="register-button" onClick={this.signUp.bind(this)}>
                Sign Up
              </button>
              <button className="google-button">
                <img src={require("../../assets/img/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png")} alt="google-icon" /> Sign up with Google
              </button>
            </div>
            <section className="already-account">
              <div className="underline"></div>
              <p className="already-account-text">Already have an account?</p>
              <div className="underline"></div>
            </section>
            <Link to={"/auth/login"}>
              <button className="login-here-button login-here-text">Login Here</button>
            </Link>
          </section>
          <footer className="login">
            <aside className="describe" aria-label="">
              <img src={require("../../assets/img/coffee-1.png")} className="logo" alt="logo-icon" />
              <h2 className="footer-title"> &nbsp;Juncoffee</h2>
              <p className="footer-text mt-3">Juncoffee is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
              <img src={require("../../assets/img/fb.png")} alt="fb-icon" />
              <img src={require("../../assets/img/twitter.png")} alt="twitter-icon" />
              <img src={require("../../assets/img/ig.png")} alt="ig-icon" />
              <p className="footer-text mt-3 pb-3">@2022Juncoffee</p>
            </aside>
            <aside className="link mt-3 ms-5 ps-5" aria-label="">
              <h2 className="link-title">Product</h2>
              <div className="link-item">
                <Link to={"#"}>Download</Link>
                <Link to={"#"}>Pricing</Link>
                <Link to={"#"}>Locations</Link>
                <Link to={"#"}>Countries</Link>
                <Link to={"#"}>Blog</Link>
              </div>
              <h2 className="link-title mt-3">Engage</h2>
              <div className="link-item">
                <Link to={"#"}>Coffe Shop ?</Link>
                <Link to={"#"}>About Us</Link>
                <Link to={"#"}>FAQ</Link>
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Terms of Service</Link>
              </div>
            </aside>
          </footer>
        </div>
      </div>
    );
  }
}

export default Register;
