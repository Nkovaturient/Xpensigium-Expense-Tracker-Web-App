import { faAdd, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";

const EditExpense = () => {
  const { id } = useParams();

  const { url, fetchExpData, token, navigate, loading, setLoading } =
    useContext(StoreContext);

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    title: "",
    category: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("amount", formData.amount);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("category", formData.category);

      setLoading(true);
      const response = await axios.patch(`${url}/api/expense/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data", //config multer for handling multipart/form-data
        },
      });
      setLoading(false);

      if (response.data.success) {
        // console.log('updated--',response.data.message);
        toast.success(`Updated Expense Details`, { theme: "dark" });
        await fetchExpData(); //to refresh data
        setTimeout(() => {
          navigate("/records");
        }, 1050);
      } else {
        toast.error(`${response.data.message}`, {
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error(`${err.message}`, { theme: "dark" });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error(`You must login before editing`, { theme: "dark" });
      navigate("/login");
    } else {
      setLoading(true);
      axios
        .get(`${url}/api/expense/edit/${id}`)
        .then((response) => {
          setLoading(false);
          const result = response.data.message;
          const date = result.date;
          setFormData({
            amount: result.amount,
            date: date.slice(0, 10),
            description: result.description,
            title: result.title,
            category: result.category,
          });

          toast.success(`You are about to edit this expense details`, {
            theme: "dark",
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.message}`, { theme: "dark" });
        });
    }
  }, []);

  return (
    <>
      <div
        className="form-container max-w-sm w-96"
        style={{ margin: "0 auto" }}
      >
        {loading ? <Spinner /> : ""}
        <div className="form-heading">
          <h2 className="font-bold pb-4 text-xl">New Expense</h2>
        </div>
        <form
          className="form-body grid gap-4"
          id="form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="amount">Amount(💲)</label>
          <input
            type="text"
            name="amount"
            onChange={handleOnChange}
            value={formData.amount}
            placeholder="enter total amount"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            value={formData.title}
            placeholder="Salary, house rent, SIP"
            style={{ color: "#000", fontWeight: 500 }}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            onChange={handleOnChange}
            value={formData.date}
            id="date"
            style={{ color: "#000", fontWeight: 500 }}
          />

          <label htmlFor="description">Description</label>
          <textarea
            placeholder="give a short description for you to easily remember..."
            name="description"
            rows={5}
            onChange={handleOnChange}
            value={formData.description}
            cols={30}
          ></textarea>

          <label htmlFor="category">Category*</label>
          <select
            name="category"
            className="form-input"
            onChange={handleOnChange}
            value={formData.category}
            style={{ color: "#000", fontWeight: 500 }}
          >
            <option value="Food and Groceries">Food and Groceries</option>
            <option value="House Rent">House Rent</option>
            <option value="Car Insurance">Car Insurance</option>
            <option value="Travel Expense">Travel Expense</option>
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
            <FontAwesomeIcon icon={faUpload} /> &nbsp; Update Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default EditExpense;
