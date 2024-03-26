import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

const Project = () => {
  const url = "https://donate-app-n7oe.onrender.com";
  const navigate = useNavigate();
  const [projectsTypes, setProjectsTypes] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/api/v1/project_types?locale=ar")
      .then((res) => setProjectsTypes(res.data.data))
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    axios.get();
  }, [navigate]);

  const { showAlert } = useAlert();
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
        url + "/api/v1/user/projects?locale=ar",
        data,
        { headers }
      );

      showAlert(response.data.message, response.data.success);
      navigate("/");
    } catch (error) {
      showAlert(error.response.data.error, "red");
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
                name="project_type_id"
                value={formData.project_type_id}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              >
                {projectsTypes.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name_i18n}
                  </option>
                ))}
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

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                صورة المشروع
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
                    PNG, JPG, PDF up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            >
              إنشاء مشروع
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Project;
