import {useState} from 'react';
import { Link, useNavigate  } from "react-router-dom";

export default function RegisterForm()
{

  const [FormData,setFormDate] = useState({
    roll_no:"",
    email:"",
    display_name:"",
    password:"",
    confirmpassword:''
  });
  return(
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h1>Register Now</h1>
      <div className="mb-3">
        <label htmlFor = "roll_no" className = "form-label">Roll No  </label>
        <input
          type = "text"
          name = "roll_no"
          id="roll_no"
          value = {FormData.roll_no}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor = "email" className = "form-label">Email </label>
        <input
          type = "email"
          name = "email"
          id="email"
          value = {FormData.email}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor = "display_name" className = "form-label">Display name </label>
        <input
          type = "text"
          name = "display_name"
          id="display_name"
          className="form-control"
          value = {FormData.display_name}
        />
      </div>
      <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value=""
          />          
        </div>
       <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            name="confirm_password"
            value=""
          />
        </div>

        <button type = "submit" classname = "btn-btn-primary-w-100">Register</button>
    </div>
  )
}