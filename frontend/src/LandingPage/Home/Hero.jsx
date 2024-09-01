import React from "react";

const Hero = () => {
  return (
    <div className="hero m-8 p-12">
      <div className="hero-content flex flex-col gap-8">
        <h2 className="text-3xl">
          Xpensigium <br />
          <span className=" sub-head text-xl">Your Smart Expense Tracker</span>
        </h2>
        
        <p>Comprehensive financial management, <span className=" simple text-violet-500">simplified.</span>
        <br />
        <span className="best ">Make the best choices for your money.</span></p>
      </div>
    </div>
  );
};

export default Hero;
