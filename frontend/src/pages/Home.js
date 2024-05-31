import React from "react";

// import AddMealForm from "./../components/AddMealForm";
import AllMealsInDay from "./../components/AllMealsInDay";

import "./../style/App.css";

function Home() {

  return (
    <div>
        {/* <div className="add-meal">
            <AddMealForm/>
        </div> */}
    
        <AllMealsInDay />
    </div>
  );
}

export default Home;
