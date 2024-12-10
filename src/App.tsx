import "./App.scss";
import { Route, Routes } from "react-router-dom";
import NotFound from "./page/NotFound/NotFound";
import Home from "./page/Home/Home";
import Recruit from "./page/Recruit/Recruit";
import Project from "./page/Project/Project";
import LoginForm from "./components/Login/LoginForm";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import ResetPass from "./components/ForgotPass/ResetPass";
import User from "./components/User/User";
import Contest from "./components/Contest/Contest";
import Process from "./components/Process/Process";
import ChoiceContest from "./components/Contest/ChoiceContest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<LoginForm />} />
          <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/reset-pass" element={<ResetPass />} />
        </Route>

        <Route path="/user" element={<User />}>
          <Route index element={<ChoiceContest />} />
          <Route path="/user/contest" element={<Contest />} />
          <Route path="/user/process" element={<Process />} />
        </Route>

        <Route path="/project" element={<Project />} />
        <Route path="/recruit" element={<Recruit />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
