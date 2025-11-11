// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";

// const App = () => <h1><button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
//   Button</button>
// Hello World!</h1>;

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>,
);
