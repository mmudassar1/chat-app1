import React from "react";
const GenderCheckbox = ({ onChange, value }) => {
  return (
    <div className="flex mb-4 mt-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            value === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={value === "male"}
            onChange={() => onChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            value === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text"> Female </span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={value === "female"}
            onChange={() => onChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
