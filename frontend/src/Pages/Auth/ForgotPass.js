import React, { Component } from "react";
import bgForgot from "../../assets/img/nani-williams-6PpLqUlCA0s-unsplash.jpg";
import Footer from "../../Components/Footer";

class ForgotPass extends Component {
  componentDidMount() {
    document.title = "Juncoffee - Forgot Password";
  }
  render() {
    return (
      <>
        <div className="forgotContainer">
          <img className="forgotImg" src={bgForgot} alt="" />
          <div className="forgotForm">
            <div className="forgotTitle">
              <span>Forgot your password</span>
              <p>Don't worry, we got your back</p>
            </div>
            <div className="inputForgot">
              <input type="text" placeholder="input your email adress to get link" />
              <span>Send</span>
            </div>
            <div className="forgotReceive" id="forgot-rec-res">
              <p className="text-center forgot-receive-text">
                Click Here if you didn't receive any link <br /> in 2 minutes
              </p>

              <div className="resendLink" id="resend-link-res">
                Resend Link
              </div>
              <p>01 : 54</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ForgotPass;
