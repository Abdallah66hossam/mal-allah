import axios from "axios";
import { useEffect, useState } from "react";

const StatisticsCards = () => {
  const [StatisticsData, setStatisticsData] = useState([]);
  const url = "https://donate-app-n7oe.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/reports/statistics_donations`
        );
        setStatisticsData(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="mb-[80px] flex gap-[40px] items-center flex-wrap mx-[7%]">
      <div className="flex items-center gap-[40px] bg-slate-100 shadow-md w-full md:w-[30%] xl:w-[20%] rounded-2xl relative h-[56px]">
        <img
          src="https://www.ksrelief.org/UploadData/icons/Untitled-2-03.png"
          width={80}
          className="rounded-full relative -right-4"
        />
        <div className="text-center">
          <h3 className="text-green-800"> المشاريع</h3>
          <p> {StatisticsData?.count_projects}</p>
        </div>
      </div>
      <div className="flex items-center gap-[40px] bg-slate-100 shadow-md w-full md:w-[30%] xl:w-[20%] rounded-2xl relative h-[56px]">
        <img
          src="https://www.ksrelief.org/UploadData/icons/Untitled-2-02.png"
          width={80}
          className="rounded-full relative -right-4"
        />
        <div className="text-center">
          <h3 className="text-green-800"> الشراكات</h3>
          {StatisticsData?.count_donations}
        </div>
      </div>
      <div className="flex items-center gap-[40px] bg-slate-100 shadow-md w-full md:w-[30%] xl:w-[20%] rounded-2xl relative h-[56px]">
        <img
          src="https://www.ksrelief.org/UploadData/icons/Untitled-2-04.png"
          width={80}
          className="rounded-full relative -right-4"
        />
        <div className="text-center">
          <h3 className="text-green-800"> الدول المستفادة</h3>
          {StatisticsData?.country_receive}
        </div>
      </div>
      <div className="flex items-center gap-[40px] bg-slate-100 shadow-md w-full md:w-[30%] xl:w-[20%] rounded-2xl relative h-[56px]">
        <img
          src="https://www.ksrelief.org/UploadData/icons/Untitled-2-01.png"
          width={80}
          className="rounded-full relative -right-4"
        />
        <div className="text-center">
          <h3 className="text-green-800">التبرعات </h3>
          {StatisticsData?.count_charitable}
        </div>
      </div>
    </section>
  );
};

export default StatisticsCards;
