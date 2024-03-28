import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { useLoadingContext } from "../../context/LoadingContext";

const Register = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === "" || value === false
    );
    setSubmitDisabled(isAnyFieldEmpty);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { password, password_confirmation } = formData;

    if (password !== password_confirmation) {
      showAlert("Password and confirm password do not match", "red");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://donate-app-n7oe.onrender.com/signup",
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      showAlert(response.data.message, response.data.success);

      axios.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });

      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error, "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-screen">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                إنشاء حساب جديد
              </p>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  اسم المستخدم
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="محمد "
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="example@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  كلمة المرور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  تأكيد كلمة المرور
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-
                    300 focus:ring-primary-600 ring-offset-gray-800"
                    checked={formData.terms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="m-1 font-light text-gray-700 text-gray-300"
                  >
                    أوافق على
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                      الشروط والأحكام
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitDisabled}
                className={`w-full text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  submitDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "focus:ring-blue-800 text-white"
                }`}
              >
                إنشاء حساب
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
