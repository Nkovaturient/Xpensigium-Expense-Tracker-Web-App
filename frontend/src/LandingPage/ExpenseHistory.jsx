import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const obj = [
  {
    name: "Savings",
    color: "#109F70",
  },
  {
    name: "Investment",
    color: "#f9c74f",
  },
  {
    name: "Expense",
    color: "#059BFF",
  },
  {
    name: "Commodities",
    color: "#FF6384",
  },
];

const ExpenseHistory = () => {
  const { expData, deleteExpData } = useContext(StoreContext);

  return (
    <>
      <div className="flex flex-col py-6 gap-3">
        <h1 className="py-4 text-md font-bold text-xl">History</h1>

        {/* {expData.map((v, index) => {
          return <ExpenseTransaction key={index} category={v} deleteExpData={deleteExpData} />;
        })} */}
        {expData
  .sort((a, b) => b.category.localeCompare(a.category))  // Sort in descending order by category
  .map((v, index) => {
    return <ExpenseTransaction key={index} category={v} deleteExpData={deleteExpData} />;
  })}
      </div>
    </>
  );
};

export default ExpenseHistory;

const ExpenseTransaction = ({ category, deleteExpData }) => {
  if (!category) return <></>;

  const bgc = [
    "rgba(255, 99, 132, 9.2)",
    "rgba(54, 162, 235, 9.2)",
    "rgba(255, 266, 85, 9.2)",
    "rgba(75, 192, 192, 9.2)",
    "rgba(153, 192, 255, 9.2)",
    "rgba(255, 162, 64, 9.2)",
    "rgba(225, 62, 234, 9.2)",
  ];
  const length = bgc.length;
  const color = Math.floor(Math.random() * length) + 1;
  const bgcolor = bgc[color];

  return (
    <>
      <div
        style={{
          backgroundColor: "#380477",
          borderRight: `8px solid ${bgcolor}`,
          color: "#fff",
          fontWeight: 500,
        }}
        className="item flex justify-center text-center py-2 rounded-r"
      >
        <button className="px-3" onClick={()=> deleteExpData(category._id)} >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <span className="block w-full">{category.category}</span>
      </div>
    </>
  );
};
