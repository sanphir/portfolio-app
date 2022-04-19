import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import EmployeesTable from "./components/EmployeesTable/EmployeesTable";
import { EmployeeForm } from "./components/EmployeeForm";
import { Provider } from 'react-redux'
import NotFound from "./components/NotFound";
import { RequireAuth } from './components/RequireAuth';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="employees"
              element={
                <RequireAuth>
                  <EmployeesTable />
                </RequireAuth>
              }
            />
            {/* <Route path="new" element={<EmployeeForm />} /> */}
            <Route path="employees/:id"          element={
                <RequireAuth>
                  <EmployeeForm />
                </RequireAuth>
              } />


            <Route path="notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="notfound" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
