import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

const Contact = () => {
  const url = "https://donate-app-n7oe.onrender.com";
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    axios
      .get(url + "/api/v1/countries?locale=ar")
      .then((res) => setCountries(res.data.data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
   console.log(countries);
  }, [navigate]);

  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country_id: "",
    details: "",
    images: [null],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSubmitDisabled(value === "");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, file],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.post(url + "/api/v1/contacts", data);

      showAlert(response.data.message, response.data.success);
      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-lg " onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                تواصل معنا
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    بريد إلكتروني
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleInputChange}
                      value={formData.email}
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    اسم
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleInputChange}
                      value={formData.name}
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    دولة
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={handleInputChange}
                      value={formData.country_id}
                      id="country"
                      name="country_id"
                      autoComplete="country-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option  value="">
                      اختر دولة
                      </option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name_i18n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    تفصيل المشروع
                  </label>

                  <div className="mt-2">
                    <textarea
                      onChange={handleInputChange}
                      value={formData.details}
                      name="details"
                      id="details"
                      rows={3}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ملف - اختياري
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="logo"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                        >
                          <span>تحميل ملف</span>
                          <input
                            onChange={handleFileChange}
                            id="logo"
                            name="logo"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">أو السحب والإفلات</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG، JPG، PDF بحجم يصل إلى 5 ميجابايت
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitDisabled}
                className={`mt-5 w-full text-white bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  submitDisabled ? "cursor-not-allowed" : ""
                }`}
              >
                إرسال
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
