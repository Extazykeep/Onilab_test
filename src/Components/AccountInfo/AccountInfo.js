import React from 'react'
import useAuth from '../../hooks/useAuth'
import './AccountInfo.css'


export default function AccountInfo() {
  const [showPass, setShowPass] = React.useState(true)
  const [userName, setUsername] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [userPrevPass, setPrevPass] = React.useState("")
  const [userNewPass, setNewPass] = React.useState("")
  const auth = useAuth()
  const user = {...auth.user}; 
  
  React.useEffect(() => {
    setUsername(user.name)
    setUserEmail(user.email)
  }, [])
  
  const applyEdit = (id,property) => {    
    auth.setUser(user)
    localStorage.setItem('user',JSON.stringify(user))
    const users = JSON.parse(localStorage.getItem('users'));
    users.forEach(element => {
      if(element.id === id){
         element[property] = user[property]
      }
    })
    localStorage.setItem('users',JSON.stringify(users))     
  }
  const userNameHanlder = (name) => {
    setUsername(name)
  }

  const userEmailHanlder = (email) => {
    setUserEmail(email)
  }

  const userPrevPassHanlder = (pass) => {
    setPrevPass(pass)
  }

  const userNewPassHanlder = (pass) => {
    setNewPass(pass)
  }

  const submitHandler  = (e) => {
    e.preventDefault()
    if(!userPrevPass && !userNewPass){
      if(user.name !== userName && !isExists(userName)){
        user.name = userName
        applyEdit(user.id,"name")
      }
      if(user.email !== userEmail && !isExists(userEmail)){
        user.email = userEmail
        applyEdit(user.id,"email")
      }
    } 
    if(userPrevPass && userNewPass) {
      if(userPrevPass === user.password){
        user.password = userNewPass
        applyEdit(user.id,"password")
        setPrevPass("")
        setNewPass("")
        alert("password succesfully changed")
      }
    }
  }
  const isExists =(info) => {
    return localStorage.getItem('users').search(info) !== -1
  }

  return (
    <div className="account-info">      
      <form onSubmit={e=>{submitHandler(e)}}>
        <h3>Personal information</h3>        
        <div class="fieldOuter">
          <input onChange={(e)=>{userNameHanlder(e.target.value)}} value={userName} type='text' />
          <label className='active' for="Name">Full name (e.g John Doe)*</label>
        </div>
        <div class="fieldOuter">
          <input onChange={(e)=>{userEmailHanlder(e.target.value)}} value={userEmail} type='text' />
          <label className='active' for="Name">Email*</label>
        </div>
        <a href='#password' onClick={()=>{setShowPass(!showPass)}}>Change password</a>
        <div className={'password-block ' + (showPass ? 'hidden':  '')}>
          <input 
            onChange={(e)=>userPrevPassHanlder(e.target.value)} 
            value={userPrevPass}
            type='password' 
            autocomplete="on" 
            placeholder="current password"
          />
          <input 
            onChange={(e)=>userNewPassHanlder(e.target.value)} 
            value={userNewPass} 
            type='password' 
            autocomplete="on" 
            placeholder="new password"
          />
        </div>
        <button>Save changes</button>
      </form>
    </div>
  )
}
