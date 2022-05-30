import React, { Component } from "react";

export class Banner extends Component {
  render() {
    return (
      <section className="banner">
        <div className="container-fluid">
          <div className="row box-head">
            <div className="col-md-12">
              <div className="card card-box justify-content-center" id="card-box-res">
                <div className="row p-0 card-row-res">
                  <div className="col-md-4 d-flex flex-column justify-content-center sideline p-4" id="sideline-res">
                    <div className="row justify-content-center content-item-res">
                      <div className="col-md-2 ">
                        <img src={require("../../assets/img/Rectangle 271.png")} alt="staff-icon" />
                      </div>
                      <div className="col-md-3">
                        <span className="bold-text">
                          90+ <br />{" "}
                        </span>
                        <span className="normal-text">Staff</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex flex-column justify-content-center sideline" id="sideline-res">
                    <div className="row justify-content-center content-item-res">
                      <div className="col-md-2">
                        <img src={require("../../assets/img/location.png")} alt="store-icon" />
                      </div>
                      <div className="col-md-3">
                        <span className="bold-text">
                          30+ <br />{" "}
                        </span>
                        <span className="normal-text">Store</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex flex-column justify-content-center">
                    <div className="row justify-content-center content-item-res">
                      <div className="col-md-2 customer-card-res">
                        <img src={require("../../assets/img/Server.png")} alt="customer-icon" />
                      </div>
                      <div className="col-md-4">
                        <span className="bold-text">
                          800+ <br />{" "}
                        </span>
                        <span className="normal-text">Customers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Banner;
