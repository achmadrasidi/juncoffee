import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const AddProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className="detail-product">
        <div className="container-fluid">
          <div className="row my-5 row-content">
            <div className="col-md-4 text-center">
              <p className="top-text-left mb-5" onClick={() => navigate("/product")}>
                Favorite &amp; Promo <span className="product-text-left">&#8594; Add new product</span>{" "}
              </p>
              <div class="photo-background-add">
                <img src={require("../../assets/img/photo-camera.png")} alt="" width={200} height={200} className=" product-image-add my-3 justify-content-center" />
              </div>
              <button class="take-pic-button mt-3">Take a picture</button>
              <br />
              <button className="gallery-button mt-3">Choose from gallery</button>
              <h2 className=" text-start label-add-prod add-prod-top">Delivery Hour:</h2>
              <p class="product-size-add mt-2 border-0">Select start hour</p>
              <input type="time" className=" w-100" />
              <br />
              <p class="product-size-add border-0 mt-3">Select end hour</p>
              <input type="time" className=" w-100" />
              <h2 className=" text-start label-add-prod add-prod-top">Input stock:</h2>
              <input type="number" min={0} className="mt-3 w-100" />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className="top-product-title text-center fw-bold mt-4 ">{}</h2>
              <p className="top-product-desc mt-5 pe-5" id="top-product-desc-res">
                {}
              </p>
              <h2 className="top-product-desc-add mt-5">Name :</h2>
              <input type="text" className="user-contact-text mt-3" name="product_name" placeholder="Type product name min. 50 characters" />
              <h2 className="top-product-desc-add mt-5">Price :</h2>
              <input type="text" className="user-contact-text mt-3" name="product_price" placeholder="Type the price" />
              <h2 className="top-product-desc-add mt-5">Description :</h2>
              <input type="text" className="user-contact-text mt-3" name="product_desc" placeholder="Describe your product min. 150 characters" />
              <h2 className="top-product-desc-add mt-5">Input Product Size :</h2>
              <p class="product-size-add mt-2 border-0">Click size you want to use for this product</p>
              <button className="size-add-prod mt-2">R</button>
              <button className="size-add-prod mx-4">L</button>
              <button className="size-add-prod">XL</button>
              <button className="size-add-prod ms-4">250 gr</button>
              <button className="size-add-prod mx-4">300 gr</button>
              <button className="size-add-prod">500 gr</button>
              <h2 className="top-product-desc-add mt-5">Input Category :</h2>
              <p class="product-size-add mt-2 border-0">Click category for this product</p>
              <button className="product-add-cat mt-2">Coffee</button>
              <button className="product-add-cat mx-4">Non-Coffee</button>
              <button className="product-add-cat">Foods</button>
              <div className="row mt-5 p-0">
                <div className="col-md-12  ">
                  <button className=" cart-button">Save Product</button>
                </div>
              </div>
              <div className="row my-5 p-0">
                <div className="col-md-12  ">
                  <button className=" cancel-add-product">Cancel</button>
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

export default AddProduct;
