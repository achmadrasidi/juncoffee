import React, { Component } from "react";

export class Store extends Component {
  render() {
    return (
      <section className="store">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">
                Visit Our Store in the <br />
                Spot on the Map Below
              </h2>
              <p className="section-desc">
                See our store in every city on the spot and spen your good day there. <br />
                See you soon !
              </p>
            </div>
          </div>
          <div className="row global-image">
            <div className="col-md-12">
              <img src={require("../../assets/img/Huge Global.png")} alt="huge-global" className="global-image-res" width="100%" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Store;
