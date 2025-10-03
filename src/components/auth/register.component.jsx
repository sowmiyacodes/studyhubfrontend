import {useState} from 'react';
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    roll_no: '',
    email: '',
    display_name: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name] : value,

    });
    setErrors((prev)=>({
    ...prev,
    [name]:''
  }));
  };
  
  const validateData = () =>
  {
      let newerrors = {};
      if(!formData.roll_no.trim()) newerrors.roll_no = 'Required';
      if(!formData.email.trim()) newerrors.email = 'Required';
      if(!formData.display_name.trim()) newerrors.display_name = 'Required';
      if(!formData.password.trim()) newerrors.password = 'Required';
      if(!formData.confirm_password.trim()) newerrors.confirm_password = 'Required';

      return newerrors;
  } ; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateData();
     if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
            setMessage('Errors found!!')
      console.log(validationErrors);
      return;
    }
    else
    {
       setMessage('')
    } 
    console.log('Form is submitted');

  }
return (
<div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">Register</h1>
            {message && <div className="alert alert-info">{message}</div>}
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roll_no" className="form-label">Roll No</label>
          <input
            type="text"
            className={`form-control ${errors.roll_no ? 'is-invalid' : ''}`}
            id="roll_no"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
          />  
          {errors.roll_no && <div className="invalid-feedback">{errors.roll_no}</div>}        
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
             className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>


        <div className="mb-3">
          <label htmlFor="display_name" className="form-label">Display Name</label>
          <input
            type="text"
            className={`form-control ${errors.display_name ? 'is-invalid' : ''}`}
            id="display_name"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
          />
          {errors.display_name && <div className="invalid-feedback">{errors.display_name}</div>}         
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid': ''}` }
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          /> 
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}         
        </div>

        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
          {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <p className="mt-3 text-center">
        Already registered?{' '}
        <Link to="/login" className="text-decoration-none">
          Login now
        </Link>
      </p>
    </div>
);
}
export default RegisterForm;