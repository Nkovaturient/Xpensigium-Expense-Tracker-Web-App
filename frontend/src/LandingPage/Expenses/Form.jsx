import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import ExpenseHistory from "../ExpenseHistory";
import { StoreContext } from "../../Context/StoreContext";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();
  const{navigate}=useContext(StoreContext);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div
        className="form-container max-w-sm mx-auto w-96"
        style={{ marginRight: "5.1rem" }}
      >
        {/* <div className="form-heading">
          <h2 className="font-bold pb-4 text-xl">New Expense</h2>
        </div>
        <form
          className="form-body grid gap-4"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("amount")}
            name="amount"
            placeholder="enter total amount"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />
          <input
            type="text"
            {...register("title")}
            name="title"
            placeholder="Salary, house rent, SIP"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />

          <label htmlFor="category">Category*</label>
          <select
            name="category"
            {...register("category")}
            className="form-input"
            style={{ color: "#000", fontWeight: 500 }}
          >
            <option value="investment" defaultValue>
              Investment
            </option>
            <option value="expense">expense</option>
            <option value="savings">savings</option>
            <option value="commodities">commodities</option>
          </select>
          <button onClick={() => navigate("/calc")}
            className="border py-2 text-white w-full mt-2"
            style={{ backgroundColor: "#380477" }}
          >
            <FontAwesomeIcon icon={faAdd} /> &nbsp; Create New Expense
          </button>
        </form> */}

        <ExpenseHistory />
      </div>
    </>
  );
};

export default Form;
