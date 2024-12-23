import {
  ValidLoginProps,
  ValidProcessProps,
  validRegisterBusinessProps,
  validRegisterOnlineProps,
} from "../../Types/valid";

const validateEmail = (email: string | null | undefined) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone: string) => {
  return phone.match(/^[0-9]{10,15}$/); // Kiểm tra số điện thoại từ 10-15 chữ số
};

const validLogin = async ({ email, password }: ValidLoginProps) => {
  if (!validateEmail(email) || password === "") {
    return false;
  }
  return true;
};

const validProcess = ({ type, link, description }: ValidProcessProps) => {
  if (type === "" || link === "" || description === "") {
    return false;
  }
  return true;
};

const validRegisterBusiness = ({
  email,
  address,
  business,
  manager,
  phone,
  phoneManager,
}: validRegisterBusinessProps): number => {
  if (!validateEmail(email)) return 1; // Email không hợp lệ
  if (address === "") return 2; // Address để trống
  if (business === "") return 3; // Business để trống
  if (manager === "") return 4; // Manager để trống
  if (phone === "") return 5; // Phone để trống
  if (phoneManager === "") return 6; // Phone Manager để trống
  return 0; // Không có lỗi
};

const validRegisterOnline = ({
  name,
  school,
  specialized,
  email,
  phone,
  location,
  shape,
  implement,
  known,
  selectedDate,
  selectedFile,
}: validRegisterOnlineProps): number => {
  if (selectedFile === null) return 11; // SelectedFile để trống
  if (name === "") return 1; // Name để trống
  if (!validateEmail(email)) return 4; // Email không hợp lệ
  if (selectedDate === null) return 10; // SelectedDate để trống
  if (phone === "") return 5; // Phone để trống
  if (location === "") return 6; // Location để trống
  if (shape === "") return 7; // Shape để trống
  if (implement === "") return 8; // Implement để trống
  if (known === "") return 9; // Known để trống
  if (school === "") return 2; // School để trống
  if (specialized === "") return 3; // Specialized để trống
  return 0; // Không có lỗi
};

export {
  validateEmail,
  validatePhone,
  validLogin,
  validProcess,
  validRegisterBusiness,
  validRegisterOnline,
};
