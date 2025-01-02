import React from "react";
import Table from "react-bootstrap/Table";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { JobAdmin } from "../../Types/admin";

interface ManagerTableProps {
  jobs: JobAdmin[];
  offset: number;
  onUpdate: (job: JobAdmin) => void;
  onIsActive: (job: JobAdmin) => void;
  onDelete: (job: JobAdmin) => void;
}

const ManagerTable = ({
  jobs,
  offset,
  onUpdate,
  onIsActive,
  onDelete,
}: ManagerTableProps) => {
  return (
    <Table bordered hover>
      <thead>
        <tr className="title">
          <th>ID</th>
          <th>Tên công việc</th>
          <th className="d-none d-md-block">Tên công ty</th>
          <th className="d-none d-md-block">Nơi làm việc</th>
          <th className="d-none d-md-block">Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <tr key={job.id}>
              <td>{offset + index + 1}</td>
              <td>{job.work}</td>
              <td className="d-none d-md-block">{job.company}</td>
              <td className="d-none d-md-block">{job.country.join(", ")}</td>
              <td className="d-none d-md-block">{job.request}</td>
              <td className="icon">
                <HiOutlinePencilAlt
                  className="update"
                  onClick={() => onUpdate(job)}
                />
                {job.isActive ? (
                  <BsEye
                    className="un-hidden"
                    onClick={() => onIsActive(job)}
                  />
                ) : (
                  <BsEyeSlash
                    className="un-hidden"
                    onClick={() => onIsActive(job)}
                  />
                )}
                <FaRegTrashAlt
                  className="delete"
                  onClick={() => onDelete(job)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center">
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ManagerTable;
