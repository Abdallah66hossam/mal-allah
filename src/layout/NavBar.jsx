import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  let nav = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      nav.current?.classList.toggle("animate-nav", window.scrollY > 200);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let pixelsFromTop = window.scrollY;
      let documentHeight = document.body.clientHeight;
      let windowHeight = window.innerHeight;
      let difference = documentHeight - windowHeight;
      let percentage = (100 * pixelsFromTop) / difference;
      document.getElementById("bar").style.width = `${percentage}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-white border-gray-200 z-[9999] relative" ref={nav}>
      <div className="progress_wrapper">
        <div className="progress_bar" id="bar"></div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.jpg"
            className="h-[80px] object-contain rounded-xl absolute top-3"
            alt="Flowbite Logo"
          />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload(); 
              }}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 duration-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              تسجيل الخروج
            </button>
          ) : (
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 duration-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  تسجيل الدخول
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg text-sm text-center"
                >
                  إنشاء حساب
                </button>
              </Link>
            </>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 py-5"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-green-700 arabicFontBold rounded hover:bg-gray-100 duration-300"
                aria-current="page"
              >
                الرئيسية
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-green-700 arabicFontBold rounded hover:bg-gray-100 duration-300"
              >
                من نحن
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-green-700 arabicFontBold rounded hover:bg-gray-100 duration-300"
              >
                المشاريع
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-green-700 arabicFontBold rounded hover:bg-gray-100 duration-300"
              >
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
