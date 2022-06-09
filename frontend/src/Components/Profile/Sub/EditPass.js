import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { patchPassword } from "../../../Redux/Actions/ProfileAction";
import Loading from "../../SubComponent/Loading";
import Message from "../../SubComponent/Message";

const EditPass = ({ show, setShow }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(null);

  const { token } = useSelector((state) => state.persist.userToken.info);
  const { loading, message, err } = useSelector((state) => state.patchPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    if (err) setError(err);
    if (message) {
      setError(null);
      setShow(false);
      setShowMessage(true);
    }
  }, [err, message]);
  return (
    <>
      {loading ? <Loading show={true} onHide={false} /> : <></>}
      <Message
        show={showMessage}
        onHide={() => {
          setShowMessage(false);
        }}
        message={message}
      />
      {/* Modal Edit Password  */}
      <Modal show={show} onHide={() => setShow(!show)} backdrop="static" keyboard={true}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <Modal.Body>
            <label htmlFor="password">Enter Old Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="user-contact-text"
              name="password"
              onChange={(e) => {
                setError(null);
                setOldPassword(e.target.value);
              }}
            ></input>
            <span>{showPassword ? <EyeSlash size={30} className="eye-icon-prof" onClick={() => setShowPassword(false)}></EyeSlash> : <Eye size={30} className="eye-icon-prof" onClick={() => setShowPassword(true)}></Eye>}</span>
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
          <Button variant="danger" onClick={() => setShow(!show)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={(e) => {
              e.preventDefault();
              const body = { oldPassword, newPassword };
              if (!newPassword || !oldPassword || !confirmPassword) {
                setError("Password cannot be empty");
                return;
              }
              if (newPassword !== confirmPassword) {
                setError("Password not match");
                return;
              }
              dispatch(patchPassword(body, token));
            }}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPass;
