import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Message from "../SubComponent/Message";

const EditProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDesc] = useState("");
  const { id } = useParams();

  const { token } = useSelector((state) => state.persist.userInfo.info);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API}/product/detail/${id}`);
        const { data } = result.data;
        const newPrice = data.price.split("Rp")[1];
        const newData = { ...data, price: newPrice };
        setProduct(newData);
      } catch (err) {
        setError(err.respose ? err.response.data.error : err.message);
      }
    })();
    document.title = "Juncoffe - Edit Product";
  }, [id]);

  const updateHandler = () => {
    const body = {
      name,
      price,
      description,
    };
    axios
      .patch(`${process.env.REACT_APP_API}/product/${id}`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        setMessage(result.data.message);
        setShowMessage(true);
      })
      .catch((er) => {
        setError(er.response ? er.response.data.error : er.message);
        setShowMessage(true);
      });
  };
  return (
    <>
      <Header />
      <Message
        show={showMessage}
        onHide={() => {
          setShowMessage(false);
          window.location.reload();
          window.scrollTo({ behavior: "smooth", top: "0px" });
        }}
        message={message}
        error={error}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {" "}
          <section class="edit-product">
            <div class="container-fluid">
              <div class="row mt-4">
                <div class="col-md-4 text-center">
                  <p className="top-text-left mb-5" onClick={() => navigate("/product", { replace: true })}>
                    Favorite &amp; Promo <span className="product-text-left">&#8594; {product.name} &#8594; Edit product</span>{" "}
                  </p>
                </div>
              </div>
              <div class="row">
                <div className="col-md-4 text-center">
                  <img src={require("../../assets/img/edit-product-img.png")} alt="" />
                  <p className="top-product-desc my-5 text-black">
                    Delivery only on <span className="day text-black">Monday to friday</span> at <span className="day text-black">1 - 7 pm</span>{" "}
                  </p>
                </div>
                <div class="col-md-6">
                  <input type="text" className="user-contact-text mt-3" name="product_name" defaultValue={product.name} placeholder="Type product name min. 50 characters" onChange={(e) => setName(e.target.value)} />
                  <input type="text" className="user-contact-text mt-5" name="product_price" defaultValue={product.price} placeholder="Type product price" onChange={(e) => setPrice(e.target.value)} />
                  <textarea rows={3} type="text" className="user-contact-text mt-5" name="product_desc" defaultValue={product.description} placeholder="Type product description" onChange={(e) => setDesc(e.target.value)} />
                  <input type="text" className="mt-5 w-100" placeholder="Select Size" />
                  <input type="text" className="mt-5 w-100" placeholder="Select Delivery Method" />
                  <div className="row mt-5 p-0 ">
                    <div class="col-md-4">
                      {" "}
                      <div className="countButton-edit">
                        <div className="minus"> - </div>

                        <div className="numb"> {"1"} </div>

                        <div className="minus"> + </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <span>
                        <button className="add-to-cart-edit">Add to Cart</button>
                      </span>
                    </div>
                  </div>
                  <button className="save-edit-prod w-100" onClick={updateHandler}>
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
};

export default EditProduct;
