import { QuestionItem, ResultSubmit } from "../../Types/contest";
import { useState, useEffect } from "react";
import "./Question.scss";

interface QuestionTextAnswerProps {
  dataContest: QuestionItem | null;
  currentQuestion: number;
  setResultSubmit: React.Dispatch<React.SetStateAction<ResultSubmit>>; // Thêm setResultSubmit để cập nhật kết quả
}

function QuestionTextAnswer({
  dataContest,
  currentQuestion,
  setResultSubmit,
}: QuestionTextAnswerProps) {
  // State để quản lý câu trả lời nhập vào
  const [textAnswer, setTextAnswer] = useState<string>("");

  // Cập nhật kết quả vào resultSubmit
  useEffect(() => {
    setResultSubmit((prevResult) => {
      const newResultAnswer = {
        currentQuestion,
        textAnswer: textAnswer || "", // Nếu không có đáp án, để là chuỗi rỗng
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
  }, [textAnswer, currentQuestion, setResultSubmit]);

  return (
    <div className="text-answer-container">
      <div className="title">
        Câu<span> {currentQuestion + 1}</span>:
      </div>
      <div className="question">{dataContest && dataContest.question}</div>
      <div className="list-answer mt-3">
        <textarea
          rows={8}
          cols={50}
          placeholder="Điền câu trả lời..."
          className="text"
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)} // Cập nhật câu trả lời khi thay đổi
        ></textarea>
      </div>
    </div>
  );
}

export default QuestionTextAnswer;
