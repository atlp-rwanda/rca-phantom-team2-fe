import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";

const RegisterDriverValidationSchema = yup.object().shape({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  role: yup.string().required("role is required"),
});

export default function RegisterDriver() {
  // const navigate = useNavigate();

  const handleSubmitRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    try {
      const response = await axios.post(
        "https://localhost:4000/api/users/register",

        data
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll bg-gray-100 overflow-x-hidden">
      <div className="flex flex-wrap lg:mt-24 mt-20 w-full bg-red-400">
        <div className="w-full relative lg:flex md:h-auto h-56 flex justify-center items-center mt-14 lg:mt-0">
          <Formik
            validationSchema={RegisterDriverValidationSchema}
            initialValues={{
              firstName: "",
              lastName: "",
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
            }) => (
              <form
                className="row bg-white p-16 rounded-md"
                onSubmit={handleSubmit}
              >
                <div className="text-center -mt-4 mb-8 text-lg text-dark-green">
                  Register Drivers & Operators
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="first_name" className="form-label">
                    First name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="p-2 w-full  rounded h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />

                  <div className="text-rose-600 my-2">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="p-2 w-full  rounded h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />

                  <div className="text-rose-600 my-2">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  {""}
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="exampleInputEmail1"
                    className="mt-2 p-2 w-full  rounded h-12 mb-2 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className="text-rose-600 my-2">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <br />
                  <input
                    type="text"
                    name="role"
                    id="roleId"
                    className="p-2 w-full  rounded h-12 mb-2 border-2 border-gray-300"
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
                  className="mt-10 bg-dark-green py-2.5 w-32 text-white rounded-md text-xs text-center font-semibold cursor-pointer"
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
