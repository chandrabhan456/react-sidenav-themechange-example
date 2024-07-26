import React,{useEffect} from 'react';
import { emailValidator, passwordValidator } from '../components/regexValidators';
import {useNavigate} from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import "./Login.css";

const Login = () => {
    const { login1, setlogin1 } = useStateContext();
	const navigate = useNavigate();

	const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');

	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
		
	};

	
	const formSubmitter=(e) =>{
		
		e.preventDefault();
  
		
		setsuccessMessage('');
		if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		if (!passwordValidator(input.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		// setsuccessMessage('Successfully Validated');
		if(input.email !== 'admin@a.com' || input.password !== 'Password@1') return seterrorMessage('Invalid email or password');

		
        setlogin1(true)
		

	};
	useEffect(() => {
		localStorage.setItem('login',login1);
	},[login1])
		
	return (
		
	  <div className="login">
	<h4>Login</h4>
	<form onSubmit={formSubmitter}>
	  <div className="text_area">
		<input
		type="text"
		name="email"
		placeholder="Type your username"
		onChange={handleChange}
		  className="text_input"

		/>
	  </div>
	  <div className="text_area">
		<input
		 type="password"
		 name="password"
		 placeholder="Type your password"
		 onChange={handleChange}

		  className="text_input"

		/>
	  </div>
	  <button
		
		
		className="btn"

	  >Login</button>
	</form>
	<a className="link" href="/signup">Sign Up</a>
  </div>
)
};

export default Login;