import React, { Component } from "react";
import Footer from "../Components/Footer";
import Banner from "../Components/Home/Banner";
import Description from "../Components/Home/Description";
import Favorite from "../Components/Home/Favorite";
import Header from "../Components/Home/Header";
import Navigation from "../Components/Home/Navigation";
import NavLogin from "../Components/Home/NavLogin";
import Partner from "../Components/Home/Partner";
import Promo from "../Components/Home/Promo";
import Store from "../Components/Home/Store";
import Testimony from "../Components/Home/Testimony";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: JSON.parse(localStorage.getItem("userInfo")),
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    document.title = "Juncoffee - Home";
    if (!!this.state.token) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }
  render() {
    return (
      <>
        {this.state.isLoggedIn ? <NavLogin user={this.state.token} /> : <Navigation />}
        <Header />
        <Banner />
        <Description />
        <Favorite />
        <Store />
        <Partner />
        <Testimony />
        <Promo />
        <Footer />
      </>
    );
  }
}

export default Home;
