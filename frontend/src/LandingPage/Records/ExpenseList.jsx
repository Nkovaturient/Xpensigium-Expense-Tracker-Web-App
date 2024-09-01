import {
  faAdd,
  faBarsProgress,
  faCalculator,
  faDeleteLeft,
  faEdit,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const { deleteExpData, expData, navigate, fetchExpData } = useContext(StoreContext);


    useEffect(()=>{
      fetchExpData();
    }, []);

  return (
    <>
      <div className="list-container">
        <div className="list-head flex justify-between align-center ">
          <div className="left-item">
            <h1 className="title">Expenses</h1>
          </div>
          <div className="right-item my-4">
            <button
              onClick={() => navigate("/addexpense")}
              className="border mx-4 py-2 text-white w-40  mt-2"
              style={{ backgroundColor: "#380477" }}
            >
              <FontAwesomeIcon icon={faAdd} /> &nbsp; New Expense
            </button>
            <button
              onClick={() => navigate("/calc")}
              className=" border py-2 text-white w-40  mt-2"
              style={{ backgroundColor: "#380477" }}
            >
              <FontAwesomeIcon icon={faCalculator} /> &nbsp; Budget Calculator
            </button>
          </div>
        </div>

        <div
          className="order-table my-4 p-4"
          style={{ border: "2px solid gray" }}
        >
          <table
            style={{ borderColor: "8px solid #380477", borderRadius: "14px" }}
            className="my-4 p-4"
          >
            <thead>
              <tr style={{ borderBottom: "1px solid gray" }}>
                <th>Category</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {expData.length > 0 &&
                expData.map((exp, index) => {
                  return (
                    <tr key={index}>
                      <td>{exp.category}</td>
                      <td>{exp.description}</td>
                      <td>💲{exp.amount}</td>
                      <td>{exp.date.slice(0, 10)}</td>
                      <td>
                        <Link
                          to={`/expenses/edit/${exp._id}`}
                          className="text-2xl mx-4 gap-8"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          className="text-2xl"
                          onClick={() => deleteExpData(exp._id)}
                        >
                          <FontAwesomeIcon icon={faDeleteLeft} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td>Travel Expenses(default)</td>
                <td>Airlines</td>
                <td>💲150.00</td>
                <td>2022-12-15</td>
                <td>
                  <button className="text-2xl mx-4">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-2xl">
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
