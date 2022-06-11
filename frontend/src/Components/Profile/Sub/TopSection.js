import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

const TopSection = ({ handleInputChange, handleFoto, fileUrl, error }) => {
  const { data } = useSelector((state) => state.getProfile);

  const profileImage = data && data.image ? `${process.env.REACT_APP_API}${data.image}` : require("../../../assets/img/default-img.webp");
  return (
    <div className="row my-4" id="user-contact-res">
      <div className="col-md-3">
        <div className="card card-profile-layout " id="card-profile-layout-res">
          <div className="card-body text-center mt-5">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Upload a photo</Tooltip>}>
              {({ ref, ...triggerHandler }) => (
                <>
                  <label htmlFor="foto" {...triggerHandler}>
                    {" "}
                    {fileUrl && !error.file ? <img src={fileUrl} ref={ref} className="user-profile-image" alt="preview" /> : <img src={profileImage} ref={ref} className="user-profile-image" alt="profile" />}
                  </label>
                  <input type="file" className="foto-input" name="foto" onChange={handleFoto} id="foto" hidden></input>
                  {error.file ? <p className="text-danger fw-bold fs-6">{error.file}</p> : <></>}
                </>
              )}
            </OverlayTrigger>

            <h2 className="card-title mt-3">{data && data.name}</h2>
            <p className="text-center email-text">{data && data.email}</p>
            <p className="product-ordered text-center mt-4">Has been ordered {data.total_order} product(s)</p>
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
                <input type="text" className="user-contact-text" defaultValue={data && data.email} name="email" placeholder="Email Address" disabled />
              </div>
              <div className="col-md-5">
                <h2 className="user-contact-title">Mobile number :</h2>
                <input type="text" className="user-contact-text" defaultValue={data && data.phone_number} onChange={handleInputChange} name="phone_number" placeholder="Phone Number" />
                {error && error.phone_number ? <p className="text-danger fw-bold fs-6">{error.phone_number}</p> : <></>}
              </div>
            </div>
            <div className="row mt-3 ps-3" id="delivery-res">
              <div className="col-md-6">
                <h2 className="user-contact-title">Delivery Address :</h2>
                <textarea className="user-contact-text" name="address" defaultValue={data && data.address} onChange={handleInputChange} placeholder="Delivery Address"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
