import React from 'react'
import './LoginForm.css'
import useInput from '../../hooks/useInput'
import { useHistory } from 'react-router'
import useAuth from '../../hooks/useAuth'


export default function LoginForm({loginHanlder}) {
  const email = useInput('', {isEmpty: true, isEmail: true} )
  const password = useInput('',{isEmpty: true,minLength: 3})   
  const validorNot = !email.emailEror && !password.minlengthError
  const [notFound,setNotFound] = React.useState(false)
  const history = useHistory()
  const auth = useAuth()

  const submitHandler = (e) => {
    e.preventDefault()
    const storage = localStorage.getItem('users');
    if(storage){
      const users = JSON.parse(storage);
      users.forEach((user)=> {
        if(user.email === email.value && user.password === password.value){
          let userAuth = {...user};
          auth.setUser(userAuth) 
          localStorage.setItem("user",JSON.stringify(userAuth))      
          history.push('/dashboard')
        }
        else {setNotFound(true)}
      })
    }
    else {setNotFound(true)}
  }
  const emptyField = <div style={{color: "red"}}>Поле не может быть пустым</div>
  return (
    <div>
      <h1> Welcome Back</h1> 
      <div className='auth-welcome'>
        <span>Don't have an account? </span>
        <a href='#reg' onClick={()=>{loginHanlder(false)}}>Sign Up</a>
      </div>
      <form className="login-form" onSubmit={(e)=>{submitHandler(e)}}>
        {notFound && <div>Пользователь не найден</div>}
        {(email.isDirty && email.isEmpty) && emptyField}
        {(email.isDirty && email.emailEror) && <div style={{color: "red"}}>Некорректный эмейл</div>}
        <input 
          onBlur={e => email.onBlur(e)} 
          value={email.value} 
          name='email' 
          type='text' 
          placeholder='Email*'
          onChange={e => email.onChange(e.target.value)}
        />

        {(password.isDirty && password.isEmpty) && emptyField}
        {(password.isDirty && password.minlengthError) && <div style={{color: "red"}}>Некорректная длинна</div>}

        <input 
          onBlur={e => password.onBlur(e)} 
          value={password.value} 
          name='password' 
          type='password' 
          placeholder='Password'
          autocomplete="on"
          onChange={e => password.onChange(e.target.value)}
        /> 

        <button disabled={!validorNot} className={!validorNot ? "notvalid" : "" } type='submit'>Log In</button>        
      </form>
    </div>
  )
}
