import React from 'react'
import useInput from '../../hooks/useInput'
import { useHistory } from 'react-router'
import useAuth from '../../hooks/useAuth';


export default function RegisterForm({loginHanlder}) {
  const email = useInput('',{isEmpty: true, isEmail: true} );
  const password = useInput('',{isEmpty: true, minLength: 3}); 
  const name = useInput('',{isEmpty: true, minLength: 4});
  const validorNot = !email.emailEror && !password.minlengthError && !name.minlengthError
  const [userExist,setExist] = React.useState(false) 
  const history = useHistory()
  const auth = useAuth()

  //should actually encrypt password before send it into base and decrypt after taking 
  // but dont know if its allowed in this project
  const submitHandler = (e) => {
    e.preventDefault()
    if(checkifExists(name.value,email.value)) {
      setExist(true)
    }
    else {
      let users = [];
      if(localStorage.getItem("users"))   {
        users = [...JSON.parse(localStorage.getItem('users'))] 
      }    
      let userData = {
        name: name.value, 
        email: email.value, 
        password: password.value, 
        id: new Date().getTime(),
        userData: []       
      }    
      setExist(false)
      users.push(userData);
      localStorage.setItem('users',JSON.stringify(users))
      auth.setUser(userData)
      localStorage.setItem("user",JSON.stringify(userData))         
      inputsClear()
      history.push('/dashboard')
    }
  }
  const checkifExists = (name,email) => {
    let storage = localStorage.getItem('users');
    if(storage){
      if(storage.search(name) !== -1 
      || storage.search(email) !== -1) {
        return true
      } 
    }
    return false
  }

  const inputsClear = () => {
    email.onChange('')
    name.onChange('')
    password.onChange('')
  }

  const emptyField = <div style={{color: "red"}}>Поле не может быть пустым</div>
  const wrongLength = <div style={{color: "red"}}>Некорректная длинна</div>
  return (
    <div>
      <h1> Create an account </h1>
      <div className='auth-welcome'>
        <span>Already have an account? </span>
        <a href='#log' onClick={()=>{loginHanlder(true)}}>Log in</a>
      </div>
     <form className='login-form register-form' onSubmit={(e)=>{submitHandler(e)}}>
        {userExist && <div> Такой логин или эмейл уже занят</div>}
        {(name.isDirty && name.isEmpty) && emptyField}
        {(name.isDirty && name.minlengthError) && wrongLength }
        <input 
          onChange={e=>name.onChange(e.target.value)} 
          onBlur={e=>name.onBlur(e)} 
          value={name.value} 
          name='fullname'
          type='text' 
          placeholder='Full name (e.g John Doe)'
        />
        {(email.isDirty && email.isEmpty) && emptyField}
        {(email.isDirty && email.emailEror) && <div style={{color: "red"}}>Некорректнsq эмейл</div>}
        <input 
          onChange={e=>email.onChange(e.target.value)} 
          onBlur={e=>email.onBlur(e)} 
          value={email.value} 
          name='email' 
          type='text' 
          placeholder='Email*'
        />
        {(password.isDirty && password.isEmpty) && emptyField}
        {(password.isDirty && password.minlengthError) && wrongLength}
        <input 
          onChange={e=>password.onChange(e.target.value)} 
          onBlur={e=>password.onBlur(e)} 
          value={password.value} 
          name='password' 
          type='password' 
          autocomplete="on"
          placeholder='Password'
        />
        <button disabled={!validorNot} className={!validorNot ? "notvalid" : ""} >Sign up</button>        
      </form>
    </div>
  )
}
