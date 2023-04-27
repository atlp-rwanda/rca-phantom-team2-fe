import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button"

export default function ResetPassword () {
    return (
        <div className='lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll'>
            <Navbar />
            <div className='mt-10 w-full max-w-md p-4 mx-auto'>
                <h2 className='text-4xl font-bold text-center'>Reset Password</h2>
                <p className='text-center text-sm mt-3'>Create your new password.</p>

                <form>
                    <div className="mt-5">
                        <label>New Password</label>
                        <Input type="password" name="password" placeholder="Enter a new password" required/>
                    </div>
                    <div className="mt-5">
                        <label className="mt-30">Confirm Password</label>
                        <Input type="password" name="email" placeholder="Confirm the password" required/>
                    </div>
                    <Button type="submit">Reset Password</Button>
                </form>

            </div>
        </div>
    )
}