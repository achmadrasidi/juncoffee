import React from "react";

const Promo = () => {
  return (
    <section className="promo">
      <div className="container-fluid">
        <div className="row card-promo-row">
          <div className="card card-promo-layout" id="card-promo-layout-res">
            <div className="card-body">
              <div className="row card-promo-row-inside">
                <div className="col-md-6">
                  <h2 className="section-title promo-title">
                    Check our promo <br />
                    today!
                  </h2>
                  <p className="section-desc promo-desc">Let's see the deals and pick yours!</p>
                </div>
                <div className="col-md-6 align-self-center">
                  <button className="promo-button">See Promo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
