import React from "react";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
  disabled?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  disabled = false,
  className,
}) => (
  <div className={`col-12 col-md-6 ${className}`}>
    <Form.Group controlId={id}>
      <Form.Label>
        {label}
        <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type="text"
        placeholder={`Nhập ${label}`}
        value={value}
        onChange={onChange}
        className={error ? "is-error" : ""}
        disabled={disabled}
      />
      {error && (
        <div className="text-danger d-flex error-text">
          <div className="icon-danger me-2">
            <CgDanger />
          </div>
          <span>{`${label} không hợp lệ`}</span>
        </div>
      )}
    </Form.Group>
  </div>
);

export default FormInput;
