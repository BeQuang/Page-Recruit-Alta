const convertDate = (dateString: string): string => {
  const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm 0 nếu chỉ có 1 chữ số
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng và thêm 0 nếu chỉ có 1 chữ số
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`; // Trả về định dạng ngày/tháng/năm
};
export default convertDate;
