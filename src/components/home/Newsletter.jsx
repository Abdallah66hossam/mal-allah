import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <article className="bg-green-200 bg-cover bg-center w-full h-[636px] mt-[200px] flex justify-center items-center">
      <section className="xl:w-[87%] w-[94%] sm:w-[90%] h-[420px] md:h-[448px] flex flex-col sm:flex-row justify-center items-center  shadow-2xl">
        <div
          className={`bg-white flex flex-col justify-center md:gap-6 gap-4 sm:w-1/2 h-full w-full py-[40px] sm:py-0 sm:rounded-r-lg rounded-t-lg sm:rounded-tl-none pr-[6%] md:pr-[40px] pl-3 xl:pr-[80px] xl:pl-[131px]`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]"
          >
            <path
              d="M22.2216 8.33331L33.3327 20M33.3327 20L22.2216 31.6666M33.3327 20L6.66602 20"
              stroke="#14532d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4
            className={`text-[#141414] text-2xl md:text-[25px] lg:text-[36px] font-semibold leading-[39px] lg:leading-[44px] -tracking-[0.72px]`}
          >
            اشترك في النشرة الإخبارية اليومية
          </h4>
          <p
            className={`text-[#7A7986] text-[10px] md:text-[12px] leading-4 font-medium -tracking-[0.24px] grid md:gap-3 gap-2`}
          >
            قصصنا الكبيرة، تصل إلى صندوق الوارد الخاص بك كل يوم.
            <Link className={`underline text-[#141414] font-bold`}>
              عرض جميع النشرات
            </Link>
          </p>
        </div>
        <div
          className={`bg-[#F6F7F9] flex flex-col justify-center gap-6 sm:w-1/2 h-full w-full py-[40px] sm:py-0 relative bottom-[1px] sm:bottom-0 px-[6%] md:px-[30px] lg:px-[60px] rounded-b-lg xl:pr-[140px] xl:pl-[80px] sm:rounded-l-lg sm:rounded-br-none left-[1px]`}
        >
          <form>
            <label
              className={`text-[#141414] font-semibold sm:text-base -tracking-[0.32px] leading-6 text-lg`}
            >
              بريدك الالكتروني
            </label>
            <div className="flex md:items-center flex-col md:flex-row gap-2 lg:gap-4 sm:mt-6 mt-4 mb-4">
              <input
                required
                className={`focus:outline-none text-[#7a798680] px-6 py-4 rounded-[100px] w-full text-sm lg:text-base`}
                placeholder="البريد الالكتروني"
                type="email"
              />
              <button
                type="submit"
                className={`leading-6 font-semibold text-white py-[12px] px-6 rounded-[100px] bg-green-900 text-sm lg:text-base`}
              >
                اشترك
              </button>
            </div>
            <p className={`text-[#7A7986] text-[10px] font-light`}>
              من خلال الاشتراك، أنت توافق على اتفاق المستخدم الخاص بنا (بما في
              ذلك إعفاء الدعوى الجماعية وأحكام التحكيم)، سياسة الخصوصية وبيان
              الكوكيز وعلى تلقي رسائل التسويق والرسائل ذات الصلة بالحساب. يمكنك
              إلغاء الاشتراك في أي وقت.
            </p>
          </form>
        </div>
      </section>
    </article>
  );
};

export default Newsletter;
