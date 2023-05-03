import React, { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick: any;
};

const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="bg-dark-green text-white w-full rounded-lg py-3 px-4 max-w-md mt-8"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
