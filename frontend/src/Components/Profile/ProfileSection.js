import React, { useCallback, useEffect, useState } from "react";
import Loading from "../SubComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, patchProfile, resetProfile } from "../../Redux/Actions/ProfileAction";
import TopSection from "./Sub/TopSection";
import BotSection from "./Sub/BotSection";
import Message from "../SubComponent/Message";

const ProfileSection = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [inputValue, setInputValue] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState([]);

  const { token } = useSelector((state) => state.persist.userInfo.info);
  const { loading, err } = useSelector((state) => state.getProfile);
  const { load, message, er } = useSelector((state) => state.patchProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Juncoffee - Profile";
    dispatch(getProfile(token));
    if (err) {
      setError({ ...error, message: err });
      setShow(true);
      return;
    }
    if (er) {
      setError({ ...error, message: er });
      setShow(true);
    }
  }, [dispatch, err, er]);

  const handleFoto = (e) => {
    let reader = false;

    e.preventDefault();
    setError({ ...error, file: null });
    const files = e.target.files[0];

    setFile(files);
    const imageType = /image\/(png|jpg|jpeg)/i;
    if (files) {
      reader = new FileReader();
      reader.onload = (ev) => {
        const { result } = ev.target;
        if (!!result) setFileUrl(result);
      };
    }
    if (!files) {
      setError({ ...error, file: "No File Selected" });
      return;
    }
    if (!files.type.match(imageType)) {
      setError({ ...error, file: "Invalid image type (png,jpg,jpeg)" });
      return;
    }
    reader.readAsDataURL(files);
  };

  const updateHandler = (e) => {
    dispatch(resetProfile());
    e.preventDefault();
    const body = { ...inputValue, photo: file };
    const phoneFormat = /^\d{12}$/;
    const { phone_number } = inputValue;

    if (phone_number && !phone_number.match(phoneFormat)) {
      setError({ ...error, phone_number: "Invalid Phone Format" });
      return;
    }

    dispatch(patchProfile(token, body));

    if (!er) {
      setShow(true);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setError({
      ...error,
      [name]: null,
    });
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <>
      <Message show={show} onHide={() => setShow(false)} message={message} error={error.message} />
      {loading || load ? <Loading show={true} onHide={false} /> : <></>}
      <section className="user-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="hero-title">User Profile</h2>
            </div>
          </div>
          <TopSection handleInputChange={handleInputChange} handleFoto={handleFoto} fileUrl={fileUrl} error={error} />
          <BotSection setInputValue={setInputValue} updateHandler={updateHandler} handleInputChange={handleInputChange} error={error} setError={setError} />
        </div>
      </section>
    </>
  );
};

export default ProfileSection;
