import StatisticsCards from "../components/statistics/StatisticsCards";
import StatisticsTable from "../components/statistics/StatisticsTable";

const StatisticsPage = () => {
  return (
    <div className="mt-[70px]">
      <div className="flex justify-between mb-10 mt-20 px-[7%]">
        <div className="flex items-center gap-4">
          <img
            src="./Polygon.svg"
            alt="statistics"
            className="relative top-1"
          />
          <h1 className="text-[34px] font-semibold">الاحصائيات:</h1>
        </div>
      </div>
      <StatisticsCards />
      <StatisticsTable />
    </div>
  );
};

export default StatisticsPage;
