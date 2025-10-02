import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from './components/header/header.component.jsx';
import RegisterForm from './components/auth/register.component.jsx';
import LoginForm from './components/auth/login.component.jsx';

const Home = () => {
	return (
		<div>Home dummy content </div>
	);
}


const App = () => {
   return (
    <Routes>
      <Route path="/" element = {<Header />}>
          <Route index element = {<Home />} />
          <Route path="register" element = {<RegisterForm />} />
          <Route path="login" element = {<LoginForm />} />
      </Route> 
     </Routes>
   );
};


export default App;


