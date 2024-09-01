import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCalendar,
  faChartPie,
  faMoneyBillAlt,
  faNoteSticky,
  faReceipt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const QuickAccess = () => {
  return (
    <div
      style={{ border: "1px solid gray" }}
      className="quick-access-container flex flex-col justify-evenly gap-4 p-2"
    >
      <h1
        className="text-2xl w-full p-2"
        style={{ fontWeight: "600", borderBottom: `1px solid gray` }}
      >
        Quick Access
      </h1>
      <div className="qa-tabs-container my-4 flex justify-evenly flex-wrap gap-10 ">
        <div className="qa-tabs">
          <Link to={"/addexpense"}>
            <FontAwesomeIcon icon={faWallet} />
            <b> Add your Expense</b>
          </Link>
        </div>
        <div className="qa-tabs">
          <Link to={"/calc"}>
            <FontAwesomeIcon icon={faCalculator} />
            <b>Friendly Budget Calculator</b>
          </Link>
        </div>
        <div className="qa-tabs">
          <Link to={"/expenses"}>
            <FontAwesomeIcon icon={faChartPie} />
            <b> Visualize</b>
          </Link>
        </div>
        <div className="qa-tabs">
          <Link to={"/records"}>
            <FontAwesomeIcon icon={faCalendar} />
            <b> Categorized</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
