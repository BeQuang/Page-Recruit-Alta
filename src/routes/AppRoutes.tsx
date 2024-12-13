import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../page/NotFound/NotFound";
import Home from "../page/Home/Home";
import Recruit from "../page/Recruit/Recruit";
import Project from "../page/Project/Project";
import LoginForm from "../components/Login/LoginForm";
import ForgotPass from "../components/ForgotPass/ForgotPass";
import ResetPass from "../components/ForgotPass/ResetPass";
import User from "../components/User/User";
import Contest from "../components/Contest/Contest";
import Process from "../components/Process/Process";
import ChoiceContest from "../components/Contest/ChoiceContest";
import PrivateRoutes from "./PrivateRoute";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Home />}>
          <Route index element={<LoginForm />} />
          <Route path="/login/forgot-pass" element={<ForgotPass />} />
          <Route path="/login/reset-pass" element={<ResetPass />} />
        </Route>

        <Route
          path="/user"
          element={
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          }
        >
          <Route index element={<ChoiceContest />} />
          <Route path="/user/contest" element={<Contest />} />
          <Route path="/user/process" element={<Process />} />
        </Route>

        <Route path="/project" element={<Project />} />
        <Route path="/recruit" element={<Recruit />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
