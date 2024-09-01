import React, { useContext } from "react";
import QuickAccess from "./QuickAccess";
import Report from "./Report";
import ExpenseHistory from "../ExpenseHistory";
import { StoreContext } from "../../Context/StoreContext";
import Spinner from "../Spinner";
import Hero from "./Hero";

const HomePage = () => {
  const { loading } = useContext(StoreContext);
  return (
    <>
      <div className="home-page flex flex-col justify-content  gap-12">
        <div
          style={{ border: "1px solid gray" }}
          className="quick-access-container flex justify-evenly flex-wrap gap-4 p-2"
        >
          <Hero />
          <div className="home-recents w-80 mx-auto">
            {loading ? <Spinner /> : <ExpenseHistory />}
          </div>
        </div>

        <div className="quick-access">
          <QuickAccess />
        </div>

        {loading ? <Spinner /> : <Report />}
      </div>
    </>
  );
};

export default HomePage;
