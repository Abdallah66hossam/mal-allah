import { useEffect, useState } from "react";
import { useLoadingContext } from "../../layout/context/LoadingContext";
import axios from "axios";

const StatisticsTable = () => {
  const { setLoading } = useLoadingContext();
  const [StatisticsData, setStatisticsData] = useState([]);
  const url = "https://donate-app-n7oe.onrender.com";

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/reports/statistics_donations`
        );
        setStatisticsData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [setLoading]);
  return (
    <div className="relative shadow-md sm:rounded-lg mt-6 rounded-lg overflow-x-auto mx-[7%] my-[120px]">
      <table
        className={`text-sm text-[#292D30] overflow-hidden w-[800px] md:w-full rounded-t-lg md:rounded-lg`}
      >
        <thead className="text-base font-semibold leading-6 -tracking-[0.32px] text-white uppercase bg-[#032C00]/70 text-center">
          <tr>
            <th
              scope="col"
              className={`px-6 py-6 font-semibold capitalize w-[30%]`}
            >
              نوع المشروع
            </th>

            <th
              scope="col"
              className={`px-6 py-6 font-semibold capitalize w-[30%]`}
            >
              اجمالي عدد المشاريع
            </th>

            <th
              scope="col"
              className={`px-6 py-6 font-semibold capitalize w-[30%]`}
            >
              اجمالي التبرعات
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {StatisticsData?.statistics_by_project_types?.map((st, index) => (
            <tr
              className="odd:bg-[#A7C6A5]/70 even:bg-[#F4FFF3]/70 border-b border-[#F4F4F4] font-semibold "
              key={index}
            >
              <td className="px-6 py-6 text-[#292D30] ">
                {st.project_type_name}
              </td>
              <td className="px-6 py-6 text-[#292D30] ">{st.count_projects}</td>
              <td className="px-6 py-6 text-[#292D30]">{st.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
