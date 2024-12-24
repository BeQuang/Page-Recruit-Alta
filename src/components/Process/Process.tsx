/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Process.scss";
import { Form } from "react-bootstrap";
import Dropdown from "../Dropdown/Dropdown";
import { Option } from "../../Types/login";
import { FiSend } from "react-icons/fi";
import ModalProcess from "./ModalProcess";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addReportingProcess } from "../../firebase/contestController";
import { CgDanger } from "react-icons/cg";
import { validProcess } from "../Validate/Validate";
import { fetchAllInternshipGroup } from "../../firebase/listDropdownController";

function Process() {
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const dataOptions = await fetchAllInternshipGroup(); // Chờ kết quả từ API
        setListOptions(dataOptions); // Cập nhật state
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const [listOptions, setListOptions] = useState<Option[]>([]);
  const [type, setType] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const [errorInput, setErrorInput] = useState<boolean>(false);

  const resetData = () => {
    setType("");
    setLink("");
    setDescription("");
    setIsModalSuccess(false);
    setErrorInput(false);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const checkValidInput = validProcess({ type, link, description });

    if (checkValidInput) {
      await addReportingProcess(type, link, description);
      resetData();
    } else {
      setErrorInput(true);
      return;
    }

    setIsModalSuccess(true);
  };

  return (
    <>
      <div className="process-container">
        <h3 className="title">
          Xin chào <span>{user?.user?.name}</span>
        </h3>
        <Form>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Chọn lớp / Chọn nhóm thực tập</Form.Label>
            <Dropdown
              value={type}
              listOptions={listOptions}
              setType={(value: string | string[]) => setType(value as string)}
              title="Chọn lớp/nhóm thực tập"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLink">
            <Form.Label>Link file</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập đường dẫn"
              value={link}
              className={errorInput ? "is-error" : ""}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Nội dung báo cáo</Form.Label>
            <textarea
              rows={4}
              cols={50}
              placeholder="Nhập nội dung..."
              className={errorInput ? "is-error description" : "description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Form.Group>
          {errorInput ? (
            <div className="text-danger d-flex mb-3 error-text">
              <div className="icon-danger me-2">
                <CgDanger />
              </div>
              <span>
                Lớp/Nhóm thực tập, Link file hoặc Nội dung báo cáo để trống vui
                lòng nhập giá trị
              </span>
            </div>
          ) : null}
        </Form>
        <button className="btn btn-submit" onClick={(e) => handleSubmit(e)}>
          <span>Gửi</span>
          <FiSend />
        </button>
      </div>

      <ModalProcess show={isModalSuccess} setShow={setIsModalSuccess} />
    </>
  );
}

export default Process;
