import { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [onClose]);


  return (
    <div
      className={`fixed bottom-4  right-4 z-50 border-t-4 rounded-b ${type ? "text-teal-900 bg-teal-100 border-teal-500" : "text-red-900 bg-red-100 border-red-500"} px-4 py-3 shadow-md `}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className={`fill-current h-6 w-6 ${type ? "text-teal-500" : "text-red-500"} mr-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
