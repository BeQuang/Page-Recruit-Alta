import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { app, auth } from "./firebase";
import { User } from "../Types/login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const firestore = getFirestore(app);
const usersCollection = collection(firestore, "user");
const informationCollection = collection(firestore, "information");

interface DataReturn {
  EM: string;
  EC: number;
  DT: string;
}

// Hàm tạo hoặc cập nhật user với xác thực
export const createOrUpdateUserWithAuth = async (
  user: User
): Promise<DataReturn> => {
  try {
    // Kiểm tra xem email đã tồn tại trong Firestore
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    let dataReturn: DataReturn;

    if (querySnapshot.empty) {
      // Email chưa tồn tại -> Tạo tài khoản qua Firebase Auth
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          user?.email,
          user.password
        );

        await setDoc(doc(usersCollection, userCredential.user.uid), {
          email: user.email,
          option: user.option,
          remember: user.remember,
          captcha: user.captcha,
          password: user.password,
          id: userCredential.user.uid, // Lưu UID từ Firebase Auth
        });

        dataReturn = { EM: "CREATE", EC: 0, DT: "User created successfully." };
        return dataReturn;
      } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    } else {
      // Email đã tồn tại -> Kiểm tra thông tin xác thực
      const existingUser = querySnapshot.docs[0];
      const existingUserData = existingUser.data();

      if (existingUserData.password === user.password) {
        // Đăng nhập bằng Firebase Auth để kiểm tra tính hợp lệ
        try {
          await signInWithEmailAndPassword(auth, user.email, user.password);

          // Cập nhật các trường còn lại trong Firestore
          const userRef = doc(firestore, "user", existingUser.id);
          await updateDoc(userRef, {
            option: user.option,
            remember: user.remember,
            captcha: user.captcha,
          });

          dataReturn = { EM: "UPDATE", EC: 0, DT: existingUser.id };
          return dataReturn;
        } catch (error: any) {
          throw new Error(`Authentication failed: ${error.message}`);
        }
      } else {
        dataReturn = { EM: "ERROR", EC: 0, DT: "Password does not match." };
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
