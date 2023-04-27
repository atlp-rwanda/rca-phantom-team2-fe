import React from 'react';

interface InputProps {
type: string;
name: string;
placeholder?: string;
required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, required }) => {
return (
<input 
    type={type} 
    name={name} 
    placeholder={placeholder} 
    required={required} 
    className='border-2 border-black border-opacity-25 block outline-none p-2 w-full max-w-md rounded-lg mt-2'
    />
);
};

export default Input;