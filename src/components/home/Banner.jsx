import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style/banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<button class="${className}">
<svg class="progress" width="60" height="60"><circle class="circle-origin" r="25" cx="29.99" cy="30"></circle></svg><span>${
        index + 1
      }</span>
</button>`;
    },
  };

  return (
    <div className="home">
      <Swiper
        effect="fade"
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        className={`swipe h-[600px] ibm-plex`}
        modules={[Pagination, Autoplay]}
        dir={"rtl"}
      >
        <SwiperSlide
          style={{
            backgroundImage: `url(https://ehsanbaner.s3.me-south-1.amazonaws.com/Baners+-+Final/zakat5.web.png)`,
          }}
          className={`bg-no-repeat relative bg-cover bg-center text-white`}
        >
          <div className="absolute bg-text-gradient w-full h-full z-0 bottom-0 left-0" />
          <div className=" absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2  text-center w-full">
            <h3
              className={`xl:text-[22px] leading-7 md:leading-[56px] -tracking-[0.44px] capitalize text-center opacity-80 mt-1 z-40`}
            >
              قال: قال رسول الله صلى الله عليه وسلم
            </h3>
            <h1
              className={`xl:text-[36px] lg:text-[35px] sm:text-[25px] text-[19px] leading-[30px] md:leading-[45px] font-semibold lg:leading-[56px] -tracking-[0.44px] self-stretch mb-[12px] sm:mb-[16px] xl:mb-[10px] capitalize text-center w-[80%] mx-auto  z-40`}
            >
              “حَصِّنُوا أَمْوَالَكُمْ بِالزَّكَاةِ، وَدَاوُوا مَرْضَاكُمْ
              بِالصَّدَقَةِ، وَاسْتَقْبِلُوا أَمْوَاجَ الْبَلَاءِ بِالدُّعَاءِ
              وَالتَّضَرُّعِ”
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url(/yatama.png)`,
          }}
          className={`bg-no-repeat relative bg-cover `}
        >
          <div className="absolute bg-text-gradient w-full h-full z-0 bottom-0 left-0" />
          <div className=" absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2  text-center w-full">
            <h3
              className={`xl:text-[32px] leading-7 md:leading-[43px] -tracking-[0.44px] capitalize text-neutral-200 opacity-80 lg:w-[60%] text-center mx-auto`}
            >
              {` ”قال رسول الله صلى الله عليه وسلم: “أنا وكافل اليتيم في الجنة هكذا” وأشار بالسبابة والوسطى`}
            </h3>
            <h1
              className={`xl:text-[30px] lg:text-[27px] sm:text-[25px] text-[19px] leading-[30px] md:leading-[45px] font-semibold lg:leading-[60px] -tracking-[0.44px] self-stretch mb-[12px] sm:mb-[16px] xl:mb-[10px] capitalize text-center mx-auto z-10 lg:w-[70%] text-neutral-100`}
            >
              {`"وَآتُوا الْيَتَامَى أَمْوَالَهُمْ وَلاَ تَتَبَدَّلُوا الْخَبِيثَ بِالطَّيِّبِ وَلاَ تَأْكُلُوا أَمْوَالَهُمْ إِلَى أَمْوَالِكُمْ إِنَّهُ كَانَ حُوبًا كَبِيرًا"`}
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url(/banner3.jpg)`,
          }}
          className={`bg-no-repeat relative bg-cover bg-center `}
        >
          <div className="absolute bg-text-gradient w-full h-full z-0 bottom-0 left-0" />
          <div className=" absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2  text-center w-full">
            <h3
              className={`xl:text-[22px] leading-7 md:leading-[56px] -tracking-[0.44px] capitalize text-center opacity-80 mt-1 z-40`}
            >
              قال رسول الله صلي الله عليه وسلم
            </h3>
            <h1
              className={`xl:text-[24px] lg:text-[35px] sm:text-[25px] text-[19px] leading-[30px] md:leading-[45px] font-semibold lg:leading-[43px] -tracking-[0.44px] self-stretch mb-[12px] sm:mb-[16px] xl:mb-[10px] capitalize text-center w-[80%] mx-auto  z-40`}
            >
              “صنائعُ المعروفِ تقي مصارعَ السوءِ والآفاتِ والهلكاتِ، وأهلُ
              المعروفِ في الدنيا همْ أهلُ المعروفِ في الآخرةِ”، مشيراً إلى أن
              الصدقة تحمي صاحبها من المصائب.
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
