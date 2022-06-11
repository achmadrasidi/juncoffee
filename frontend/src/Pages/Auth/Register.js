import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/SubComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userRegister } from "../../Redux/Actions/UserAction";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const { loading, errorRegister, registerMessage } = useSelector((state) => state.userRegist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Juncoffee - Register";
  }, []);
  if (registerMessage) {
    navigate("/auth/login");
  }
  const signUp = (e) => {
    e.preventDefault();

    setPhoneError(null);
    setEmailError(null);
    dispatch(resetState());

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\d{12}$/;

    if (!email.match(emailFormat)) {
      if (!phone.match(phoneFormat)) {
        setPhoneError("Invalid Phone Format");
      }
      setEmailError("Invalid Email Format");
      return;
    }

    if (!phone.match(phoneFormat)) {
      setPhoneError("Invalid Phone Format");
      return;
    }

    const body = {
      email,
      password,
      phone_number: phone,
    };

    dispatch(userRegister(body));
  };

  return (
    <>
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
            <form className="register-form" onSubmit={signUp}>
              <label htmlFor="email">Email Address :</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  e.preventDefault();
                  setEmailError(null);
                  setEmail(e.target.value);
                }}
                required
              />
              {emailError ? <p className="text-danger fw-bold fs-6">{emailError}</p> : <></>}

              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                required
              />

              <label htmlFor="phone_number">Phone Number :</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter Your Phone Number"
                onChange={(e) => {
                  e.preventDefault();
                  setPhoneError(null);
                  setPhone(e.target.value);
                }}
                required
              />
              {phoneError ? <p className="text-danger fw-bold fs-6">{phoneError}</p> : <></>}

              {errorRegister ? <div className="text-danger fw-bold fs-6">{errorRegister}</div> : <></>}
              <button className="register-button">Sign Up</button>

              <button className="google-button">
                <img src={require("../../assets/img/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.png")} alt="google-icon" /> Sign up with Google
              </button>
            </form>
            <section className="already-account">
              <div className="underline"></div>
              <p className="already-account-text">Already have an account?</p>
              <div className="underline"></div>
            </section>
            <Link to={"/auth/login"}>
              <button className="login-here-button login-here-text" onClick={() => dispatch(resetState())}>
                Login Here
              </button>
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
      {loading && <Loading show={true} onHide={false} />}
    </>
  );
};

export default Register;
