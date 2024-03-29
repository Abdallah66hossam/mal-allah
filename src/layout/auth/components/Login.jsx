import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { useLoadingContext } from "../../context/LoadingContext";

const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      showAlert("الرجاء إدخال البريد الإلكتروني وكلمة المرور", "red");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://donate-app-n7oe.onrender.com/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data.data;
      localStorage.setItem("token", token);
      showAlert(response.data.message, response.data.success);
      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error, "red");
    }finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSubmitDisabled(value === "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              تسجيل الدخول
            </p>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                البريد الإلكتروني الخاص بك
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="JohnDoe@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
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
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={submitDisabled}
              className={`w-full text-white bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                submitDisabled ? "cursor-not-allowed" : ""
              }`}
            >
              تسجيل الدخول
            </button>
            <div className="text-center text-green-700 hover:text-green-600 cursor-pointer">
              <Link to="/signup">إنشاء حساب</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
