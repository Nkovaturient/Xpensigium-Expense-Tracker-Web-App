import React, { useContext } from "react";
import VerticalGraph from "./VerticalGraph";
import { StoreContext } from "../../Context/StoreContext";

const Report = () => {
  const { expData, navigate } = useContext(StoreContext);

  const labels = expData.map((exp) => exp.category);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: expData.map((exp) => exp.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 9.2)",
          "rgba(255, 159, 64, 9.2)",
          "rgba(255, 295, 86, 9.2)",
          "rgba(75, 192, 192, 9.2)",
          "rgba(54, 162, 235, 9.2)",
          "rgba(153, 192, 255, 9.2)",
          "rgba(201, 203, 207, 9.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 266, 85, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 162, 64, 1)",
          "rgba(255, 242, 73, 1)",
        ],
      },
    ],
  };

  return (
    <div
      className="report-container flex flex-col justify-evenly gap-4 p-2 "
      style={{ border: "1px solid gray" }}
    >
      <h1
        className="text-2xl w-full p-2"
        style={{ fontWeight: "600", borderBottom: `1px solid gray` }}
      >
        Monthly Report
      </h1>
      <div className="report-container my-6 flex  justify-evenly flex-wrap gap-10 ">
        <div className="spening-trend-chart">
          <VerticalGraph data={data} />
        </div>
        <div className="daily-expenses-chart">
          <VerticalGraph data={data} />
        </div>
      </div>
    </div>
  );
};

export default Report;
