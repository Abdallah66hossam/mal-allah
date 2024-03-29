import { Link } from "react-router-dom";
import Facebook from "../../assets/images/Facebook.svg";
import instgram from "../../assets/images/instgram.svg";

const Footer = () => {
  return (
    <div
      className={`grid gap-[48px] justify-center lg:py-[60px] py-[40px] xl:px-[300px] px-[4%] border-t border-[#E4E4E4]`}
    >
      <img
        src="/logo.jpg"
        alt="afc logo"
        className="w-[131px] h-[131px] m-auto rounded-full"
      />
      <ul className="text-[#141414] font-medium leading-6 flex flex-wrap justify-center items-center">
        <li>
          <Link to={`/about-us`} className={`block px-6 py-2`}>
            من نحن
          </Link>
        </li>
        <li>
          <Link to={`/contact`} className={`block px-6 py-2`}>
            تواصل معنا
          </Link>
        </li>
      </ul>
      <span className={`text-[#7A7986] text-sm leading-[20px] text-center`}>
        Copyright © 2024 Mal Allah. All Rights Reserved. Use of this website
        constitutes your acceptance of its terms of use and privacy policy
      </span>
      <div className="flex justify-center items-center gap-4">
        <Link to={""}>
          <img
            src={instgram}
            alt="instagram"
            className="bg-green-900 w-[40px] h-[40px] p-[10px] rounded-full"
          />
        </Link>

        <Link to={""}>
          <img
            src={Facebook}
            alt="Facebook"
            className="bg-green-900 w-[40px] h-[40px] p-[10px] rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
