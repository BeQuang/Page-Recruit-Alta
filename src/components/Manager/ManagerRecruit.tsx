import { GoPlus } from "react-icons/go";
import "./Manager.scss";
import Table from "react-bootstrap/Table";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalAdmin from "../Modal/ModalAdmin";
import { useState } from "react";

function ManagerRecruit() {
  const [isModalAdmin, setIsModalAdmin] = useState<boolean>(false);

  const handleOpenModalAdmin = () => {
    setIsModalAdmin(true);
  };
  return (
    <>
      <div className="manager-recruit-container">
        <button
          className="btn btn-add-item mb-3"
          onClick={() => handleOpenModalAdmin()}
        >
          <span>Thêm vị trí tuyển dụng</span>
          <GoPlus className="icon" />
        </button>

        <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr className="title">
                <th>ID</th>
                <th>Tên công việc</th>
                <th>Lĩnh vực</th>
                <th>Nơi làm việc</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Otto</td>
                <td className="icon">
                  <HiOutlinePencilAlt className="update" />
                  {/* <BsEyeSlash className="hidden" /> */}
                  <BsEye className="un-hidden" />
                  <FaRegTrashAlt className="delete" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <ModalAdmin show={isModalAdmin} setShow={setIsModalAdmin} />
    </>
  );
}

export default ManagerRecruit;
