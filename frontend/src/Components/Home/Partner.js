import React from "react";

const Partner = () => {
  return (
    <section className="partner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="section-title">Our Partner</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <img src={require("../../assets/img/Sponsored.png")} alt="sponsor" className="partner-img-res" width="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
