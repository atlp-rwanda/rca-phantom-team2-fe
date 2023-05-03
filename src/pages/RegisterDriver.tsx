import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";
// import { useNavigate } from "react-router-dom";

const RegisterDriverValidationSchema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup
    .string()
    .email("Please enter valid email")
    .required("last name is required"),
  email: yup.string().required("Email is required"),

  role: yup.string().required("role is required"),
});

export default function RegisterDriver() {
  // const navigate = useNavigate();

  const handleSubmitRegister = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  }) => {
    try {
      const response = await axios.post(
        "https://rca-phantom-team2-bn.onrender.com/users/register",
        data
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("unable to register");
    }
  };

  return (
    <div className="lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll bg-gray-100 overflow-x-hidden">
      <div className="flex flex-wrap lg:mt-24 mt-20 w-full">
        <div className="lg:w-1/2 flex flex-col lg:justify-normal justify-center items-center lg:items-start"></div>
        <div className=" w-full relative lg:flex md:h-auto h-56 flex justify-center items-center mt-14 lg:mt-0">
          <Formik
            validationSchema={RegisterDriverValidationSchema}
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              role: "",
            }}
            onSubmit={(values) => handleSubmitRegister(values)}
          >
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
              <form
                className="row bg-white p-16 rounded-md"
                onSubmit={handleSubmit}
              >
                <div className=" text-center -mt-4 mb-8 text-lg text-dark-green ">
                  {" "}
                  Register Drivers & Operators
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="first_name" className="form-label">
                    First name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className=" p-2 w-full  rounded border h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />

                  <div className="text-rose-600 my-2">
                    {errors.first_name &&
                      touched.first_name &&
                      errors.first_name}
                  </div>
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="last_name" className="form-label">
                    Last name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="p-2 w-full  rounded border h-12 mb-2 border-2 border-gray-300"
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
                  </label>{" "}
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="exampleInputEmail1"
                    className="mt-2 p-2 w-full  rounded border h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="text-rose-600 my-2">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="exampleRole1" className="form-label">
                    Role
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="text"
                    id="exampleInputRole"
                    className="mt-2 p-2 w-full rounded border h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  />
                  <div className="text-rose-600 my-2">
                    {errors.role && touched.role && errors.role}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-14 -mt-10 bg-dark-green py-2.5 w-32 text-white rounded-md text-xs text-center font-semibold cursor-pointer"
                >
                  Register
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
