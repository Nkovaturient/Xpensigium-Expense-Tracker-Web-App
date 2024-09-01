import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dataObj } from "../Data/FormData";
import DoughnutChart from "./Expenses/DoughnutChart";
import { calcSum } from "../utils/helper";

const categories = [
  "Income",
  "Housing",
  "Transport",
  "Education",
  "Personal",
  "Savings",
];

const BudgetCalculator = () => {
  const { register, handleSubmit, resetField } = useForm();
  const [formData, setFormData] = useState({});
  const [currIndex, setCurrIndex] = useState(0);

  const [sum, setSum] = useState(new Array(categories.length).fill(0));

  const handleNext = (getCurrIndex) => {
    setCurrIndex(getCurrIndex + 1);
  };
  const handlePrevious = (getCurrIndex) => {
    setCurrIndex(getCurrIndex - 1);
  };

  const onSubmit = (data) => {
    // Convert object values to array and filter out empty strings
    const valuesArray = Object.values(data).map((num) => Number(num) || 0);
    const result = calcSum(valuesArray);

    setFormData(data);

    setSum((prevSum) => {
      const newSum = [...prevSum];
      newSum[currIndex - 1] = result;
      return newSum;
    });

    Object.keys(data).forEach((key) => resetField(key));
  };

  const budgetData = {
    labels: categories,
    datasets: [
      {
        label: "Estimated Value",
        data: sum || [100, 80],
        backgroundColor: [
          "rgba(255, 99, 132, 9.2)",
          "rgba(54, 162, 235, 9.2)",
          "rgba(155, 276, 45, 9.2)",
          "rgba(75, 192, 192, 9.2)",
          "rgba(153, 192, 255, 9.2)",
          "rgba(255, 92, 284, 9.2)",
          "rgba(69, 69, 69, 9.2)",
        ],
        borderRadius: 10,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <div className="wrapper flex justify-between flex-wrap gap-10">
        <div className="form-container max-w-sm">
          <h2 className="font-bold pb-4 text-2xl">Budget Calculator</h2>
          {dataObj.length > 0 &&
            dataObj.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={
                      currIndex === index ? "currData" : "currData hide-data"
                    }
                  >
                    <div className="form-heading">
                      <h2
                        key={index}
                        className="font-bold pb-4 text-xl text-center mt-4"
                      >
                        {item.title}
                      </h2>
                    </div>
                    <form
                      className="form-body grid gap-4"
                      id="form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {item.caption.map((label, index) => {
                        return (
                          <>
                            <div className="form-input-container" key={index}>
                              <label htmlFor={label}>{label}: </label>
                              <input
                                type="number"
                                {...register(`${label}`)}
                                name={`${label}`}
                                style={{ color: "#000", fontWeight: 500 }}
                              />
                            </div>
                          </>
                        );
                      })}

              
                        <button
                          onClick={() => handleNext(index)}
                          className="border py-2 text-white rounded mt-2"
                          style={{ backgroundColor: "#380477" }}
                        >
                          Next
                        </button>

                      <button
                        onClick={() => handlePrevious(index)}
                        disabled={currIndex === 0 ? true : false}
                        className="border py-2 text-white rounded mt-2"
                        style={{ backgroundColor: "#0d0d0d" }}
                      >
                        Back
                      </button>
                    </form>
                  </div>
                </>
              );
            })}
            <br /><hr />
          <ShowData sum={sum} />
        </div>
        <br />
        <div className="mx-auto w-96">
          <DoughnutChart data={budgetData} />
        </div>
      </div>
    </>
  );
};

export default BudgetCalculator;

const ShowData = ({ sum }) => {
  const income = sum[0] || 0;
  const saving = sum[5] || 0;
  const expenditure = sum
    .filter((el, index) => el && index !== 0 && index !== 5)
    .reduce((acc, curr) => acc + curr, 0);

  const totalExp = saving + expenditure;

  const netIncome = income - totalExp;

  return (
    <>
    <div  className="data-container w-96 mt-10">
      <div className="data-container flex flex-col justify-between w-96 mt-10">
        {categories.map((category, index) => (
          <div className="data-title flex justify-between" key={index}>
            <h2>{category}</h2>
            <b>💲{sum[index] || 0}</b>
          </div>
           
        ))}
        <hr />
      </div>

      
        <div className="data-wrapper-col mt-10 flex flex-col gap-4">

          <div className="data-title flex justify-between ">
            <h2>Monthly Expenses</h2>
            <b
              style={{
                padding: "8px",
                backgroundColor: "green",
                color: "#fff",
                border: "2px solid gray",
                borderRadius: "24px",
              }}
            >
              💲{totalExp ? totalExp : 0}
            </b>{" "}
           
          </div>
          <hr />
          <div className="data-title flex justify-between ">
            <h2>Net Income</h2>
            { netIncome && netIncome > 0 
            ? <b
            style={{
              padding: "9px",
              backgroundColor: "green",
              color: "#fff",
              border: "2px solid gray",
              borderRadius: "24px",
            }}
          >
            💲{netIncome ? netIncome : 0}
          </b>
          : <b
          style={{
            padding: "9px",
            backgroundColor: "red",
            color: "#fff",
            border: "2px solid gray",
            borderRadius: "24px",
          }}
        >
          💲{netIncome ? netIncome : 0}
        </b>
        }
            
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};
