import axios from "axios";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const ListProjects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const url = "https://donate-app-n7oe.onrender.com"; // Assuming this is the correct URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/user/projects?locale=ar`, {
          headers: {
            Authorization: ` ${token}`,
          },
        });
        setProjectsData(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [url, token]);

  return (
    <div className="px-[7%]">
      <div className="flex justify-between mb-10 mt-20">
        <div className="flex items-center gap-4">
          <img src="/src/assets/images" alt="statistics" className="relative top-1" />
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
