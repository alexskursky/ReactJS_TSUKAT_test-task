import React from "react";
import { public_routes } from "./index";
import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {public_routes.map((el) => (
          <Route key={el.path} path={el.path} element={el.element} />
        ))}
      </Route>
      <Route path="*" element={<Navigate replace to="/tasks" />} />
    </Routes>
  );
};

export default AppRouter;
