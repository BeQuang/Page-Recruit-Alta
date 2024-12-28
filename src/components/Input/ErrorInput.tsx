import React from "react";
import { CgDanger } from "react-icons/cg";

interface ErrorTextProps {
  errorCode: number;
  errorMessage: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ errorCode, errorMessage }) => {
  return (
    <div className="text-danger d-flex error-text">
      <div className="icon-danger me-2">
        <CgDanger />
      </div>
      <span>{errorMessage}</span>
    </div>
  );
};

export default ErrorText;
