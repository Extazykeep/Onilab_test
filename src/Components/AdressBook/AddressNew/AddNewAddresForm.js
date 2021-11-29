import React from 'react'

export default function AddNewAddresForm({formIsVisible,addNewaddress}) {
  const [userName,setUserName] = React.useState("");
  const [usernumber,setUsernumber] = React.useState("");
  const [userAddressfirst,setAddressfirst] = React.useState("");
  const [userAddressSecond,setAddressSecond] = React.useState("");
  const [userCity,setUserCity] = React.useState("");
  const [userState,setUserState] = React.useState("");
  const [userZip,setUserZip] = React.useState("");
  const [userCountry,setUserCountry] = React.useState(""); 
  const [emptyFieldError,setemptyFieldError]  = React.useState(false);
  
  const submitHandler = (e) => {
    e.preventDefault()
    if(!userName || !usernumber || !userAddressfirst || !userCity  || !userState || !userCountry){
      setemptyFieldError(true)
    }
    else {
      setemptyFieldError(false)
      const address = {
        userName,
        usernumber,
        userAddressfirst,
        userAddressSecond,
        userCity,
        userState,
        userZip,
        userCountry,
        id: new Date().getTime()
      }
      addNewaddress(address);
      formIsVisible(false);
    }
  }
  return (
    <div className="addnew">
        <h2>Add Address</h2>
        <button className="close-adressform" onClick={()=>{formIsVisible(false)}}>+</button>
        <form className="addnew-form" onSubmit={(e)=>{submitHandler(e)}}>
          <div class="fieldOuter">
            <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} type='text' />
            <label className='active' for="Name">Full name (e.g John Doe)*</label>
          </div>
          <div class="fieldOuter">
            <input onChange={(e)=>{setUsernumber(e.target.value)}} value={usernumber} type='text' />
            <label className='active' for="Name">Phone number*</label>
          </div>
          <p>Provide your complete address(includding house number)</p>
          <div class="fieldOuter">
            <input onChange={(e)=>{setAddressfirst(e.target.value)}} value={userAddressfirst} type='text' />
            <label className='active' for="Name">Address line 1*</label>
          </div>
          <div class="fieldOuter">
            <input onChange={(e)=>{setAddressSecond(e.target.value)}} value={userAddressSecond} type='text' />
            <label className='active' for="Name">Address line 2*</label>
          </div>
          <div className="fourless">
            <div class="fieldOuter">
              <input onChange={(e)=>{setUserCity(e.target.value)}} value={userCity} type='text' />
              <label className='active' for="Name">City*</label>
            </div>
            <div class="fieldOuter">
              <input onChange={(e)=>{setUserState(e.target.value)}} value={userState} type='text' />
              <label className='active' for="Name">State/province*</label>
            </div>
            <div class="fieldOuter">
              <input onChange={(e)=>{setUserZip(e.target.value)}} value={userZip} type='text' />
              <label className='active' for="Name">Zip/postal code*</label>
            </div>
            <div class="fieldOuter">
              <input onChange={(e)=>{setUserCountry(e.target.value)}} value={userCountry} type='text' />
              <label className='active' for="Name">Country*</label>
            </div>
          </div>
          {emptyFieldError && <div>Все поля должны быть заполнены</div>}
          <button className="save-addresbtn">Save 	&#38; close
          </button>
        </form>
    </div>
  )}

