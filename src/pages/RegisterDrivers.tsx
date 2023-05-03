import Searchbar from "../components/Searchbar";
import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const updateProfileValidationSchema = yup.object().shape({
 
  first_name: yup
  .string()
  .required("first name is required"),
  last_name: yup
  .string()
  .email("Please enter valid email")
  .required("last name is required"),
  email: yup
  .string()
  .required("Email is required"),

});

export default function Updateprofile() {
  const navigate = useNavigate();


  const handleSubmitUpdate=async (data)=>{
        
    try {
        const response = await axios.put("http://localhost:4000/api/users/updateUser/:id", data);
        console.log(response.data.message);
        if(response.data.success === true) navigate('/login');

    } catch (error) {
        console.log(error.message)
    }
}

  return (
    <div className="lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll overflow-x-hidden">
      <Searchbar />
     
    
      <div className="flex flex-wrap lg:mt-24 mt-20 w-full">
        <div className="lg:w-1/2 flex flex-col lg:justify-normal justify-center items-center lg:items-start">
        
         
        </div>
        <div className=" w-full relative lg:flex md:h-auto h-56 flex justify-center items-center mt-14 lg:mt-0">
               <Formik validationSchema={updateProfileValidationSchema}
        initialValues={{
            
            first_name:"",
            last_name:"",
            email: "",
            
         
        }}
        onSubmit={(values) => handleSubmitUpdate(values)}>

{({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="row" onSubmit={handleSubmit}>
            

            <div className="mb-3 col-6">
              <label htmlFor="first_name" className="form-label">
                Driver Id
              </label><br />
              <input
                type="text"
                name="first_name"
                id="first_name"
                className=" p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />

              <div className="text-rose-600 my-2">
                {errors.first_name && touched.first_name && errors.first_name}
              </div>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="last_name" className="form-label">
                Last name
              </label><br />
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />

              <div className="text-rose-600 my-2">
                {errors.last_name && touched.last_name && errors.last_name}
              </div>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label> <br />
              <input
                type="email"
                name="email"
                id="exampleInputEmail1"
                className="mt-2 p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <div className="text-rose-600 my-2">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
           
            

            <button
              type="submit"
              disabled={isSubmitting}
              className="lg:mt-14 mt-8 bg-dark-green py-2.5 w-32 text-white rounded-md text-xs text-center font-semibold cursor-pointer"
            >
              UPDATE
            </button>
          </form>
        )}

               </Formik>
               {/* <form>
               <h2 className='font-bold my-5 text-2xl'>Update Profile</h2>
                   <h2 className='text-slate-500 text-base my-5'>Update Your Profile</h2>
                   <label htmlFor="email" className="text-xs">Email</label> <br />
                   <input type="text"  name='email' className="p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"  required  /> <br />
                   <label htmlFor="fname" className="text-xs">First name</label> <br />
                   <input type="text"  name="fname" className="p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"  required/>  <br />
                   <label htmlFor="lname" className="text-xs">Last name</label> <br />
                   <input type="text"  name="lname" className="p-2 w-75 rounded border h-12 mb-2 border-2 border-gray-300"  required/>  <br />
                  
                   <br />
                 
                   <input type="submit" value="UPDATE"  className='lg:mt-14 mt-8 bg-dark-green py-2.5 w-32 text-white rounded-md text-xs text-center font-semibold cursor-pointer' />

               </form> */}
        </div>
      </div>
    </div>
  );
}