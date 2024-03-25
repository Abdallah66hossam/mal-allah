import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    details_ar: "",
    details_en: "",
    project_type_id: "",
    completion_date: "",
    target_amount: "",
    remaining_amount: "",
    images: [null],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
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
        "https://donate-app-n7oe.onrender.com/api/v1/user/projects",
        data,
        { headers }
      );

      console.log("Project created successfully", response);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              إنشاء مشروع
            </p>
            <div>
              <label
                htmlFor="name_ar"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                اسم بالعربية
              </label>
              <input
                onChange={handleInputChange}
                value={formData.name_ar}
                id="name_ar"
                name="name_ar"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="name_en"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                اسم بالأنجلزية
              </label>
              <input
                onChange={handleInputChange}
                value={formData.name_en}
                id="name_en"
                name="name_en"
                type="text"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="details_ar"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                تفصيل المشروع بالعربية
              </label>
              <textarea
                onChange={handleInputChange}
                value={formData.details_ar}
                name="details_ar"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
                placeholder=""
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="details_en"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                تفصيل المشروع بالأنجلزية
              </label>
              <textarea
                onChange={handleInputChange}
                value={formData.details_en}
                name="details_en"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
                placeholder=""
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900"></label>
              <select
                name="type_project"
                value={formData.type_project}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              >
                <option selected>نوعية المشروع</option>
                <option value="بناء دار أيتام">بناء دار أيتام</option>
                <option value="بناء مسجد">بناء مسجد</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                موعد الاكمال
              </label>
              <input
                name="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  المبلغ المستهدف
                </label>
                <input
                  name="target_amount"
                  type="number"
                  value={formData.target_amount}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="90210"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  المبلغ المتبقي
                </label>
                <input
                  name="remaining_amount"
                  type="number"
                  value={formData.remaining_amount}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="90210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                صورة المشروع
              </label>
              <input
                name="images"
                type="file"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              إنشاء حساب
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
