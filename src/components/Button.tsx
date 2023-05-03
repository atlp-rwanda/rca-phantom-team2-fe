import React, { ReactNode } from 'react';

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button 
        type={type}
        className='bg-green-900 text-white w-full rounded-lg py-3 px-4 max-w-md mt-8'
    >{children}</button>
  );
};

export default Button;
