import { AnswerItem, DataContest } from "../../Types/contest";
import Form from "react-bootstrap/Form";
import { useState, memo } from "react";
import "./Question.scss";

interface QuestionOneAnswerProps {
  dataContest: DataContest | null;
  currentQuestion: number;
}

function QuestionOneAnswer({
  dataContest,
  currentQuestion,
}: QuestionOneAnswerProps) {
  const listAnswer: AnswerItem[] | undefined =
    dataContest?.listQuestions?.[currentQuestion]?.answer;

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

  console.log(selectedAnswer); // Kiểm tra đáp án đã chọn

  return (
    <div className="one-answer-container">
      <div className="title">
        Cau<span> {currentQuestion + 1}</span>:
      </div>
      <div className="question">
        {dataContest &&
          dataContest.listQuestions &&
          dataContest.listQuestions[currentQuestion].question}
      </div>
      <div className="list-answer">
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

export default memo(QuestionOneAnswer);
