import React from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value?: string; 
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, required, onChange }) => {
  return (
    <input 
      type={type} 
      name={name} 
      placeholder={placeholder} 
      required={required} 
      className='border-2 border-black border-opacity-25 block outline-none p-2 w-full max-w-md rounded-lg mt-2'
      value={value} 
      onChange={onChange} 
    />
  );
};

export default Input;
