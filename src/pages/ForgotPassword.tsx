import { useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import config from "../config"

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true); 
    await axios.post(`${config.BASE_URL}/users/forgot-password/`, { email })
      .then(response => {
        console.log("Forgot password response:", response);
        setIsSubmitted(true);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error("Error sending email:", error);
        setIsLoading(false); 
      });
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <div className="lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll">
      <Navbar />
      <div className="mt-10 w-full max-w-md p-4 mx-auto">
        <h2 className="text-4xl font-bold text-center">Password Reset</h2>
        <p className="text-center text-sm mt-3">
          Enter your Phantom email address that you used to register. We'll send
          you an email with instructions to reset your password.
        </p>

        {isSubmitted ? (
          <div className="mt-5 text-center">
            <p className="text-lg">
              We've sent you an email with instructions to reset your password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mt-5">
              <label>Email</label>
              <Input
                type="email"
                name="email"
                placeholder="someone@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
