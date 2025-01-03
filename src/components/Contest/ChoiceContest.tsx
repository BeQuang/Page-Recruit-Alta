/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Contest.scss";
import Dropdown from "../Dropdown/Dropdown";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Contest } from "../../Types/contest";
import { resetTime } from "../../redux/slices/titleContest.slice";
function ChoiceContest() {
  // Lấy dữ liệu user từ Redux Store
  const defaultUser = { id: "", name: "", avatarUrl: "" };
  const user = useSelector((state: RootState) => state.user) || defaultUser;

  const listTitleContest: Contest[] =
    useSelector((state: RootState) => state.titleContest.contests) || [];

  useEffect(() => {
    setListOptions(listTitleContest);
  }, [listTitleContest]); // Update when listTitleContest changes

  const [listOptions, setListOptions] = useState<Contest[]>([]);
  const [type, setType] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleContest = () => {
    if (!type) {
      alert("Vui lòng chọn một đề thi trước khi tiếp tục.");
      return;
    }

    // Gọi action resetTime để reset thời gian của đề thi
    dispatch(resetTime({ title: type }));

    // Chuyển hướng đến trang /user/contest
    navigate("/user/contest", { state: { title: type } });
  };

  return (
    <div className="choice-contest-container">
      <h3 className="title">
        Xin chào <span>{user?.user?.name}</span>
      </h3>
      <div className="option">
        <div className="dropdown">
          <Dropdown
            value={type}
            listOptions={listOptions}
            setType={(value: string | string[]) => setType(value as string)}
            size="large"
            title="Chọn môn thi"
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
