import { useState, useRef, useEffect } from "react";
import "./Dropdown.scss";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

interface Option {
  text: string;
}

interface DropdownProps {
  value?: string | string[]; // value có thể là string hoặc string[]
  listOptions: Option[];
  setType: (value: string | string[]) => void;
  size?: string;
  title?: string;
  multiple?: boolean;
}

function Dropdown({
  value,
  listOptions,
  setType,
  size,
  title = "Select...", // Đặt giá trị mặc định cho title
  multiple = false,
}: DropdownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : [] // Khởi tạo selectedOptions với giá trị từ value
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // Tìm kiếm theo chuỗi
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cập nhật selectedOptions khi giá trị value thay đổi
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        // Nếu value là chuỗi, tách thành mảng
        setSelectedOptions(value.split(",").map((item) => item.trim()));
      } else {
        // Nếu value đã là mảng, trực tiếp gán vào selectedOptions
        setSelectedOptions(value);
      }
    }
  }, [value]);

  const handleChoiceOption = (item: Option) => {
    if (multiple) {
      const isSelected = selectedOptions.includes(item.text);
      let newSelectedOptions;

      if (isSelected) {
        // Nếu đã chọn, loại bỏ tùy chọn khỏi selectedOptions
        newSelectedOptions = selectedOptions.filter(
          (option) => option !== item.text
        );
      } else {
        // Nếu chưa chọn, thêm vào selectedOptions
        newSelectedOptions = [...selectedOptions, item.text];
      }

      // Cập nhật lại selectedOptions và value của dropdown
      setSelectedOptions(newSelectedOptions);
      setType(newSelectedOptions); // Cập nhật giá trị của dropdown
    } else {
      // Chế độ không phải multiple, chỉ có thể chọn một giá trị
      setIsFocus(false);
      setSelectedOptions([item.text]); // Chỉ chọn một option duy nhất
      setType(item.text); // Cập nhật giá trị cho dropdown
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lọc các option dựa trên từ khóa tìm kiếm
  const filteredOptions = listOptions.filter((option) =>
    option.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div
        className={`${isFocus ? "search focus" : "search"} ${
          size === "large" ? "size-large" : ""
        }`}
        onClick={() => setIsFocus(!isFocus)}
      >
        <p className="title">
          {selectedOptions.length === 0 ||
          (multiple && selectedOptions.every((opt) => opt === "")) // Kiểm tra xem có lựa chọn nào không
            ? title
            : multiple
            ? selectedOptions.join(", ")
            : selectedOptions[0]}
        </p>
        <div className={!isFocus ? "icon-down icon" : "icon-up icon"}>
          <IoMdArrowDropdown />
        </div>
      </div>
      {isFocus && (
        <div className="content mt-2">
          {/* Thêm ô tìm kiếm */}
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredOptions.length === 0 ? (
            <div className="no-results">No results found</div>
          ) : (
            filteredOptions.map((item, index) => (
              <div
                key={index}
                className={`item d-flex justify-content-between align-items-center ${
                  selectedOptions.includes(item.text) ? "selected" : ""
                }`}
                onClick={() => handleChoiceOption(item)}
              >
                <span>{item.text}</span>
                {selectedOptions.includes(item.text) && (
                  <div className="icon-check">
                    <IoCheckmark />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
