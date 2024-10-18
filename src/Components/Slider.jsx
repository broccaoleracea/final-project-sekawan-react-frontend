import React, { useState } from "react";

const Slider = ({ onChange }) => {
  const [value, setValue] = useState(0); // Initialize state

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    console.log("Slider value changed:", newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex align-middle">
      <div className="flex-grow ">
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          className="range align-middle"
          onChange={handleSliderChange}
        />
      </div>
      <h2 className="text-lg font-bold mx-3">{value}</h2>
    </div>
  );
};

export default Slider;
