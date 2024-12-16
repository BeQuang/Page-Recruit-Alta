import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppDispatch } from "../redux/store";
import { fetchUserData, clearUser } from "../redux/slices/user.slice";
import {
  fetchContestData,
  clearContests,
} from "../redux/slices/titleContest.slice";

const useAuthStateChanged = (
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => void,
  setUser: (user: any) => void
) => {
  useEffect(() => {
    const auth = getAuth();
    setLoading(true); // Bắt đầu quá trình fetch, set loading = true

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Nếu người dùng đã đăng nhập, dispatch action để lấy dữ liệu người dùng từ Firestore
        dispatch(fetchUserData(user.uid)).finally(() => setLoading(false)); // Khi dữ liệu người dùng đã được fetch, set loading = false
        dispatch(fetchContestData(user.uid)).finally(() => setLoading(false)); // Khi dữ liệu contest đã được fetch, set loading = false
        setUser(user); // Cập nhật trạng thái người dùng khi thay đổi
      } else {
        // Nếu người dùng chưa đăng nhập, xóa dữ liệu
        dispatch(clearUser());
        dispatch(clearContests());
        setLoading(false); // Nếu không có user, set loading = false
      }
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, [dispatch, setLoading, setUser]);
};

export default useAuthStateChanged;
