import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../context/LoadingContext";

const CreateCharitableContainer = () => {
  const url = "https://donate-app-n7oe.onrender.com";
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const { setLoading } = useLoadingContext();
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    axios
      .get(url + "/api/v1/countries?locale=ar")
      .then((res) => setCountries(res.data.data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    board_of_directors: "",
    charity_bank_accounts: "",
    email: "",
    establishment_date: "",
    goals: "",
    name_ar: "",
    name_en: "",
    phone: "",
    website: "",
    country_id: "",
    address: "",
    //images
    logo: "",
    license: "",
    social_security_certificate: "",
    awards: "",
  });

  const [fullAddress, setFullAddress] = useState({
    city: "",
    state: "",
    postalCode: "",
  });

  const handleCancel = () => {
    setFormData({
      board_of_directors: "",
      charity_bank_accounts: "",
      email: "",
      establishment_date: "",
      goals: "",
      name_ar: "",
      name_en: "",
      phone: "",
      website: "",
      country_id: "",
      address: "",
      logo: "",
      license: "",
      social_security_certificate: "",
      awards: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSubmitDisabled(value === "");
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setFullAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    const { city, state, postalCode } = fullAddress;

    if (city && state && postalCode) {
      const formattedAddress = `${city} - ${state} - ${postalCode}`;
      console.log(formattedAddress);
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: formattedAddress,
      }));
    }
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("Authentication token not found", "red");
        return;
      }

      const headers = {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      };

      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.post(
        url + "/api/v1/user/charitable_organizations?locale=ar",
        data,
        { headers }
      );

      showAlert(response.data.message, response.data.success);
      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error, "red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-lg " onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              إنشاء جمعيات خيرية
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  اسم جمعية الخيرية بالعربية
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleInputChange}
                    value={formData.name_ar}
                    name="name_ar"
                    type="text"
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  اسم جمعية الخيرية بالأنجلزية
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name_en"
                    onChange={handleInputChange}
                    value={formData.name_en}
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="board_of_directors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                مجلس إدارة

                </label>
                <div className="mt-2">
                  <textarea
                    onChange={handleInputChange}
                    value={formData.board_of_directors}
                    id="board_of_directors"
                    name="board_of_directors"
                    rows={3}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
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
                  htmlFor="establishment_date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  تاريخ التأسيس
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleInputChange}
                    value={formData.establishment_date}
                    type="date"
                    name="establishment_date"
                    id="establishment_date"
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="charity_bank_accounts"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الحسابات البنكية الخيرية
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={handleInputChange}
                    value={formData.charity_bank_accounts}
                    id="charity_bank_accounts"
                    name="charity_bank_accounts"
                    rows={3}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الأهداف
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={handleInputChange}
                    value={formData.goals}
                    id="goals"
                    name="goals"
                    rows={3}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  رقم هاتف الجمعية
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleInputChange}
                    value={formData.phone}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  موقع إلكتروني
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                    <input
                      onChange={handleInputChange}
                      value={formData.website}
                      type="text"
                      name="website"
                      id="website"
                      autoComplete="website"
                      className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      style={{ direction: "ltr" }}
                    />
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      {`://https`}
                    </span>
                  </div>
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
                    <option value="">اختر دولة</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name_i18n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  مدينة
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleAddressChange}
                    value={fullAddress.city}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الولاية/المقاطعة
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleAddressChange}
                    value={fullAddress.state}
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الرمز البريدي
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleAddressChange}
                    value={fullAddress.postalCode}
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    autoComplete="address-level1"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  ميزات اختيارية
                </h2>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  شعار (Logo)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  رخصة
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="license"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                      >
                        <span>تحميل ملف</span>
                        <input
                          onChange={handleFileChange}
                          id="license"
                          name="license"
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

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  شهادة الضمان الاجتماعي
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="social_security_certificate"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                      >
                        <span>تحميل ملف</span>
                        <input
                          onChange={handleFileChange}
                          id="social_security_certificate"
                          name="social_security_certificate"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">أو السحب والإفلات</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG، JPG، PDF بحجم يصل إلى 5 ميجابايتB
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="awards"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  الجوائز والمكافآت
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="awards"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                      >
                        <span>تحميل ملف</span>
                        <input
                          onChange={handleFileChange}
                          id="awards"
                          name="awards"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">أو السحب والإفلات</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG، JPG، PDF بحجم يصل إلى 5 ميجابايتB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleCancel}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                الغاء
              </button>
              <button
                type="submit"
                disabled={submitDisabled}
                className={` text-white bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  submitDisabled ? "cursor-not-allowed" : ""
                }`}
              >
                تسجيل
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCharitableContainer;
