// src/components/FormInput.js
import React from 'react';

function FormInput({ type, placeholder, value, onChange }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default FormInput;