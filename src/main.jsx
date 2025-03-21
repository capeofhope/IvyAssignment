import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import App from "./App";
import Search from "./Search";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>} ></Route>
    <Route path="/search" element={<Search/>} ></Route>
  </Routes>
  </BrowserRouter>
);
