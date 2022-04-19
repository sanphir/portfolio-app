import React from 'react'
import { useParams, useLocation } from "react-router-dom";

export const EmployeeForm = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <div>
      <p>EmployeeForm {params.id}</p>
      <p>Stat {JSON.stringify(location.state)}</p>
    </div>
  )
}