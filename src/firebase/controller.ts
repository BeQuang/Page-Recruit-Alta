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
const usersCollection = collection(firestore, "user");

// Hàm tạo hoặc cập nhật user
export const createOrUpdateUser = async (user: User): Promise<string> => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Email chưa tồn tại -> Tạo mới
      await addDoc(usersCollection, user);
      return `CREATE`;
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

        return `UPDATE`;
      } else {
        return "ERROR";
      }
    }
  } catch (error: any) {
    throw new Error(`Lỗi: ${error.message}`);
  }
};

export const checkEmailExit = async (
  email: string
): Promise<boolean | undefined> => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error: any) {
    console.log(error);
  }
};

interface ChangePassWordProps {
  email: string;
  password: string;
}

export const changePassword = async ({
  email,
  password,
}: ChangePassWordProps) => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingUser = querySnapshot.docs[0];
      const userRef = doc(firestore, "user", existingUser.id);
      await updateDoc(userRef, {
        password: password,
      });

      return "Updated successfully";
    }
  } catch (error) {
    console.log(error);
  }
};
