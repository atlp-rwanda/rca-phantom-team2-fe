import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import{updateUser } from '../store/authApi';
// import { ThunkDispatch } from 'redux-thunk';
// import { RootState } from '../redux/store';



const UpdateProfile = () => {
  const [errortext, setErrortext] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const UpdateDispatch: any = useDispatch();
  const user = useSelector((state: any) => state.auth.userInfo);
  
  
  return (
    <>
     
        
          <div className='bg-white '>
            <div className='rounded bg-white px-20 py-10'>
              <h1 className='text-center text-3xl font-bold  max-[768px]:text-2xl'>Update Profile</h1>
              <p className='text-red-600 mt-4 text-center'>{errortext}</p>
              <Formik
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email:user.email,
                  roleId:user.roleId
                }}
                validationSchema={Yup.object({
                  fname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
                  lname: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    setIsLoading(true);
                    let resultAction = await UpdateDispatch(
                        updateUser(values),
                      );
                    
                    if (updateUser.fulfilled.match(resultAction)) {
                      setErrortext('');
                      setIsLoading(false);
                      setSubmitting(false);
                      // location.reload();
                    } else {
                      if (resultAction.payload) {
                        setErrortext(resultAction.payload.message);
                      }
                      setErrortext(resultAction.payload.message);
                    }
                    setIsLoading(false);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form className='h-full'>
                  <div className='grid grid-cols-2 max-[768px]:flex max-[768px]:flex-col'>
                    <div className='grid grid-cols-1'>
                      <div>
                        <label htmlFor='firstName' className='mb-2 mt-6 block font-bold'>
                          First Name
                        </label>
                        <Field
                          name='firstName'
                          type='text'
                          className='focus:shadow-outline w-10/12 appearance-none rounded border border-gray-300 px-6 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                          placeholder='Please Enter Your First Name'
                        />
                        <ErrorMessage name='firstName'>
                          {(msg) => <div className='text-red-500 my-1'>{msg}</div>}
                        </ErrorMessage>
                      </div>

                      <div>
                        <label htmlFor='lastName' className='mb-2 mt-6 block font-bold'>
                          Last Name
                        </label>
                        <Field
                          name='lastName'
                          type='text'
                          className='focus:shadow-outline w-10/12  appearance-none rounded border border-gray-300 px-6 py-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'
                          placeholder='Please Enter Your Last Name'
                        />
                        <ErrorMessage name='lastName'>
                          {(msg) => <div className='text-red-500 my-1'>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>

                  
                  </div>
                  <div className='item-center flex justify-center max-[768px]:justify-normal'>
                    <button
                      type='submit'
                      className='focus:shadow-outline mt-4 flex w-5/12 items-center justify-center rounded bg-black px-4 py-4 font-bold text-white focus:outline-none max-[768px]:w-full '
                    >
                 
                        Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
       
   
    </>
  );
};

export default UpdateProfile;
