import React from 'react'
import './AuthPage.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

export default function AuthPage() {
  const [loginState, setLoginState] = React.useState(true);

  const loginHanlder = (bool) => {
    setLoginState(bool)
  }
  return (
    <div className="auth-page">     
    {loginState ? 
      <LoginForm loginHanlder={loginHanlder}/>
      :
      <RegisterForm loginHanlder={loginHanlder}/>
    } 
    </div>
  )
}
