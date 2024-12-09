import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import { User } from "../Types/login";

export const firestore = getFirestore(app);

// Hàm tạo hoặc cập nhật user
export const createOrUpdateUser = async (user: User): Promise<string> => {
  try {
    if (!user.email || !user.password) {
      throw new Error("Email và Password là bắt buộc.");
    }

    const usersCollection = collection(firestore, "user");

    // Kiểm tra xem email đã tồn tại chưa
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Email chưa tồn tại -> Tạo mới
      const newUserRef = await addDoc(usersCollection, user);
      return `User mới được tạo với ID: ${newUserRef.id}`;
    } else {
      // Email đã tồn tại -> Kiểm tra password
      const existingUser = querySnapshot.docs[0];
      const existingUserData = existingUser.data();

      if (existingUserData.password === user.password) {
        // Cập nhật các trường còn lại
        const userRef = doc(firestore, "user", existingUser.id);
        await updateDoc(userRef, {
          option: user.option,
          remember: user.remember,
          captcha: user.captcha,
        });

        return `User với email ${user.email} đã được cập nhật.`;
      } else {
        throw new Error("Email đã tồn tại nhưng mật khẩu không đúng.");
      }
    }
  } catch (error: any) {
    throw new Error(`Lỗi: ${error.message}`);
  }
};
