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
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const firestore = getFirestore(app);
const usersCollection = collection(firestore, "user");
const informationCollection = collection(firestore, "information");
const rolesCollection = collection(firestore, "roles");

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
          option: "Khách hàng",
          remember: user.remember,
          captcha: user.captcha,
          id: userCredential.user.uid, // Lưu UID từ Firebase Auth
        });

        await signOut(auth);

        dataReturn = { EM: "CREATE", EC: 0, DT: "User created successfully." };
        return dataReturn;
      } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    } else {
      // Email đã tồn tại -> Kiểm tra thông tin xác thực
      const existingUser = querySnapshot.docs[0];
      try {
        if (user.option !== existingUser.data().option) {
          dataReturn = { EM: "ROLE VALID", EC: 0, DT: existingUser.id };
          return dataReturn;
        }
        const isLogin = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        console.log(isLogin);
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
        dataReturn = { EM: "ERROR", EC: 0, DT: "" };
        return dataReturn;
      }
    }
  } catch (error: any) {
    // console.log(error);
    return { EM: "ERROR CHARACTER", EC: 0, DT: "" };
    // throw new Error(`Lỗi: ${error.message}`);
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

export const resetPassword = async (email: string): Promise<string> => {
  try {
    // Gửi email khôi phục mật khẩu đến người dùng
    await sendPasswordResetEmail(auth, email);

    return "Password reset email sent successfully. Please check your email.";
  } catch (error: any) {
    console.error("Error sending password reset email:", error.message);
    throw new Error(`Error: ${error.message}`);
  }
};

export const getUserInformation = async (userId: string) => {
  try {
    // Lấy thông tin người dùng từ informationCollection
    const docRefInfo = doc(informationCollection, userId);
    const docSnapInfo = await getDoc(docRefInfo);

    // Lấy thông tin người dùng từ usersCollection
    const docRefUser = doc(usersCollection, userId);
    const docSnapUser = await getDoc(docRefUser);

    if (docSnapInfo.exists() && docSnapUser.exists()) {
      const userDataInfo = docSnapInfo.data();
      const userDataUser = docSnapUser.data();

      // Trả về thông tin đầy đủ (kết hợp từ 2 collection)
      return {
        id: userId,
        name: userDataInfo.name,
        avatarUrl: userDataInfo.avatar,
        option: userDataUser.option, // Thêm trường 'option' từ usersCollection
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching user information:", error.message);
    return null;
  }
};

export const fetchAllRoles = async () => {
  try {
    const querySnapshot = await getDocs(rolesCollection);

    // Trích xuất trường 'text' từ mỗi document
    const dataOptions = querySnapshot.docs.map((doc) => ({
      text: doc.data().text, // Chỉ lấy trường "text"
    }));

    console.log(dataOptions);

    return dataOptions; // Trả về mảng dataOptions
  } catch (error: any) {
    console.error("Error fetching roles:", error.message);
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};
