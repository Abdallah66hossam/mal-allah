import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../context/LoadingContext";


const CharitableDetailsContainer = () => {
  const url = "https://donate-app-n7oe.onrender.com";
  const [charityData, setCharityData] = useState(null);
  const [numberOfProject, setNumberOfProjects] = useState(null);
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoading(true);
    // First axios request
    const request1 = axios.get(
      `${url}/api/v1/user/charitable_organizations?locale=ar`,
      {
        headers: {
          Authorization: ` ${token}`,
        },
      }
    );

    // Second axios request
    const request2 = axios.get(`${url}/api/v1/user/projects?locale=ar`, {
      headers: {
        Authorization: ` ${token}`,
      },
    });

    Promise.all([request1, request2])
      .then((responses) => {
        // Handle response of the first request
        const charityData = responses[0].data.data;
        setCharityData(charityData);

        setNumberOfProjects(responses[1].data.data.length);
      })
      .catch((errors) => {
        console.log(errors);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Ensure charityData is not null before accessing its properties
  const keysToDisplay = charityData ? {
    id: "رقم الجهة الخيرية",
    board_of_directors: "أعضاء مجلس الإدارة",
    charity_bank_accounts: "حسابات بنكية",
    email: "البريد الإلكتروني",
    establishment_date: "تاريخ التأسيس",
    goals: "أهداف الجمعية",
    name_ar: "الاسم باللغة العربية",
    name_en: "الاسم باللغة الإنجليزية",
    phone: "رقم الهاتف",
    status: "حالة الجمعية",
    translated_status: "الحالة المترجمة",
    website: "الموقع الإلكتروني",
    address: "العنوان",
    country: "الدولة",
    logo_url: "رابط الشعار",
    license_url: "رابط الرخصة",
    social_security_certificate_url: "رابط شهادة الضمان الاجتماعي",
    awards_url: "رابط الجوائز",
  } : {};

  return (
    <div className="container mx-auto px-4 sm:px-0">
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {Object.entries(keysToDisplay).map(([key, label]) => {
              const value = charityData[key];
              if (!value || value === "فارغ" || value === "تاريخ الحذف")
                return null;
              // If value is an object, extract name_ar property
              const displayValue =
                typeof value === "object" ? value.name_ar : value;
              // Check if the key is for a URL and render it as a link
              if (key.includes("_url")) {
                return (
                  <div
                    key={key}
                    className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700">
                      <a
                        href={value}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </a>
                    </dd>
                  </div>
                );
              }
              return (
                <div
                  key={key}
                  className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0"
                >
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-600">
                    {displayValue}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      <div className=" border-t flex justify-around items-start mt-20 mb-20 border-gray-100">
        <span className="inline-flex  rounded-md shadow-sm">
          عدد المشاريع الناشئة: {numberOfProject}
          <span className=" text-blue-500 underline cursor-pointer mr-2">
            <Link to="/charitable-details/list-projects">
              تفصيل المشاريع...
            </Link>
          </span>
        </span>
        <Link to="/create-project">
          <button
            type="submit"
            className="py-2 px-4 rounded shadow-md text-white bg-green-500 hover:bg-green-800"
          >
            انشاء مشروع
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CharitableDetailsContainer;
