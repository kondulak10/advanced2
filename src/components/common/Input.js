import React from 'react';

const Input = ({ name, label, onChange, type, value }) => {
  return (
    <div className="input-group" style={{marginBottom: "15px"}}>
      <span className="input-group-addon" id={name}>{label}</span>
      <input
      name={name}
      type={type}
      className="form-control"
      placeholder={label}
      aria-describedby={name}
      onChange={onChange}
      value={value}
      />
    </div>
  )
}

export default Input;
