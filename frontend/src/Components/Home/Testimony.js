import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Testimony extends Component {
  render() {
    return (
      <section className="testimony">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">
                Loved by Thousands of <br />
                Happy Customer
              </h2>
              <p className="section-desc mt-3">These are the stories of our customers who have visited us with great pleasure.</p>
            </div>
          </div>
          <div className="row mt-5 testimony-row">
            <div className="col-sm-4">
              <div className="card card-testimony-layout" id="card-testimony-mobile">
                <div className="card-body user-detail">
                  <div className="user-image">
                    <img src={require("../../assets/img/pic-testi-1.png")} alt="testi-user-image1" /> &nbsp; &nbsp; &nbsp;
                    <div className="user-credential">
                      <span className="user-name">Viezh Robert</span>
                      <span className="user-address">Warsaw, Poland</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    <span className="num-rating">4.5</span>
                    <img src={require("../../assets/img/star.png")} alt="rating-icon" />
                  </div>
                </div>
                <div className="card-body">
                  <p className="user-testimony">“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className=" card card-testimony-layout" id="card-testimony-mobile">
                <div className="card-body user-detail">
                  <div className="user-image">
                    <img src={require("../../assets/img/pic-testi-2.png")} alt="testi-user-image2" /> &nbsp; &nbsp; &nbsp;
                    <div className="user-credential">
                      <span className="user-name">Yessica Christy</span>
                      <span className="user-address">Shanxi, China</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    <span className="num-rating">4.5</span>
                    <img src={require("../../assets/img/star.png")} alt="rating-icon" />
                  </div>
                </div>
                <div className="card-body card-body-testi">
                  <p className="user-testimony">“I like it because I like to travel far and still can make my day better just by drinking their Hazelnut Latte</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card-testimony-layout">
                <div className="card-body user-detail">
                  <div className="user-image">
                    <img src={require("../../assets/img/pic-testi-3.png")} alt="testi-user-image3" /> &nbsp; &nbsp; &nbsp;
                    <div className="user-credential">
                      <span className="user-name">Kim Young Jou</span>
                      <span className="user-address">Seoul, South Korea</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    <span className="num-rating">4.5</span>
                    <img src={require("../../assets/img/star.png")} alt="rating-icon" />
                  </div>
                </div>
                <div className="card-body">
                  <p className="user-testimony">“This is very unusual for my taste, I haven't liked coffee before but their coffee is the best! and yup, you have to order the chicken wings, the best in town!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 pagination-button-res">
              <img src={require("../../assets/img/pagination.png")} alt="pagination-button" />
            </div>
            <div className="col-md-6 col-arrow">
              <Link to={"#"}>
                <img src={require("../../assets/img/left.png")} className="left-arrow" alt="left-button" />
              </Link>
              <Link to={"#"}>
                <img src={require("../../assets/img/right.png")} className="right-arrow" alt="right-button" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimony;
