import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import { ResultAnswer, ResultSubmit } from "../Types/contest";

export const firestore = getFirestore(app);
const resultContestCollection = collection(firestore, "result-contest");
const contestsCollection = collection(firestore, "contest");

export const fetchAllTitles = async (): Promise<
  { title: string; fullTime: number }[]
> => {
  try {
    const querySnapshot = await getDocs(contestsCollection);
    const contests = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          title: data?.title,
          fullTime: data?.fullTime, // Lấy thêm fullTime từ mỗi contest
          timeCurrent: 0,
        };
      })
      .filter(
        (contest) =>
          contest.title !== undefined && contest.fullTime !== undefined
      ); // Lọc những contest không có title hoặc fullTime

    return contests;
  } catch (error) {
    console.error("Error fetching titles:", error);
    throw error;
  }
};

export const fetchContestByTitle = async (
  title: string
): Promise<any | null> => {
  try {
    const q = query(contestsCollection, where("title", "==", title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const contest = querySnapshot.docs[0].data(); // Lấy tài liệu đầu tiên (nếu có)
      return { id: querySnapshot.docs[0].id, ...contest };
    } else {
      return null; // Không tìm thấy contest
    }
  } catch (error) {
    console.error("Error fetching contest by title:", error);
    throw error;
  }
};

// Hàm tạo mới kết quả thi vào Firestore, Firebase sẽ tự động tạo ID cho tài liệu
export const createResultContest = async (resultSubmit: ResultSubmit) => {
  try {
    // Chuẩn bị dữ liệu result (chỉ lấy những câu trả lời có giá trị)
    const formattedResult = resultSubmit.result.map((answer) => {
      const { oneAnswer, multipleAnswer, textAnswer } = answer;

      // Xác định câu trả lời hợp lệ và trả về đối tượng
      const validAnswer: ResultAnswer = {
        currentQuestion: answer.currentQuestion,
      };

      if (oneAnswer) validAnswer.oneAnswer = oneAnswer;
      if (multipleAnswer) validAnswer.multipleAnswer = multipleAnswer;
      if (textAnswer) validAnswer.textAnswer = textAnswer;

      return validAnswer;
    });

    // Tạo tài liệu mới với Firebase tự tạo ID
    const docRef = await addDoc(resultContestCollection, {
      idContest: resultSubmit.id, // Lưu ID contest vào trường này (có thể tìm lại sau)
      result: formattedResult,
    });

    console.log("Dữ liệu đã được tạo thành công với ID: ", docRef.id);
  } catch (error) {
    console.error("Lỗi khi tạo kết quả thi: ", error);
  }
};
