/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Contest.scss";
import Dropdown from "../Dropdown/Dropdown";
import { Option } from "../../Types/login";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function ChoiceContest() {
  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const listTitleContest: Option[] =
    useSelector((state: RootState) => state.titleContest) || [];

  useEffect(() => {
    setListOptions(listTitleContest);
  }, []);

  const [listOptions, setListOptions] = useState<Option[]>([]);
  const [type, setType] = useState<string>("");

  const navigate = useNavigate();

  const handleContest = () => {
    if (!type) {
      alert("Vui lòng chọn một đề thi trước khi tiếp tục.");
      return;
    }
    navigate("/user/contest", { state: { title: type } });
  };

  return (
    <div className="choice-contest-container">
      <h3 className="title">
        Xin chào <span>{user?.name}</span>
      </h3>
      <div className="option">
        <div className="dropdown">
          <Dropdown
            value={type}
            listOptions={listOptions}
            setType={setType}
            size="large"
          />
        </div>
        <button className="btn btn-create" onClick={() => handleContest()}>
          <div className="icon-plus">
            <GoPlus />
          </div>
          <span>Tạo đề thi</span>
        </button>
      </div>
    </div>
  );
}

export default ChoiceContest;