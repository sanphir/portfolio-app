import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Employees } from "./components/Employees";
import { EmployeeForm } from "./components/EmployeeForm";
import NotFound from "./components/NotFound";
import { RequireAuth } from './components/RequireAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          {/* <Route path="employees" element={<EmployeesList />}>
          <Route path=":employeeId" element={<EmployeeForm />} />
          <Route path="new" element={<EmployeeForm />} />
          <Route index element={<EmployeesList />} />
        </Route> */}

          <Route 
            path="/employees"
            element={
              <RequireAuth>
                <Employees />
              </RequireAuth>
            }
          />

          <Route path="notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="notfound" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
