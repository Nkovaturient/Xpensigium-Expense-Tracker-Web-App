import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";

const ExpenseForm = () => {
  const { url, token, navigate, fetchExpData } = useContext(StoreContext);
  const { register, handleSubmit, resetField } = useForm();
  const [formData, setFormData] = useState({});

  const onSubmit = async (data) => {
    setFormData(data);
    try {
      const response = await axios.post(`${url}/api/expense/add`, formData, {
        headers: {
          "Content-Type":"multipart/form-data",
        }
      });
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(`New Expense Added`, { theme: "dark" });
        // toast.info(`Changes may take some time to reflect`, {theme: 'dark'});
        await fetchExpData();
        setTimeout(()=>{
          navigate("/");
        }, 1000);
       } else {
        toast.error(`${response.data.message}`, { theme: "dark" });
      }
    } catch (err) {
      toast.error(`${err.message}`, { theme: "dark" });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, []);

  return (
    <>
      <div
        className="form-container max-w-sm w-96"
        style={{ margin: "0 auto" }}
      >
        <div className="form-heading">
          <h2 className="font-bold pb-4 text-xl">New Expense</h2>
        </div>
        <form
          className="form-body grid gap-4"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="amount">Amount(💲)</label>
          <input
            type="text"
            {...register("amount")}
            name="amount"
            placeholder="enter total amount"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            {...register("title")}
            name="title"
            placeholder="Salary, house rent, SIP"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            name="date"
            id="date"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            placeholder="give a short description for you to easily remember..."
            name="description"
            rows={5}
            cols={30}
            {...register("description")}
            required
          ></textarea>

          <label htmlFor="category">Category*</label>
          <select
            name="category"
            {...register("category")}
            className="form-input"
            style={{ color: "#000", fontWeight: 500 }}
          >
            <option value="Food and Groceries">Food and Groceries</option>
            <option value="House Rent">House Rent</option>
            <option value="Car Insurance">Car Insurance</option>
            <option value="Travel Expenses">Travel Expenses</option>
            <option value="Utility Bills">Utility Bills</option>
            <option value="Cell Phone Recharge">Cell Phone Recharge</option>
            <option value="Childcare and School Costs">
              Childcare and School Costs
            </option>
            <option value="Pet Care">Pet Care</option>
            <option value="Clothing and Accessories">
              Clothing and Accessories
            </option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Loans">Loans</option>
            <option value="Retirement">Retirement</option>
            <option value="Emergency">Emergency</option>
            <option value="Others">Others</option>
          </select>
          <button
            className="border py-2 text-white w-full mt-2"
            style={{ backgroundColor: "#380477" }}
          >
            <FontAwesomeIcon icon={faAdd} /> &nbsp; Create New Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm;
