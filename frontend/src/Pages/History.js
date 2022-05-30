import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const History = () => {
  useEffect(() => {
    document.title = "Juncoffee - History";
  }, []);
  return (
    <>
      <Header />
      <section class="history">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <h1 class="history-title text-center mt-5">Let's see what you have bought!</h1>
              <p class="history-text text-center">Select item to delete item</p>
            </div>
          </div>
          <div class="row text-end">
            <div class="col-md-12">
              <p class="delete-text me-5 pe-5" id="delete-text-res">
                Select All
              </p>
            </div>
          </div>
          <div class="row mt-4 pe-5 me-3 card-history-row">
            <div class="col-md-4 ">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 pe-5 me-3 card-history-row">
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 pe-5 me-3 card-history-row">
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 pe-5 me-3 card-history-row">
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 pe-5 me-3 card-history-row">
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-history-layout">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <img src={require("../assets/img/history-image.png")} alt="" />
                    </div>
                    <div class="col-md-9">
                      <h2 className="card-history-title mt-3 fw-bolder">Veggie tomato mix</h2>
                      <p className="card-history-text m-0">IDR 34.000</p>
                      <div class="row p-0 mt-3">
                        <div class="col-md-8">
                          <p className="card-history-text">Delivered</p>
                        </div>
                        <div class="col-md-3">
                          <span>
                            <label for="delete"></label>
                            <input type="checkbox" name="delete" id="" class="check-col text-end" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default History;
