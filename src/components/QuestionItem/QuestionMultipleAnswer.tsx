import React, { useEffect, useState } from "react";
import { AnswerItem, QuestionItem, ResultSubmit } from "../../Types/contest";

interface QuestionMultipleAnswerProps {
  dataContest: QuestionItem | null;
  currentQuestion: number;
  setResultSubmit: React.Dispatch<React.SetStateAction<ResultSubmit>>; // Thêm setResultSubmit để cập nhật kết quả
}

function QuestionMultipleAnswer({
  dataContest,
  currentQuestion,
  setResultSubmit,
}: QuestionMultipleAnswerProps) {
  const listAnswer: AnswerItem[] | undefined = dataContest?.answer;
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleChoice = (answer: string) => {
    // Cập nhật state selectedAnswers
    setSelectedAnswers((prev) => {
      if (prev.includes(answer)) {
        return prev.filter((a) => a !== answer); // Nếu đã chọn thì bỏ chọn
      }
      return [...prev, answer]; // Nếu chưa chọn thì thêm vào
    });
  };

  // Cập nhật kết quả vào resultSubmit
  useEffect(() => {
    setResultSubmit((prevResult) => {
      // Kiểm tra nếu câu hỏi là multipleAnswer
      const newResultAnswer = {
        currentQuestion,
        multipleAnswer: selectedAnswers.join(", "), // Cập nhật multipleAnswer
      };

      // Tìm câu trả lời cũ và thay thế bằng câu trả lời mới
      const updatedResults = prevResult.result.filter(
        (result) => result.currentQuestion !== currentQuestion
      );

      return {
        ...prevResult,
        result: [...updatedResults, newResultAnswer], // Cập nhật danh sách kết quả
      };
    });
  }, [selectedAnswers, currentQuestion, setResultSubmit]);

  return (
    <div className="multiple-answer-container">
      <div className="title">
        Cau<span> {currentQuestion + 1}</span>:
      </div>
      <div className="question">{dataContest?.question}</div>
      <div className="list-answer mt-3">
        {listAnswer &&
          listAnswer.map((answer, index) => (
            <div
              className={`wrap ${
                selectedAnswers.includes(answer.name) ? "active" : ""
              }`}
              key={index}
              onClick={() => handleChoice(answer.name)}
            >
              <div className="name">{answer.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuestionMultipleAnswer;
