import React from "react";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { TiCloudStorageOutline } from "react-icons/ti";

interface FileInputProps {
  id: string;
  label: string;
  selectedFile: File | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  triggerFileInput: () => void;
  error: boolean;
  disabled?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  selectedFile,
  onChange,
  triggerFileInput,
  error,
  disabled = false,
}) => (
  <div className="col-6">
    <Form.Label htmlFor={id}>
      {label}
      <span className="text-danger">*</span>
    </Form.Label>
    <div className="input-file">
      {selectedFile ? (
        <span className="file-name">{selectedFile.name}</span>
      ) : (
        <TiCloudStorageOutline className="icon" />
      )}
      <Form.Control
        type="file"
        id={id}
        onChange={onChange}
        style={{ display: "none" }}
        disabled={disabled}
      />
      <button
        type="button"
        className="btn btn-file"
        onClick={triggerFileInput}
        disabled={disabled}
      >
        Chọn file
      </button>
    </div>
    {error && (
      <div className="text-danger d-flex error-text">
        <div className="icon-danger me-2">
          <CgDanger />
        </div>
        <span>Vui lòng chọn file</span>
      </div>
    )}
  </div>
);

export default FileInput;
