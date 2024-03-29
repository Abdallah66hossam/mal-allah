import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useEffect, useState } from "react";
import axios from "axios";

const Circles = () => {
  const [counterOn, setCounterOn] = useState(false);
  const [StatisticsData, setStatisticsData] = useState([]);
  console.log(StatisticsData);
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
  let circleData = [
    {
      number: StatisticsData?.count_donations,
      title: "اجمالي التبرعات",
      icon: "/user_5_fill.svg",
      circle: "/Ellipse1.svg",
      number_color: "text-[#FF4119]",
    },
    {
      number: 1,
      title: "البلاد المستفادة",
      icon: "/svg3.svg",
      circle: "/Ellipse3.svg",
      number_color: "text-[#4678D2]",
    },
    {
      number: StatisticsData?.count_charitable,
      title: "المؤسسات",
      icon: "/svg4.svg",
      circle: "/Ellipse4.svg",
      number_color: "text-[#7A7986]",
    },
    {
      number: StatisticsData?.count_projects,
      title: "المشاريع",
      icon: "/svg5.svg",
      circle: "/Ellipse5.svg",
      number_color: "text-[#B73853]",
    },
  ];

  return (
    <ScrollTrigger
      className="flex justify-center gap-5 items-center flex-wrap mb-32 mt-40"
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      {circleData.map(({ title, number, icon, circle, number_color }, id) => (
        <div className="relative" key={id}>
          <div className="absolute -top-5 -left-[23px] z-10">
            <img src="/ecs.svg" className="" />
            <img
              src={icon}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </div>
          <div className="relative">
            <img src={circle} className="h-[200px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-1">
              <h3 className={`font-bold text-[28px]`}>
                {counterOn && (
                  <CountUp
                    start={0}
                    end={number}
                    duration={5}
                    delay={0}
                    className={number_color}
                  />
                )}
              </h3>
              <h5
                className={`text-black text-[17px] -tracking-[0.34px] leading-[1.4]`}
              >
                {title}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </ScrollTrigger>
  );
};

export default Circles;
