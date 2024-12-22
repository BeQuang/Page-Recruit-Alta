import "./JD.scss";
import logo from "../../assets/images/alta.svg";
import download from "../../assets/images/Icon.svg";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { JobItem as Job } from "../../Types/job";

interface JobProps {
  job: Job;
}

function JobItem({ job }: JobProps) {
  return (
    <div className="job-item-container">
      <div className="company">
        <div className="d-flex ">
          <img src={job.logo} alt="logo" className="logo-company" />
          <div className="text">
            <div>{job.work}</div>
            <span>{job.company}</span>
          </div>
        </div>
        <div className="download">
          <img src={download} alt="download" className="icon" />
        </div>
      </div>

      <div className="description">{job.request}</div>
      <div className="line"></div>
      <div className="contact d-flex">
        <div className="email">
          <HiOutlineMail className="icon" />
          {job.email}
        </div>
        <div className="vertical"></div>
        <div className="phone">
          <FiPhone className="icon" />
          {job.phone}
        </div>
      </div>
    </div>
  );
}

export default JobItem;
