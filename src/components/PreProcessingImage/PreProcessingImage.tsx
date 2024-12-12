export const preProcessingImage = (linkImage: string) => {
  const regex = /\/file\/d\/([^/]+)\//; // Biểu thức để lấy ID trong URL
  const match = linkImage.match(regex);
  if (match && match[1]) {
    const id = match[1];
    return `https://drive.google.com/thumbnail?id=${id}`;
  }
  return null; // Trả về null nếu URL không hợp lệ
};
