import { useState } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../store/authApi';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";



export default function SignIn (){
  const [errortext, setErrortext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
const  dispatch: any = useDispatch();
  const navigate = useNavigate();
 
  return (

    <div className='flex h-screen'>

<div className='hidden sm:block w-1/2'>
  <div className='bg-bgsecondary  w-full h-full  flex justify-center items-center '>

    <div className="w-full h-full main--login-bg p-16 md:p-8">
  {/* inner bg */}

  <div className="backdrop-blur-md bg-white/30 h-full border-4 border-white w-full rounded-xl relative" >

 
 <div className="flex ml-10 mt-10" >
  {/* rome-ignore lint/a11y/useAltText: <explanation> */} 
   <img src="/assets/Logo.png" className="w-24 h-24 md:w-20 md:h-20" />
 <h2 className='text-gray-400 font-semibold text-lg px-10 py-10 md:py-5' > - Your Bus, Your Seat</h2>
 
 </div>
{/* rome-ignore lint/a11y/useAltText: <explanation> */}
<img src="/assets/quotes.png" className="w-6 h-6 ml-10 mt-12" />

<div className="">
<h1 className='ml-5 mb-5 px-20 font-bold text-3xl text-bgprimary '>I no longer miss
my schedules because
of waiting hours
for a bus!</h1>
<div className="flex justify-start">
<h1 className='px-24 py-5 font-semibold text-3xl text-bgyellow lg:font-medium md:text-2xl '>-John</h1>
</div>
{/* rome-ignore lint/a11y/useAltText: <explanation> */} 
<img src="/assets/shelter_bus.png" className=" ml-32 mt-8  w-3/5  md:mt-10"  />
</div>
  </div>
  </div>
    </div>
  


</div>

{/* form side */}
<div className='md:w-1/2 flex flex-col justify-center lg:px-40 px-10 py-10 lg:py-72'>
  <h1 className='text-2xl font-bold mb-3 text-green-900'>Login to Phantom </h1>
        <p className='py-1 text-base border-gray-300 text-gray-400'>Welcome back to your account</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout( async() => {
              setLoading(true);
              const resultAction = await dispatch(login({ email: values.email, password: values.password, device_id: window.location.hostname }));
              if (login.fulfilled.match(resultAction)) {
                setErrortext("");
                setLoading(false);
                setSubmitting(false);
                navigate('/dashboard');
              } else {
                if(resultAction.payload){
                  setErrortext(resultAction.payload.message);
                }
                setErrortext(resultAction.payload.message);
              }
              setLoading(false);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className='flex flex-col justify-center'>
            <label htmlFor='email' className='mb-2 mt-6 font-base text-green-900'>
              Email Address
            </label>
            <Field
              name='email'
              type='email'
              className='focus:shadow-outline w-full  appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Email'
            />
            <ErrorMessage name='email'>{(msg) => <div className='my-1 text-red-500 text-sm'>{msg}</div>}</ErrorMessage>

            <label htmlFor='password' className='mb-2 mt-6 font-base text-green-900'>
              Password
            </label>
            <Field
              name='password'
              type='password'
              className='focus:shadow-outline w-full appearance-none rounded border border-gray-300 py-4 px-6 leading-tight text-gray-700 focus:outline-none'
              placeholder='Please Enter Your Password'
            />
            <ErrorMessage name='password'>{(msg) => <div className='my-1 text-red-500 text-sm'>{msg}</div>}</ErrorMessage>
            <div>{
              (errortext && <div className='my-1 text-red-500 text-xs'>{errortext}</div>)
              }</div>
              <Link to="/forgot-password">
              <div className='text-bgyellow mt-6'> Forgot your password?</div></Link>
            <button
              type='submit'
              className='flex items-center justify-center focus:shadow-outline mt-10 font-bold bg-bgprimary text-white py-4 px-4 rounded'
            >
              {
                (loading?  <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="#fff"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                
                />: "Sign In")
              }
            </button>
            <div className="text-bgprimary mt-10">Do not have an account yet? <a className='text-bgyellow' href="">Register here</a></div>
          </Form>
        </Formik>
</div>
    </div>
  );
}
