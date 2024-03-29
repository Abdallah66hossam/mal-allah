import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import axios from "axios";
import { useLoadingContext } from "../context/LoadingContext";

const DonationForm = () => {
  const { setLoading } = useLoadingContext();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    donate_name: "Abdallah Hossam",
    card_number: "",
    issue_date: "",
    cvv: "",
    amount: localStorage.getItem("donate_value"),
    project_id: id,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const url = "https://donate-app-n7oe.onrender.com";
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.post(url + "/api/v1/donations", data);

      showAlert(response.data.message, response.data.success);
      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-around bg-gray-700 p-4 border border-white border-opacity-30 rounded-lg shadow-md mx-auto w-[90%] lg:w-[70%] my-[100px]">
        <div className="flex flex-row items-center justify-between mb-3">
          <input
            className="w-full h-10 border-none outline-none text-sm bg-gray-700 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
            type="text"
            name="donate_name"
            id="donate_name"
            placeholder="Full Name"
            value={formData.donate_name}
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-center relative w-14 h-9 bg-gray-700 border border-white border-opacity-20 rounded-md">
            <svg
              className="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff9800"
                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
              ></path>
              <path
                fill="#d50000"
                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
              ></path>
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              ></path>
            </svg>
          </div>
          <div className="flex mr-3 items-center justify-center relative w-14 h-9 bg-gray-700 border border-white border-opacity-20 rounded-md">
            <svg
              viewBox="0 0 256 83"
              height="83"
              width="256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  y2="100%"
                  y1="-2.006%"
                  x2="54.877%"
                  x1="45.974%"
                  id="logosVisa0"
                >
                  <stop stopColor="#222357" offset="0%"></stop>
                  <stop stopColor="#254AA5" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path
                transform="matrix(1 0 0 -1 0 82.668)"
                d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                fill="url(#logosVisa0)"
              ></path>
            </svg>
          </div>
        </div>
        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-700 text-white font-semibold caret-orange-500 pl-2"
          type="text"
          name="card_number"
          id="card_number"
          placeholder="0000 0000 0000 0000"
          value={formData.card_number}
          onChange={handleInputChange}
        />
        <div className="flex flex-row justify-between">
          <input
            className="w-full h-10 border-none outline-none text-sm bg-gray-700 text-white font-semibold caret-orange-500 pl-2"
            type="text"
            name="issue_date"
            id="issue_date"
            placeholder="MM/AA"
            value={formData.issue_date}
            onChange={handleInputChange}
          />
          <input
            className="w-full h-10 border-none outline-none text-sm bg-gray-700 text-white font-semibold caret-orange-500 pl-2"
            type="text"
            name="cvv"
            id="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-700 text-white font-semibold caret-orange-500 pl-2"
          type="text"
          name="amount"
          id="amount"
          placeholder="Donation Amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DonationForm;
