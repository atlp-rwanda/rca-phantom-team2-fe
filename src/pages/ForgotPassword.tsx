import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button"

export default function ForgotPassword () {
    return (
        <div className='lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll'>
            <Navbar />
            <div className='mt-5 w-full max-w-md p-4 mx-auto'>
                <h2 className='text-4xl font-bold text-center'>Password Reset</h2>
                <p className='text-center text-sm mt-3'>Enter your Phantom email address that you used to register. We'll send you an email with instructions to reset your password.</p>

                <form className='mt-8'>
                    <label>Email</label>
                    <Input type="email" name="email" placeholder="someone@example.com" required/>
                    <Button type="submit">Send</Button>
                </form>

            </div>
        </div>
    )
}