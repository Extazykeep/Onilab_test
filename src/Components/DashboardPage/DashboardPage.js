import React from 'react'
import useAuth from '../../hooks/useAuth'
import {Link} from 'react-router-dom'
import AccountInfo from '../AccountInfo/AccountInfo'
import AdressBook from '../AdressBook/AdressBook'
import { useHistory } from 'react-router'
import './Dashboard.css'
import image from '../../images/logout.png'

export default function DashboardPage() {
  const [userName,setUserName] = React.useState("")
  const [userMail,setUserMail] = React.useState("")
  const [current,setActive] = React.useState("acc")
  const auth = useAuth()
  const user = auth.user
  const history = useHistory();

  React.useEffect(() => {
    setUserName(user.name)
    setUserMail(user.email)
  }, [user])

  const logoutHanlder = () => {
    auth.logOut()
    localStorage.removeItem("user")
    history.push("/auth");
  } 
  return (
    <div>
       <div className="dashboard-welcome">
         <span>
           Hi, {userName}
         </span>
         <p>{userMail}</p>
       </div>
       <div className="toflex">
        <div className="dashboard-sidebar">
          <h3>Account</h3>
          <div >
            <div className="navigation">
              <Link 
                to="/dashboard/account" 
                className={current === "acc" ? "current" : ""} 
                onClick={()=>setActive("acc")}
              >
                Account information</Link>
              <Link 
                to="/dashboard/addres" 
                className={current === "add" ? "current" : ""} 
                onClick={()=>setActive("add")}
              >
                Address Book</Link>             
            </div>
            <a className="logout-link" onClick = {()=>{ logoutHanlder() }} href="#log">
              <img  src={image} alt="logout"/>
              <span>Log out</span>
            </a>
          </div>
        </div>
        <div className="current-block">
          {
            current === "acc" ?
            <AccountInfo /> 
            :
            <AdressBook />
          }
        </div>
       </div>
    </div>
  )
}
