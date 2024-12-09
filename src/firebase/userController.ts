import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import { User } from "../Types/login";

export const firestore = getFirestore(app);
const usersCollection = collection(firestore, "user");
const informationCollection = collection(firestore, "information");

interface DataReturn {
  EM: string;
  EC: number;
  DT: string;
}

// Hàm tạo hoặc cập nhật user
export const createOrUpdateUser = async (user: User): Promise<DataReturn> => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    let dataReturn: DataReturn;

    if (querySnapshot.empty) {
      // Email chưa tồn tại -> Tạo mới
      await addDoc(usersCollection, user);
      dataReturn = { EM: "CREATE", EC: 0, DT: "User created successfully." };
      return dataReturn;
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

        dataReturn = { EM: "UPDATE", EC: 0, DT: existingUser.id };
        return dataReturn;
      } else {
        dataReturn = { EM: "ERROR", EC: 0, DT: "" };
        return dataReturn;
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

export const getUserInformation = async (userId: string) => {
  const docRef = doc(informationCollection, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    return {
      id: userId,
      name: userData.name,
      avatarUrl: userData.avatar,
    };
  } else {
    console.log("No such document!");
    return null;
  }
};
