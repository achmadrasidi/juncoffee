import React from "react";

const Description = () => {
  return (
    <section className="content-desc">
      <div className="container-fluid">
        <div className="row justify-content-center gap-5" id="content-desc-res">
          <div className="col-md-4">
            <img src={require("../../assets/img/team-work.png")} className="teamwork-img-res" width="100%" id="teamwork-img-mobile" alt="teamwork" />
          </div>
          <div className="col-md-4 mt-3">
            <h2 className="desc-title">We Provide Good Coffee and Healthy Meals</h2>
            <p className="desc-word">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
            <ul className="ps-0">
              <li className="list-item-desc">
                <img src={require("../../assets/img/list-icon.png")} alt="list-icon" /> &nbsp;High quality beans
              </li>
              <li className="list-item-desc">
                <img src={require("../../assets/img/list-icon.png")} alt="list-icon" /> &nbsp;Healthy meals, you can request the ingredients
              </li>
              <li className="list-item-desc">
                <img src={require("../../assets/img/list-icon.png")} alt="list-icon" /> &nbsp;Chat with our staff to get better experience for ordering
              </li>
              <li className="list-item-desc">
                <img src={require("../../assets/img/list-icon.png")} alt="list-icon" /> &nbsp;Free member card with a minimum purchase of IDR 200.000.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
