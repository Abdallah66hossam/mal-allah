import { circleData } from "./circleData";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";

const Circles = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <ScrollTrigger
      className="flex justify-center gap-5 items-center flex-wrap mt-32"
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
            <img src={circle} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-1">
              <h3 className={`font-bold text-[28px]`}>
                {counterOn && (
                  <CountUp
                    start={0}
                    end={number}
                    duration={1}
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
