import {React} from 'react';
import { Link } from "react-router-dom";
const LoginForm = () => {
return (
<div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form>       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value=""
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

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      {/* Login Link */}
     <p className="mt-3 text-center">
	  Dont have an account ?{' '}
	  <Link to="/register" className="text-decoration-none">
	    Register now
	  </Link>
	  {' '}|{' '}
	  <Link to="/forgot-password" className="text-decoration-none">
	    Forgot Password?
	  </Link>
    </p>
    </div>
);
}
export default LoginForm;