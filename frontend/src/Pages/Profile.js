import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [gender, setGender] = useState("");
  const [dateValue, setDateValue] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Juncoffee - Profile";
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/profile", { headers: { Authorization: `Bearer ${user.token}` } });

        const data = response.data.data;
        const { email, phone_number, address, gender, name, date_of_birth } = data;

        setEmail(email);
        setPhone(phone_number);
        setAddress(address);
        setDateBirth(date_of_birth.replaceAll("-", "/"));
        setGender(gender);

        let newData = data;
        if (name) {
          const displayName = data.name.split(" ")[0];
          const firstName = data.name.split(" ")[0];
          const lastName = data.name.split(" ")[1];

          newData = { ...data, displayName, firstName, lastName };
        }
        if (date_of_birth) {
          const year = data.date_of_birth.split("-")[2];
          const month = data.date_of_birth.split("-")[1];
          const day = data.date_of_birth.split("-")[0];
          newData = { ...data, year, month, day };
        }

        if (date_of_birth && name) {
          const displayName = data.name.split(" ")[0];
          const firstName = data.name.split(" ")[0];
          const lastName = data.name.split(" ")[1];
          const year = data.date_of_birth.split("-")[2];
          const month = data.date_of_birth.split("-")[1];
          const day = data.date_of_birth.split("-")[0];
          newData = { ...data, year, month, day, displayName, firstName, lastName };
        }

        setData((data) => ({
          ...data,
          ...newData,
        }));
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    navigate("/logout");
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const body = {
      email,
      phone_number: phone,
      address,
      date_of_birth: dateBirth,
      gender,
    };
    axios
      .patch("http://localhost:5000/user/edit-profile/", body, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((result) => {
        const message = result.data.message;
        alert(`${message}`);
        window.scrollTo({ behavior: "smooth", top: "0px" });
        window.location.reload(false);
      })
      .catch((error) => setError(error.response.data.error));
  };
  return (
    <>
      <Header />
      {error ? <h1 className="text-danger fw-bold fs-6 text-center">{error}</h1> : <></>}
      <section className="user-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="hero-title">User Profile</h2>
            </div>
          </div>
          <div className="row my-4" id="user-contact-res">
            <div className="col-md-3">
              <div className="card card-profile-layout " id="card-profile-layout-res">
                <div className="card-body text-center mt-5">
                  <img src={`http://localhost:5000${data.image}`} className="user-profile-image" alt="" />
                  <h2 className="card-title mt-3">{data.name}</h2>
                  <p className="text-center email-text">{data.email}</p>
                  <p className="product-ordered text-center mt-4">Has been ordered 15 products</p>
                </div>
              </div>
            </div>
            <div className="col-md-8 user-contact-card" id="user-contact-card-res">
              <div className="card card-profile-layout " id="card-profile-layout-res">
                <div className="card-body">
                  <div className="row mt-3 ps-3">
                    <div className="col-md-6">
                      <h2 className="user-contact">Contacts</h2>
                    </div>
                    <div className="col-md-6 text-end">
                      <img src="assets/img/needle.png" width="10%" alt="" />
                    </div>
                  </div>
                  <div className="row mt-4 ps-3 gap-5" id="row-email-phone-card">
                    <div className="col-md-6">
                      <h2 className="user-contact-title">Email Address :</h2>
                      <input
                        type="text"
                        className="user-contact-text"
                        defaultValue={data.email}
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-5">
                      <h2 className="user-contact-title">Mobile number :</h2>
                      <input
                        type="text"
                        className="user-contact-text"
                        defaultValue={data.phone_number}
                        onChange={(e) => {
                          e.preventDefault();
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-3 ps-3" id="delivery-res">
                    <div className="col-md-6">
                      <h2 className="user-contact-title">Delivery Address :</h2>
                      <textarea
                        className="user-contact-text"
                        defaultValue={data.address}
                        onChange={(e) => {
                          e.preventDefault();
                          setAddress(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      <input type="text" className="user-contact-text" defaultValue={data.displayName}></input>
                      <h2 className="user-contact-title">First name :</h2>
                      <input type="text" className="user-contact-text" defaultValue={data.firstName}></input>
                      <h2 className="user-contact-title">Last name :</h2>
                      <input type="text" className="user-contact-text" defaultValue={data.lastName}></input>
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
                          setDateBirth(`${day}/${month}/${year}`);
                        }}
                      />
                      <div className="radio-row mt-2">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onClick={() => {
                            setGender("male");
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
                          checked={gender === "female"}
                          onClick={() => {
                            setGender("female");
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
                <button className="edit-pass-button mt-5">
                  <span>Edit Password</span> <img src="assets/img/right-icon.png" alt="" />
                </button>
                <button className="logout-button mt-3" onClick={logoutHandler}>
                  <span>Log out</span> <img src="assets/img/right-icon.png" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
