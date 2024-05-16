import React from "react";
import BMRCalculations from "./../components/BMRCalculations";

import './../style/App.css'

function Info() {
  return (
    <div>
      <div className="info">
        <BMRCalculations />
      </div>
      {/* https://online.visual-paradigm.com/spreadsheet-editor/calculator/health/katch-mcardle-calculator/ */}
    </div>
  );
}

export default Info;
