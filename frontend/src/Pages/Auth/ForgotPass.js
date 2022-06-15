import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import bgForgot from "../../assets/img/nani-williams-6PpLqUlCA0s-unsplash.jpg";
import Footer from "../../Components/Footer";
import Message from "../../Components/SubComponent/Message";

const ForgotPass = () => {
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { email } = useParams();

  useEffect(() => {
    if (email) {
      setShowEditPass(true);
    }
  }, [email]);

  const sendEmailHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API}/user/forgot-password/${emails}`)
      .then((result) => {
        setMessage(result.data.message);
        setShowMessage(true);
      })
      .catch((err) => setError(err.response ? err.response.data.error : err.message));
  };

  const changePassHandler = (e) => {
    e.preventDefault();
    const body = { newPassword, email };
    if (!newPassword || !confirmPassword) {
      setError("Password cannot be empty");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password not match");
      return;
    }
    axios
      .patch(`${process.env.REACT_APP_API}/user/forgot-password`, body)
      .then((result) => {
        setMessage(result.data.message);
        setShowEditPass(false);
        setShowMessage(true);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.error : err.message);
        setShowMessage(true);
      });
  };

  return (
    <>
      <Message
        show={showMessage}
        onHide={() => {
          setShowMessage(false);
          window.scrollTo({ behavior: "smooth", top: "0px" });
          navigate("/auth/login", { replace: true });
        }}
        message={message}
        error={error}
      />
      <Modal show={showEditPass} onHide={() => setShowEditPass(false)} backdrop="static" keyboard={true}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <Modal.Body>
            <label htmlFor="password">Enter New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="user-contact-text"
              name="password"
              onChange={(e) => {
                setError(null);
                setNewPassword(e.target.value);
              }}
            ></input>
            <span>{showPassword ? <EyeSlash size={30} className="eye-icon-prof" onClick={() => setShowPassword(false)}></EyeSlash> : <Eye size={30} className="eye-icon-prof" onClick={() => setShowPassword(true)}></Eye>}</span>
            <label htmlFor="password">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="user-contact-text"
              name="password"
              onChange={(e) => {
                setError(null);
                setConfirmPassword(e.target.value);
              }}
            ></input>
            <span>{showPassword ? <EyeSlash size={30} className="eye-icon-prof" onClick={() => setShowPassword(false)}></EyeSlash> : <Eye size={30} className="eye-icon-prof" onClick={() => setShowPassword(true)}></Eye>}</span>
            {error ? <p className="text-danger fw-bold fs-6">{error}</p> : <></>}
          </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowEditPass(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={changePassHandler}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="forgotContainer">
        <img className="forgotImg" src={bgForgot} alt="" />
        <div className="forgotForm">
          <div className="forgotTitle">
            <span>Forgot your password</span>
            <p>Don't worry, we got your back</p>
          </div>
          <div className="inputForgot">
            <input
              type="text"
              placeholder="input your email adress to get link"
              onChange={(e) => {
                setEmails(e.target.value);
              }}
            />
            <span onClick={sendEmailHandler}>Send</span>
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
};

export default ForgotPass;
