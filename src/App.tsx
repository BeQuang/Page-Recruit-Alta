import { useDispatch } from "react-redux";
import "./App.scss";
import AppRoutes from "./routes/AppRoutes";
import { AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { fetchImagesThunk } from "./redux/slices/images.slice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Dispatch action để tải dữ liệu
    dispatch(fetchImagesThunk());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
