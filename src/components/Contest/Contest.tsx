/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DataContest, ResultSubmit } from "../../Types/contest";
import { createResultContest } from "../../firebase/contestController";
import { ThreeCircles } from "react-loader-spinner";
import QuestionOneAnswer from "../QuestionItem/QuestionOneAnswer";
import Countdown from "../Time/Countdown";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import QuestionMultipleAnswer from "../QuestionItem/QuestionMultipleAnswer";
import QuestionText from "../QuestionItem/QuestionTextAnswer";
import { useDispatch } from "react-redux";
import { updateFullTime } from "../../redux/slices/titleContest.slice";
import {
  useFetchContestData,
  useCountdown,
  useSubmitOnTimeUp,
  useCompletedQuestions,
  useBeforeUnloadWarning,
  useBlockNavigation,
} from "./HandleUseEffectContest";

function Contest() {
  const location = useLocation();
  const dispatch = useDispatch(); // Initialize dispatch
  const { title } = location.state || {};

  const [dataContest, setDataContest] = useState<DataContest | null>(null);
  const [questionCurrent, setQuestionCurrent] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(true);

  const [resultSubmit, setResultSubmit] = useState<ResultSubmit>({
    id: "",
    result: [],
    submitted: false,
  });

  const [completedQuestions, setCompletedQuestions] = useState<number>(0);
  const [isNavigationBlocked, setIsNavigationBlocked] =
    useState<boolean>(false); // Khai báo state isNavigationBlocked

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

  const handleSubmitResult = async () => {
    setResultSubmit((prevState) => ({
      ...prevState,
      submitted: true,
    }));
    const res = await createResultContest(resultSubmit);
    setRemainingTime(0);
    dispatch(updateFullTime({ title, newFullTime: 0 }));
    console.log(res);
  };

  useFetchContestData(
    title,
    setDataContest,
    setRemainingTime,
    setLoading,
    setResultSubmit
  );
  useCountdown(remainingTime, setRemainingTime);
  useSubmitOnTimeUp(remainingTime, resultSubmit, handleSubmitResult);
  useCompletedQuestions(resultSubmit, setCompletedQuestions);
  useBeforeUnloadWarning(
    remainingTime,
    completedQuestions,
    dataContest,
    resultSubmit
  );
  useBlockNavigation(
    remainingTime,
    completedQuestions,
    dataContest,
    resultSubmit,
    setIsNavigationBlocked
  );

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
                disabled={resultSubmit.submitted}
              >
                {resultSubmit.submitted ? "Đã nộp bài" : "Nộp bài"}
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
