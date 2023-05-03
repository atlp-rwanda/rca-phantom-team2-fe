import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import config from "../config";

export default function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmPassword: ''
  });
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    setIsLoading(true); // Set isLoading to true when resetting password
    await axios.post(`${config.BASE_URL}/users/reset-password/${token}`, {
      newPassword: values.password
    })
      .then(response => {
        console.log("Reset password response:", response);
        setIsSubmitted(true);
        setIsLoading(false); // Set isLoading to false after password is reset
      })
      .catch(error => {
        console.error("Error resetting password:", error);
        setIsLoading(false); // Set isLoading to false if there's an error
      });
  };

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll'>
      <Navbar />
      <div className='mt-10 w-full max-w-md p-4 mx-auto'>
        <h2 className='text-4xl font-bold text-center'>Reset Password</h2>
        <p className='text-center text-sm mt-3'>Create your new password.</p>
        {isSubmitted ? (
          <div className="mt-5 text-center">
            <p className="text-lg">
              Your account password was updated successfully
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mt-5">
              <label>New Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter a new password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5">
              <label className="mt-30">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm the password"
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
