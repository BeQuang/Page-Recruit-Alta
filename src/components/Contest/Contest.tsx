/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataContest, ResultSubmit } from "../../Types/contest";
import { fetchContestByTitle } from "../../firebase/contestController";
import { ThreeCircles } from "react-loader-spinner";
import QuestionOneAnswer from "../QuestionItem/QuestionOneAnswer";
import Countdown from "../Time/Countdown";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import QuestionMultipleAnswer from "../QuestionItem/QuestionMultipleAnswer";
import QuestionText from "../QuestionItem/QuestionTextAnswer";

function Contest() {
  const location = useLocation();
  const { title } = location.state || {};

  const [dataContest, setDataContest] = useState<DataContest | null>(null);
  const [questionCurrent, setQuestionCurrent] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [resultSubmit, setResultSubmit] = useState<ResultSubmit>({
    id: "",
    result: [],
  });

  const [completedQuestions, setCompletedQuestions] = useState<number>(0); // Track completed questions

  useEffect(() => {
    const fetchData = async () => {
      if (!title) {
        console.error("No title provided");
        return;
      }

      try {
        const contestData = await fetchContestByTitle(title);
        setDataContest(contestData);
        setRemainingTime(contestData.fullTime);
        setLoading(false);
        setResultSubmit({ id: contestData.id, result: [] });
      } catch (error) {
        console.error("Error fetching contest:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  // Đếm ngược thời gian
  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(prevTime - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handlePrevQuestion = () => {
    if (questionCurrent > 0) {
      setQuestionCurrent(questionCurrent - 1);
    }
  };

  const handleNextQuestion = () => {
    if (dataContest && questionCurrent < dataContest.totalQuestions - 1) {
      setQuestionCurrent(questionCurrent + 1);
    }
  };

  const handleSubmitResult = () => {
    console.log(resultSubmit);
  };

  useEffect(() => {
    // Calculate completed questions based on the resultSubmit state
    let completedCount = 0;

    resultSubmit.result.forEach((result) => {
      // Nếu result có oneAnswer, multipleAnswer hoặc textAnswer thì câu hỏi được coi là hoàn thành
      const isCompleted =
        (result.oneAnswer && result.oneAnswer.trim() !== "") || // Kiểm tra cho oneAnswer
        (result.multipleAnswer && result.multipleAnswer.length > 0) || // Kiểm tra cho multipleAnswer
        (result.textAnswer && result.textAnswer.trim() !== ""); // Kiểm tra cho textAnswer

      if (isCompleted) {
        completedCount++;
      }
    });

    setCompletedQuestions(completedCount);
  }, [resultSubmit, dataContest]);
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
        <>
          <header>
            <div>Đề thi môn</div>
            <h3 className="title">
              {title || "Không có loại đề thi được chọn"}
            </h3>
            <div className="information">
              <div className="total">
                Tổng câu hỏi: <span>{dataContest?.totalQuestions}</span>
              </div>
              <div className="finish">
                Hoàn thành:{" "}
                <span>{`${completedQuestions}/${dataContest?.totalQuestions}`}</span>
              </div>
              <Countdown remainingTime={remainingTime} />
              <button
                className="btn btn-submit"
                onClick={() => handleSubmitResult()}
              >
                Nộp bài
              </button>
            </div>
          </header>
          <div className="question-container mt-4">
            {dataContest?.listQuestions?.map((question, index) => {
              if (question.type === "oneAnswer") {
                return (
                  <div
                    className={questionCurrent === index ? "d-block" : "d-none"}
                    key={index}
                  >
                    <QuestionOneAnswer
                      dataContest={question}
                      currentQuestion={index}
                      setResultSubmit={setResultSubmit}
                    />
                  </div>
                );
              } else if (question.type === "multipleAnswer") {
                return (
                  <div
                    className={questionCurrent === index ? "d-block" : "d-none"}
                    key={index}
                  >
                    <QuestionMultipleAnswer
                      dataContest={question}
                      currentQuestion={index}
                      setResultSubmit={setResultSubmit}
                    />
                  </div>
                );
              } else if (question.type === "text") {
                return (
                  <div
                    className={questionCurrent === index ? "d-block" : "d-none"}
                    key={index}
                  >
                    <QuestionText
                      dataContest={question}
                      currentQuestion={index}
                      setResultSubmit={setResultSubmit}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="prev-next">
            <div className="prev" onClick={() => handlePrevQuestion()}>
              <GrFormPreviousLink />
            </div>
            <div className="next" onClick={() => handleNextQuestion()}>
              <GrFormNextLink />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Contest;
