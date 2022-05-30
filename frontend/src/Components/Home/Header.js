import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="hero-image">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 hero-content hero-res">
            <h2 className="hero-title">Start Your Day with Coffee and Good Meals</h2>
            <p className="hero-desc">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</p>
            <button className="get-started" onClick={() => navigate("/product")}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
