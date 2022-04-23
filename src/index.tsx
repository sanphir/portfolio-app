import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Home } from "./pages/Home";
import EmployeesTable from "./components/EmployeesTable/EmployeesTable";
import { EmployeeForm } from "./components/EmployeeForm/EmployeeForm";
import { Provider } from 'react-redux'
import NotFound from "./pages/NotFound";
import { RequireAuth, UserRole } from './hoc/RequireAuth';
import { store } from './redux/store';
import DeniedPage from './pages/DeniedPage';

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
            <Route path='home' element={<Home />} />
            <Route path="signin" element={<Signin />} />
            <Route
              path="employees"
              element={
                <RequireAuth role={UserRole.Any}>
                  <EmployeesTable />
                </RequireAuth>
              }
            />

            <Route path="employees/new" element={
              <RequireAuth role={UserRole.Admin}>
                <EmployeeForm />
              </RequireAuth>
            } />

            <Route path="employees/:id" element={
              <RequireAuth role={UserRole.Admin}>
                <EmployeeForm />
              </RequireAuth>
            } />

            <Route path="denied" element={
              <RequireAuth role={UserRole.Any}>
                <DeniedPage />
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
