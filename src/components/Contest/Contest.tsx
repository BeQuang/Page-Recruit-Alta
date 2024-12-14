import React, { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { DataContest } from "../../Types/contest";
import { fetchContestByTitle } from "../../firebase/contestController";
import { ThreeCircles } from "react-loader-spinner";
import { convertMillisecondsToTime } from "../Time/ConvertTime";

function Contest() {
  const location = useLocation();
  const { title } = location.state || {};

  const [dataContest, setDataContest] = useState<DataContest | null>(null);
  const [questionCurrent, setQuestionCurrent] = useState<number>(1);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Thêm state loading

  useEffect(() => {
    const fetchData = async () => {
      if (!title) {
        console.error("No title provided");
        return;
      }

      try {
        const contestData = await fetchContestByTitle(title);
        setDataContest(contestData);
        setRemainingTime(contestData.fullTime); // Gán fullTime vào remainingTime
        setLoading(false); // Dữ liệu đã được fetch xong, set loading false
        console.log("Fetched contest:", contestData);
      } catch (error) {
        console.error("Error fetching contest:", error);
        setLoading(false); // Cũng cần set loading false nếu fetch bị lỗi
      }
    };

    fetchData();
  }, [title]);

  // Đếm ngược thời gian
  useEffect(() => {
    if (remainingTime <= 0) return; // Dừng đếm ngược khi hết giờ

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [remainingTime]);

  return (
    <div className="contest-child-container">
      {loading ? (
        <div className="loading-container">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#f26d21"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h1>Loading data...</h1>
        </div>
      ) : (
        <header>
          <div>Đề thi môn</div>
          <h3 className="title">{title || "Không có loại đề thi được chọn"}</h3>
          <div className="information">
            <div className="total">
              Tổng câu hỏi: <span>{dataContest?.totalQuestions}</span>
            </div>
            <div className="finish">
              Hoàn thành:{" "}
              <span>{`${questionCurrent}/${dataContest?.totalQuestions}`}</span>
            </div>
            <div className="time">
              <div className="icon">
                <MdAccessTime />
              </div>
              <div>{convertMillisecondsToTime(remainingTime)}</div>
            </div>
            <button className="btn btn-submit">Nộp bài</button>
          </div>
        </header>
      )}
    </div>
  );
}

export default Contest;
