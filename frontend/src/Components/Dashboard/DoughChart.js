import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ThreeDots } from "react-bootstrap-icons";
import { RWebShare } from "react-web-share";

const DoughChart = () => {
  const dataEmploy = {
    lebels: ["test"],
    datasets: [
      {
        label: ["test"],
        data: [80, 20],
        backgroundColor: ["#4A8E07", "#7388A95A"],
      },
    ],
  };
  const dataTarget = {
    lebels: ["test"],
    datasets: [
      {
        label: ["test"],
        data: [76, 24],
        backgroundColor: ["#FFBA33", "#6A4029"],
      },
    ],
  };
  return (
    <div class="col-md-4">
      <div class="row p-0 row-top-statistic">
        <div class="card card-statistic chart-card ">
          <div class="card-body">
            <div class="row p-0 row-top-employ">
              <div class="col-md-3">
                <img src={require("../../assets/img/image 51.png")} alt="image-51" className="image-employ" />
              </div>
              <div class="col-md-8">
                <h4 class="employ-title fw-bolder">Cheryn Laurent</h4>
                <p class="employ-text">Keep up the good work and spread love!</p>
              </div>
            </div>
            <div class="row text-center mt-3">
              <div class="col-md-12">
                <h4 className="employ-title">Best Staff of the Month</h4>
                <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-3">
                    {" "}
                    <Doughnut
                      data={dataEmploy}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        },
                        aspectRatio: 1,
                      }}
                      plugins={[
                        {
                          beforeDraw(chart) {
                            const { width } = chart;
                            const { height } = chart;
                            const { ctx } = chart;
                            ctx.restore();
                            const fontSize = (height / 100).toFixed(2);
                            ctx.font = `${fontSize}em rubik`;
                            ctx.textBaseline = "top";
                            const text = "80%";
                            const textX = Math.round((width - ctx.measureText(text).width) / 2);
                            const textY = height / 2.7;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                          },
                        },
                      ]}
                    />
                  </div>
                </div>

                <p class="text-achieve">Achieved 3.5M of total 5M 478 Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row p-0 row-top-statistic mt-3">
        <div class="card card-statistic chart-card ">
          <div class="card-body">
            <div class="row text-center mt-1">
              <div class="col-md-12">
                <h4 class="goals-title">Goals</h4>
                <p class="goals-text">Your goals is still on 76%. Keep up the good work!</p>
                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-6 ms-4 ">
                    <Doughnut
                      data={dataTarget}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        },
                        aspectRatio: 1,
                      }}
                      plugins={[
                        {
                          beforeDraw(chart) {
                            const { width } = chart;
                            const { height } = chart;
                            const { ctx } = chart;
                            ctx.restore();
                            const fontSize = (height / 100).toFixed(2);
                            ctx.font = `${fontSize}em rubik`;
                            ctx.textBaseline = "top";
                            const text = "76%";
                            const textX = Math.round((width - ctx.measureText(text).width) / 1.9);
                            const textY = height / 2.5;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                          },
                        },
                      ]}
                    />
                    <ThreeDots size={50} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row p-0 row-top-statistic my-5">
        <RWebShare
          data={{
            text: "Share this report",
            url: "https://drive.google.com/file/d/1cbiACy2BrBor8Wn4GK2ywQU66ObhXxKZ/view?usp=sharing",
            title: "Share this report",
          }}
          sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", "mail", "copy", "vk"]}
        >
          <button className="share-report">Share Report</button>
        </RWebShare>
      </div>
    </div>
  );
};

export default DoughChart;
