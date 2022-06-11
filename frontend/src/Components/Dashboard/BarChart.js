import React from "react";
import Loading from "../../Components/SubComponent/Loading";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { ThreeDots } from "react-bootstrap-icons";

const BarChart = ({ pdf }) => {
  const { loading, error, data } = useSelector((state) => state.transactionSum);
  const dataChart = {
    labels: data.map((val) => val.order_date.split("T")[0]),
    datasets: [
      {
        label: ["Income"],
        data: data.map((val) => val.rev),
        backgroundColor: ["#FFBA33"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div class="col-md-8">
      <div class="card chart-card pdf-export">
        <div class="card-body">
          <div class="row ">
            <div class="col-md-6">
              <h2 class="report-text mt-3">Daily Report</h2>
              <p class="report-text-p mb-3">Last 7 days</p>
            </div>
            <div class="col-md-6 text-end">
              <ThreeDots size={80} className="three-dots me-3" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 ">
              {loading ? (
                <Loading show={true} onHide={false} />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <Bar
                  data={dataChart}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="row p-0 my-5 ">
        <button className="download-report" onClick={() => pdf()}>
          Download Report
        </button>
      </div>
    </div>
  );
};

export default BarChart;
