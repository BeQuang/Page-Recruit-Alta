import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AppDispatch } from "../redux/store";
import { fetchUserData, clearUser } from "../redux/slices/user.slice";
import {
  fetchContestData,
  clearContests,
} from "../redux/slices/titleContest.slice";
import { auth } from "../firebase/firebase";

const useAuthStateChanged = (
  dispatch: AppDispatch,
  setLoading: (loading: boolean) => void,
  setUser: (user: any) => void
) => {
  useEffect(() => {
    setLoading(true); // Bắt đầu quá trình fetch, set loading = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Đảm bảo loading được bật khi trạng thái auth thay đổi
      if (user) {
        console.log(user);
        try {
          // Fetch dữ liệu người dùng và contest
          await dispatch(fetchUserData(user.uid));
          await dispatch(fetchContestData(user.uid));
          setUser(user); // Cập nhật trạng thái người dùng
        } catch (error) {
          console.error("Error fetching user or contest data:", error);
        } finally {
          setLoading(false); // Kết thúc loading sau khi hoàn tất
        }
      } else {
        // Nếu không có người dùng, clear dữ liệu Redux
        dispatch(clearUser());
        dispatch(clearContests());
        setUser(null); // Reset trạng thái người dùng
        setLoading(false); // Kết thúc loading
      }
    });

    // Cleanup subscription khi component bị unmount
    return () => unsubscribe();
  }, [dispatch, setLoading, setUser]);
};

export default useAuthStateChanged;
