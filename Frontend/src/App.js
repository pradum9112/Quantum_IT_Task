import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInForm from "./components/login/SignInForm";
import SignUpForm from "./components/register/SignUpForm";
import TableData from "./components/tableData/TableData";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableData />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
