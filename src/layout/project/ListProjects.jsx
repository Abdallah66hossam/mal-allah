import axios from "axios";
import { useEffect, useState } from "react";
import ProjectDisplay from "./ProjectDisplay";
import { useLoadingContext } from "../context/LoadingContext";
import ProjectCard from "./ProjectCard";

const ListProjects = () => {
  const { setLoading } = useLoadingContext();
  const [projectsData, setProjectsData] = useState([]);
  const url = "https://donate-app-n7oe.onrender.com";
  const token = localStorage.getItem("token");
  const currentPath = window.location.pathname;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let endpoint = `${url}/api/v1/user/projects?locale=ar`;
        if (currentPath === "/charitable-details/list-projects") {
          endpoint = `${url}/api/v1/user/projects?locale=ar`;
        } else {
          endpoint = `${url}/api/v1/projects?locale=ar`;
        }
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: token ? `${token}` : "",
          },
        });

        setProjectsData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [url, token, currentPath, setLoading]);

  return (
    <div className="px-[7%] mb-32">
      <div className="flex gap-5 flex-wrap items-center mb-10 mt-20">
        <div className="flex items-center gap-4">
          <img
            src="./Polygon.svg"
            alt="statistics"
            className="relative top-1"
          />
          <h1 className="text-[34px] font-semibold">المشاريع:</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ListProjects;
