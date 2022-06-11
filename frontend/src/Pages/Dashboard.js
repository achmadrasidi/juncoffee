import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../Redux/Actions/OrderActions";
import BarChart from "../Components/Dashboard/BarChart";
import DoughChart from "../Components/Dashboard/DoughChart";
import html2canvas from "html2canvas";
import pdfConverter from "jspdf";

const Dashboard = () => {
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.persist.userInfo.info);
  const div2PDF = () => {
    let input = window.document.getElementsByClassName("pdf-export")[0];
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png", 1.0);
      const pdf = new pdfConverter("l", "mm", "a4");
      pdf.addImage(img, "png", 10, 10, 280, 180);
      pdf.save("summary.pdf");
    });
  };
  useEffect(() => {
    document.title = "Juncoffee - Dashboard";

    dispatch(getTransaction(token));
  }, [dispatch]);

  return (
    <>
      <Header />
      <section class="dashboard">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <h1 className="sum-title text-center mt-3">See how your store progress so far</h1>
            </div>
            <div></div>
          </div>
          <div class="row text-center mb-3">
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="row p-0">
                <div class="col-md-4">
                  {" "}
                  <input type="radio" name="gender" value="card" checked />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0"></label>
                  <p className="male-icon-text me-1 mb-0 text-black fw-bolder">Daily</p>
                </div>
                <div class="col-md-4">
                  {" "}
                  <input type="radio" name="gender" value="card" />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0"></label>
                  <p className="male-icon-text me-1 mb-0 text-black">Weekly</p>
                </div>
                <div class="col-md-4">
                  {" "}
                  <input type="radio" name="gender" value="card" />
                  <label htmlFor="gender" className="male-icon-text ms-3 mb-0"></label>
                  <p className="male-icon-text me-1 mb-0 text-black">Monthly</p>
                </div>
              </div>
            </div>
            <div class="col-md-4"></div>
          </div>
          <div class="row">
            <BarChart pdf={div2PDF} />
            <DoughChart />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
