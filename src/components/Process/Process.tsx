import React, { useEffect, useState } from "react";
import "./Process.scss";
import { Form } from "react-bootstrap";
import Dropdown from "../Dropdown/Dropdown";
import { Option } from "../../Types/login";
import { FiSend } from "react-icons/fi";
import ModalProcess from "./ModalProcess";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Process() {
  const dataOptions = [
    { text: "TP.HCM" },
    { text: "Hà Nội" },
    { text: "Đà N��ng" },
    { text: "Cần Thơ" },
    { text: "Hồ Chí Minh" },
    { text: "An Giang" },
    { text: "Bắc Giang" },
    { text: "Bắc Kạn" },
    { text: "Bắc Ninh" },
    { text: "Bến Tre" },
  ];

  useEffect(() => {
    setListOptions(dataOptions);
  }, []);

  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const [listOptions, setListOptions] = useState<Option[]>([]);
  const [type, setType] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsModalSuccess(true);
  };

  return (
    <>
      <div className="process-container">
        <h3 className="title">
          Xin chào <span>{user?.name}</span>
        </h3>
        <Form>
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Chọn lớp / Chọn nhóm thực tập</Form.Label>
            <Dropdown
              value={type}
              listOptions={listOptions}
              setType={setType}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLink">
            <Form.Label>Link file</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập đường dẫn"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Nội dung báo cáo</Form.Label>
            <textarea
              rows={4}
              cols={50}
              placeholder="Nhập nội dung..."
              className="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Form.Group>
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
