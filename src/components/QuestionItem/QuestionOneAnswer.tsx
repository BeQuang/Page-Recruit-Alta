import { AnswerItem, QuestionItem, ResultSubmit } from "../../Types/contest";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "./Question.scss";

interface QuestionOneAnswerProps {
  dataContest: QuestionItem | null;
  currentQuestion: number;
  setResultSubmit: React.Dispatch<React.SetStateAction<ResultSubmit>>; // Thêm setResultSubmit để cập nhật kết quả
}

function QuestionOneAnswer({
  dataContest,
  currentQuestion,
  setResultSubmit,
}: QuestionOneAnswerProps) {
  const listAnswer: AnswerItem[] | undefined = dataContest?.answer;

  // State để lưu trữ đáp án đã chọn
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Cập nhật đáp án đã chọn
    setSelectedAnswer(event.target.value);
  };

  const handleWrapClick = (value: string) => {
    // Cập nhật khi click vào wrapper (div)
    setSelectedAnswer(value);
  };

  // Cập nhật kết quả vào resultSubmit
  useEffect(() => {
    setResultSubmit((prevResult) => {
      const newResultAnswer = {
        currentQuestion,
        oneAnswer: selectedAnswer || "", // Nếu không có đáp án, để là chuỗi rỗng
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
  }, [selectedAnswer, currentQuestion, setResultSubmit]);

  return (
    <div className="one-answer-container">
      <div className="title">
        Cau<span> {currentQuestion + 1}</span>:
      </div>
      <div className="question">{dataContest && dataContest.question}</div>
      <div className="list-answer mt-3">
        {listAnswer &&
          listAnswer.map((answer, index) => {
            return (
              <div
                className="wrap"
                key={index}
                onClick={() => handleWrapClick(answer.name)} // Khi click vào div, chọn đáp án
              >
                <Form.Check
                  label={answer.name}
                  name="group1"
                  type="radio"
                  id={`reverse-${index}`}
                  value={answer.name} // Lưu giá trị của đáp án
                  className="radio-input"
                  checked={selectedAnswer === answer.name} // Kiểm tra đáp án đã chọn
                  onChange={handleAnswerChange} // Cập nhật khi thay đổi đáp án
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default QuestionOneAnswer;
