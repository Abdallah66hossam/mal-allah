import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProjectCard = ({ project = {} }) => {
  const {
    project_type,
    image_url,
    name_i18n,
    details_ar,
    charitable_organization,
    target_amount,
    remaining_amount,
    id,
  } = project;
  return (
    <Link
      to={`/project-detail/${id}`}
      className="w-[380px] h-[410px] pb-6 shadow-xl rounded-[20px] cursor-pointer relative"
    >
      <img src={image_url} alt="png" className="w-full rounded-t-[20px]" />
      <div className="px-4 mt-1">
        <h2 className="text-[18px] font-medium text-[#007930]">{name_i18n}</h2>
        <p className="text-[#00260F] font-medium text-[12px] ">{details_ar}</p>
        <div className="flex items-center gap-[5px] mt-3">
          <img
            src={charitable_organization?.logo_url}
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <div>
            <h3 className="text-base font-medium leading-normal text-[#004D1F]">
              {charitable_organization?.name_ar}
            </h3>
            <span className="text-[12px] font-medium leading-[9.6px] mb-[2px] text-[#6C6C6C80]">
              {project_type?.name_i18n}
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-2 absolute left-[20px] right-[20px] bottom-4">
          <div>
            <span className="font-bold leading-[12px] text-[18px] text-[#001A0A]">
              التبرعات:
            </span>
            <span className="font-semibold leading-[9.6px] text-[14px] text-[#A8921D]">
              {target_amount}
            </span>
          </div>
          <div>
            <span className="font-bold leading-[12px] text-[18px] text-[#001A0A]">
              المتبقي:
            </span>
            <span className="font-semibold leading-[9.6px] text-[12px] text-[#A8921D]">
              {remaining_amount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
