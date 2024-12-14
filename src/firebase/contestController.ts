import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "./firebase";

export const firestore = getFirestore(app);
const contestsCollection = collection(firestore, "contest");

export const fetchAllTitles = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(contestsCollection);
    const titles = querySnapshot.docs
      .map((doc) => doc.data()?.title)
      .filter((title) => title !== undefined);
    return titles;
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
