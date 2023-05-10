import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import config from "@/config";

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
        `${config.BASE_URL}/users/register`,
        data
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 font-poppins overflow-y-scroll">
      <div className="flex flex-col w-full h-full justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto bg-white rounded-md px-12 py-14">
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
              <form onSubmit={handleSubmit}>
                <h4 className="text-center text-xl pb-10 font-bold text-bgprimary">
                  Register Drivers & Operators
                </h4>
                <div className="mb-3 col-6">
                  <label
                    htmlFor="first_name"
                    className="form-label pb-1 text-sm"
                  >
                    First name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="p-2 w-full rounded h-12 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />

                  <p className="text-red-600 my-1 text-sm capitalize">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                </div>
                <div className="my-3 col-6">
                  <label htmlFor="lastName" className="form-label pb-1 text-sm">
                    Last name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="p-2 w-full rounded h-12 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />

                  <p className="text-red-600 my-1 text-sm capitalize">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                </div>
                <div className="my-3 col-6">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label pb-1 text-sm"
                  >
                    Email address
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="exampleInputEmail1"
                    className="p-2 w-full rounded h-12 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className="text-red-600 my-1 text-sm capitalize">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>

                <div className="my-3 col-6">
                  <label htmlFor="role" className="form-label pb-1 text-sm">
                    Role
                  </label>
                  <br />
                  <input
                    type="text"
                    name="role"
                    id="roleId"
                    className="p-2 w-full rounded h-12 border-2 border-gray-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  />

                  <p className="text-red-600 my-1 text-sm capitalize">
                    {errors.role && touched.role && errors.role}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  className="mt-10 py-4 bg-bgprimary text-white block w-full rounded-md text-sm text-center font-semibold"
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
