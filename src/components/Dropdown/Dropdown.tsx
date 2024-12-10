import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.scss";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

interface Option {
  text: string;
}

interface DropdownProps {
  value?: string;
  listOptions: Option[];
  setType: (value: string) => void;
  size?: string;
}

function Dropdown({ value, listOptions, setType, size }: DropdownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChoiceOption = (item: Option) => {
    setIsFocus(false);
    setOption(item.text);
    setType(item.text);
  };

  // Xử lý click ra ngoài
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsFocus(false); // Đóng dropdown khi click ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Lắng nghe sự kiện
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Xóa sự kiện khi component unmount
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div
        className={`${isFocus ? "search focus" : "search"} ${
          size === "large" ? "size-large" : ""
        }`}
        onClick={() => setIsFocus(!isFocus)}
      >
        <p className="title">
          {option.trim() === "" || value === "" ? "Choose option" : option}
        </p>
        <div className={!isFocus ? "icon-down icon" : "icon-up icon"}>
          <IoMdArrowDropdown />
        </div>
      </div>
      {isFocus && (
        <div className="content mt-2">
          {listOptions.map((item, index) => (
            <div
              key={index}
              className="item d-flex justify-content-between align-items-center"
              onClick={() => handleChoiceOption(item)}
            >
              <span>{item.text}</span>
              <div className="icon-check">
                <IoCheckmark />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
