import React from 'react'
import useAuth from '../../hooks/useAuth'
import './AdressBook.css'
import AdressCard from './AddressCard/AdressCard'
import AddNewAddresForm from './AddressNew/AddNewAddresForm'
import EditForm from './ReductionForm/EditForm'

export default function AdressBook() {
  const [adresses,setAdresses] = React.useState([]);
  const [showNewForm,setShowNewForm] = React.useState(false);
  const [showEditForm,setShowEditForm] = React.useState(false);
  const [currAdress,setCurrAdress] = React.useState(null);
  
  const auth = useAuth(); 
  
  React.useEffect(()=>{    
    if(auth.user.userData){
      setAdresses(auth.user.userData)  
    }   
  },[auth.user.userData])
  
  const applyChanges = (user) => {
    const localuser = JSON.parse(localStorage.getItem('user'))
    const users = JSON.parse(localStorage.getItem('users')) 
    localuser.userData = [...user.userData]
    users.forEach((element)=>{ 
      if(element.id === auth.user.id) {
        element.userData = [...user.userData]
      }
    })
    localStorage.setItem('user',JSON.stringify(localuser))
    localStorage.setItem('users',JSON.stringify(users)) 
  }

  const removeAddress = (id) => { 
    let user = auth.user
    user.userData = [...user.userData.filter(adress=> adress.id !== id)]  
    auth.setUser(user) 
    setAdresses(user.userData)
    applyChanges(user)  
  }

  const newformIsVisible = React.useCallback((bool) => {
    setShowNewForm(bool)    
   },[])

  const addNewaddress = (address) => { 
    let user = auth.user 
    user.userData = [...user.userData,address] 
    auth.setUser(user)
    applyChanges(user)
  }
  const editFormIsVisible = (bool,adress)=>{
    setCurrAdress(adress)
    setShowEditForm(bool)
  }

  const editFormHandler = (newadres) => {
    let user = auth.user;
    let newUserdata = auth.user.userData.map((adress) => {
     return adress.id === newadres.id ? adress = newadres : adress;
    })
    user.userData = [...newUserdata];
    auth.setUser(user)
    applyChanges(user)      
  }

  return (
    <div className='adresses-wrapper'>
      <h2>Additonal adress(es)</h2>
      <div className='adresses-list'>
        {adresses &&
          adresses.map((adress) => {
            return <AdressCard removeAddress={removeAddress} editFormIsVisible={editFormIsVisible} key={adress.id} adress={adress}/>
          }) 
        }
      </div>
      <button onClick={()=>{newformIsVisible(true)}} className='add-adress'>
        <span>+</span> Add New
      </button>
      {showNewForm && <AddNewAddresForm formIsVisible={newformIsVisible}  addNewaddress={addNewaddress}/>}  
      {showEditForm && <EditForm editFormIsVisible={editFormIsVisible} editFormHandler={editFormHandler} adress={currAdress}/>}    
    </div>
  )
}
