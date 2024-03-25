import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../Alert";

const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});

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

    if (!email || !password) return;

    try {
      const response = await axios.post("https://donate-app-n7oe.onrender.com/login", formData);

      const { token } = response.data.data;
      console.log(token);
      localStorage.setItem("token", token); 
      setAlert({ message: response.data.message, type: "success" });

      if(token){
        axios.interceptors.request.use((config) => {
          config.headers["Authorization"] = `${token}`;
          return config;
        });
      }
      
      navigate("/");
    } catch (error) {
      setAlert({ message: "Error registering user", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <>
       {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}
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
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
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
              className="w-full bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
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
    </>

  );
};

export default Login;
