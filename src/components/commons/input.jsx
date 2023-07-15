import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // const Input = ({ type, name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //autoFocus
        id={name}
        name={name}
        error={error}
        {...rest}
        // type={type}
        // value={value}
        // onChange={onChange}        
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
