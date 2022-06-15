import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Message from "../SubComponent/Message";

const AddPromo = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [expired_date, setExpDate] = useState("");
  const [coupon_code, setCouponCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [product_id, setProductId] = useState(null);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.persist.userInfo.info);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API}/product`);
        setProduct(result.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.error : err.message);
      }
    })();
    document.title = "Juncoffe - Add Promo";
  }, []);

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
  const saveChange = () => {
    const body = {
      discount,
      expired_date: expired_date.replaceAll("-", "/"),
      coupon_code,
      name,
      description,
      product_id,
      photo: file,
      category_id: category,
    };
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    axios
      .post(`${process.env.REACT_APP_API}/promo`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
      .then((result) => {
        setMessage(result.data.message);
        setShowMessage(true);
      })
      .catch((err) => setError(err.response ? err.response.data.error : err.message));
  };
  return (
    <>
      <Message
        show={showMessage}
        onHide={() => {
          setShowMessage(false);
          window.location.reload();
        }}
        message={message}
        error={error}
      />
      <Header />
      <section className="detail-product">
        <div className="container-fluid">
          <div className="row my-5 row-content">
            <div className="col-md-4 text-center">
              <p className="top-text-left mb-5" onClick={() => navigate("/product")}>
                Favorite &amp; Promo <span className="product-text-left">&#8594; Add new promo</span>{" "}
              </p>
              <div class="photo-background-add">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Upload a photo</Tooltip>}>
                  {({ ref, ...triggerHandler }) => (
                    <>
                      <label htmlFor="foto" {...triggerHandler}>
                        {" "}
                        {fileUrl && !error.file ? (
                          <img src={fileUrl} ref={ref} width={200} height={200} className="product-image-add my-3 justify-content-center" alt="preview" />
                        ) : (
                          <img src={require("../../assets/img/photo-camera.png")} ref={ref} width={200} height={200} className="product-image-add my-3 justify-content-center" alt="profile" />
                        )}
                      </label>
                      <input type="file" className="foto-input" name="foto" id="foto" onChange={handleFoto} hidden></input>
                      {error.file ? <p className="text-danger fw-bold fs-6">{error.file}</p> : <></>}
                    </>
                  )}
                </OverlayTrigger>
              </div>
              <button class="take-pic-button mt-3">Take a picture</button>
              <br />

              <button className="gallery-button mt-3">
                <label htmlFor="foto" className="text-gallery">
                  Choose from gallery
                </label>
              </button>

              <h2 className=" text-start label-add-prod add-prod-top">Enter the discount:</h2>
              <input type="text" className="mt-3 w-100" placeholder="Input discount" onChange={(e) => setDiscount(e.target.value)} />
              <h2 className=" text-start label-add-prod add-prod-top">Expired date:</h2>
              <p class="product-size-add mt-2 border-0">Select start date</p>
              <input type="date" className=" w-100" />
              <br />
              <p class="product-size-add border-0 mt-3">Select end date</p>
              <input type="date" className=" w-100" onChange={(e) => setExpDate(e.target.value)} />
              <h2 className=" text-start label-add-prod add-prod-top">Coupon code:</h2>
              <input type="text" className="mt-3 w-100" placeholder="Input coupon code" onChange={(e) => setCouponCode(e.target.value)} />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className="top-product-title text-center fw-bold mt-4 ">{}</h2>
              <p className="top-product-desc mt-5 pe-5" id="top-product-desc-res">
                {}
              </p>
              <h2 className="top-product-desc-add mt-5">Name :</h2>
              <input type="text" className="user-contact-text mt-3" name="product_name" placeholder="Type promo name min. 50 characters" onChange={(e) => setName(e.target.value)} />
              <h2 className="top-product-desc-add mt-5"> Price :</h2>
              <input type="text" className="user-contact-text mt-3" name="product_price" placeholder="Type the price" />
              <h2 className="top-product-desc-add mt-5">Description :</h2>
              <input type="text" className="user-contact-text mt-3" onChange={(e) => setDesc(e.target.value)} name="product_desc" placeholder="Describe your promo min. 150 characters" />
              <h2 className="top-product-desc-add mt-5">Select Product Name :</h2>

              <Form.Select aria-label="Default select example" className="option-prod mt-4" onChange={(e) => setProductId(e.target.value)}>
                <option>Select product name you want to use for this promo</option>
                {product.map((val) => (
                  <option value={val.id}>{val.name}</option>
                ))}
              </Form.Select>
              <h2 className="top-product-desc-add mt-5">Input Category :</h2>
              <p class="product-size-add mt-4 border-0">Click category for this promo</p>
              <button
                className={category === 2 ? "product-add-cat-active mt-4" : "product-add-cat mt-4"}
                onClick={() => {
                  setCategory(2);
                }}
              >
                Coffee
              </button>
              <button
                className={category === 4 ? "product-add-cat-active mx-4" : "product-add-cat mx-4"}
                onClick={() => {
                  setCategory(4);
                }}
              >
                Non-Coffee
              </button>
              <button
                className={category === 1 ? "product-add-cat-active " : "product-add-cat "}
                onClick={() => {
                  setCategory(1);
                }}
              >
                Foods
              </button>
              <div className="row mt-5 p-0">
                <div className="col-md-12  ">
                  <button className=" cart-button-promo" onClick={saveChange}>
                    Save Promo
                  </button>
                </div>
              </div>
              <div className="row my-5 p-0">
                <div className="col-md-12  ">
                  <button
                    className=" cancel-add-product"
                    onClick={() => {
                      window.location.reload();
                      window.scrollTo({ behavior: "smooth", top: "0px" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddPromo;
