import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Prompt from "../../SubComponent/Prompt";
import EditPass from "./EditPass";

const BotSection = ({ handleInputChange, setInputValue, error, setError, updateHandler }) => {
  const [dateValue, setDateValue] = useState("");
  const [gen, setGen] = useState("");
  const [showEditPass, setShowEditPass] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { data } = useSelector((state) => state.getProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.gender) {
      setGen(data.gender);
    }
    if (data.date_of_birth) {
      setInputValue((inputValue) => {
        return { ...inputValue, date_of_birth: data.date_of_birth.replaceAll("/", "-") };
      });
    }
  }, [data.gender, data.date_of_birth]);

  const cancelHandler = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  return (
    <>
      <Prompt show={showLogout} message={"Are You Sure ?"} confirm={() => navigate("/logout")} cancel={() => setShowLogout(!showLogout)} />
      <EditPass show={showEditPass} setShow={setShowEditPass} />

      <div className="row mt-lg-5 pt-5 " id="user-detail-row-res">
        <div className="col-md-6 me-5" id="user-detail-col-res">
          <div className="card card-detail-layout" id="card-detail-layout-res">
            <div className="card-body">
              <div className="row mt-3 ps-3">
                <div className="col-md-6">
                  <h2 className="user-contact">Details</h2>
                </div>
                <div className="col-md-6 text-end">
                  <img src="assets/img/needle.png" width="11%" alt="" />
                </div>
              </div>
              <div className="row mt-4 ps-3 card-user-detail-row" id="card-user-detail-res">
                <div className="col-md-7 d-flex flex-column gap-2">
                  <h2 className="user-contact-title">Display Name :</h2>
                  <input type="text" className="user-contact-text" defaultValue={data.name} placeholder="Display Name" onChange={handleInputChange} name="name"></input>
                  <h2 className="user-contact-title">First name :</h2>
                  <input type="text" className="user-contact-text" defaultValue={data.first_name} placeholder="First Name" name="first_name" onChange={handleInputChange}></input>
                  <h2 className="user-contact-title">Last name :</h2>
                  <input type="text" className="user-contact-text" defaultValue={data.last_name} placeholder="Last Name" name="last_name" onChange={handleInputChange}></input>
                </div>
                <div className="col-md-4 d-flex flex-column date-gender-res gap-2">
                  <h2 className="user-contact-title">Date Of Birth</h2>
                  <input
                    type="date"
                    className="user-contact-text"
                    value={dateValue ? dateValue : `${data.year}-${data.month}-${data.day}`}
                    onChange={(e) => {
                      e.preventDefault();
                      const day = e.target.value.split("-")[2];
                      const month = e.target.value.split("-")[1];
                      const year = e.target.value.split("-")[0];
                      setDateValue(e.target.value);
                      setInputValue((inputValue) => {
                        return { ...inputValue, date_of_birth: `${day}/${month}/${year}` };
                      });
                    }}
                  />
                  <div className="radio-row mt-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gen === "male"}
                      onClick={(e) => {
                        setGen("male");
                        setInputValue((inputValue) => {
                          return { ...inputValue, gender: e.target.value };
                        });
                      }}
                    />
                    <label htmlFor="gender" className="male-icon-text ms-2 mb-0">
                      {" "}
                      Male{" "}
                    </label>
                  </div>
                  <div className="radio-row">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gen === "female"}
                      onClick={(e) => {
                        setGen("female");
                        setInputValue((inputValue) => {
                          return { ...inputValue, gender: e.target.value };
                        });
                      }}
                    />
                    <label htmlFor="gender" className="male-icon-text ms-2 mb-0">
                      {" "}
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 button-user-detail">
          <h2 className="button-user-text">
            Do you want to save <br />
            the change?
          </h2>
          <div className="button-content mt-4">
            <button className="save-change-button" onClick={updateHandler}>
              Save Change
            </button>
            <button className="cancel-button mt-3" onClick={cancelHandler}>
              Cancel
            </button>
            <button
              className="edit-pass-button mt-5"
              onClick={() => {
                setError({ ...error, password: null });
                setShowEditPass(true);
              }}
            >
              <span>Edit Password</span> <img src="assets/img/right-icon.png" alt="" />
            </button>
            <button className="logout-button mt-3" onClick={() => setShowLogout(!showLogout)}>
              <span>Log out</span> <img src="assets/img/right-icon.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BotSection;
