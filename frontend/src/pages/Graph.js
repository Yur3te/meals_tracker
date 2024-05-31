import React from "react";
import CalorieGraph from "../components/CalorieGraph";
import './../style/App.css'

function Info() {
  const startDate = "2024-04-25";
  const endDate = "2024-05-30";

  return (
      <div className="flex justify-center">
        <CalorieGraph startDate={startDate} endDate={endDate} />
      </div>
  );
}

export default Info;
