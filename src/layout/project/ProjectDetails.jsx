import { useEffect, useState } from "react";
import "./projectDetails.css";
import { useLoadingContext } from "../context/LoadingContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  let [value, setValue] = useState(1);
  const { id } = useParams();
  const { setLoading } = useLoadingContext();
  const [projectsData, setProjectsData] = useState([]);
  console.log(projectsData);
  const url = "https://donate-app-n7oe.onrender.com";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/projects/${id}`);
        setProjectsData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [id, setLoading]);
  return (
    <section className="product-container">
      <div className="img-card">
        <img
          src={projectsData?.image_url}
          alt="project picture"
          id="featured-image"
        />
        <Link
          to={`/${projectsData?.charitable_organization?.website}`}
          target="_blank"
          className="shadow-lg border border-[#ddd]/20 rounded-md my-4 py-5 px-4 flex gap-3 mt-14"
        >
          <img
            src={projectsData?.charitable_organization?.logo_url}
            className="object-contain rounded-full h-[43px]"
            alt="charitable organization pic"
          />
          <div>
            <p className="charitable_organization">
              {projectsData?.charitable_organization?.name_ar}
            </p>
            <p>{projectsData?.charitable_organization?.goals}</p>
          </div>
        </Link>
      </div>
      <div className="product-info">
        <h3>{projectsData?.project_type?.name_ar}</h3>
        <p>{projectsData?.details_ar}</p>

        <div className="quantity flex mt-10">
          <input
            className="border rounded-r-lg text-lg  h-[55px] w-[100px]"
            type="number"
            value={value}
            min="1"
            onChange={(ev) => setValue(ev.target.value)}
          />
          <div className="flex flex-col w-fit h-fit">
            <button
              className="bg-[#17696a] text-white font-semibold rounded-tl-md px-5 h-[27px] flex justify-center items-center border-b border-black/10"
              onClick={() => setValue(++value)}
            >
              +
            </button>
            <button
              className="bg-[#17696a] text-white font-semibold rounded-bl-md px-5 h-[27px] flex justify-center items-center"
              onClick={() => setValue(--value)}
            >
              -
            </button>
          </div>
          <Link
            to={`/donate/${id}`}
            onClick={() => localStorage.setItem("donate_value", value)}
            className="donate mr-4 h-[55px]"
          >
            تبرع الان
          </Link>
        </div>

        <div>
          <hr />
          <div className="delivery">
            <p>المبلغ المطلوب</p>
            <p></p>
            <p className="text-yellow-700">
              {"$ " + projectsData?.target_amount}
            </p>
          </div>
          <div className="delivery">
            <p>المبلغ المتبقي</p>
            <p></p>
            <p className=" text-yellow-700">
              {"$ " + projectsData?.remaining_amount}
            </p>
          </div>
          <hr />
          <hr />
          <div className="delivery">
            <p>الحاله</p>
            <p></p>
            <p></p>
            <p></p>
            <p className="text-white w-[40px] bg-green-800 rounded-lg text-center py-2 relative left-[80px]">
              {projectsData?.translated_status}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
