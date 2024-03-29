import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useLoadingContext } from "../context/LoadingContext";

const Project = () => {
  const url = "https://donate-app-n7oe.onrender.com";
  const navigate = useNavigate();
  const [projectsTypes, setProjectsTypes] = useState([]);
  const { setLoading } = useLoadingContext();
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    image: "",
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
      image: file,
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

      setLoading(true);
      const response = await axios.post(
        url + "/api/v1/user/projects?locale=ar",
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
    <>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-lg " onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                إنشاء مشروع
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name_ar"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    اسم بالعربية
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleInputChange}
                      value={formData.name_ar}
                      name="name_ar"
                      type="text"
                      autoComplete="given-name"
                      className=" block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="name_en"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    اسم بالأنجلزية
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleInputChange}
                      value={formData.name_en}
                      id="name_en"
                      name="name_en"
                      autoComplete="given-name"
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="details_ar"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    تفصيل المشروع بالعربية
                  </label>

                  <div className="mt-2">
                    <textarea
                      onChange={handleInputChange}
                      value={formData.details_ar}
                      name="details_ar"
                      id="details_ar"
                      rows={3}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="details_en"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    تفصيل المشروع بالأنجلزية
                  </label>

                  <div className="mt-2">
                    <textarea
                      onChange={handleInputChange}
                      value={formData.details_en}
                      name="details_en"
                      id="details_en"
                      rows={3}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    نوعية المشروع
                  </label>
                  <div className="mt-2">
                    <select
                      name="project_type_id"
                      value={formData.project_type_id}
                      onChange={handleInputChange}
                      autoComplete="project_type_id"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                    <option>
                      اختر نوع المشروع
                    </option>
                      {projectsTypes.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name_i18n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    موعد الاكمال
                  </label>

                  <div className="mt-2">
                    <input
                      name="completion_date"
                      type="date"
                      value={formData.completion_date}
                      onChange={handleInputChange}
                      id="establishment_date"
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    المبلغ المستهدف
                  </label>

                  <div className="mt-2">
                    <input
                      name="target_amount"
                      type="number"
                      value={formData.target_amount}
                      onChange={handleInputChange}
                      id="target_amount"
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    المبلغ المتبقي
                  </label>

                  <div className="mt-2">
                    <input
                      name="remaining_amount"
                      type="number"
                      value={formData.remaining_amount}
                      onChange={handleInputChange}
                      id="remaining_amount"
                      autoComplete="given-name"
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
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
                        PNG، JPG، PDF بحجم يصل إلى 5 ميجابايت
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={submitDisabled}
                className={`mt-5 w-full text-white bg-green-700 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  submitDisabled ? "cursor-not-allowed" : ""
                }`}
              >
                إنشاء مشروع
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Project;
