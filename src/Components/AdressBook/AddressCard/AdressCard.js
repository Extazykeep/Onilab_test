import React from 'react'
import imageDelete from '../../../images/delete.png'
import imageEdit from '../../../images/pencil.png'

export default function AdressCard({adress,removeAddress,editFormIsVisible}) {
  const {userName,usernumber,userAddressfirst,userCity,userCountry,id} = adress;
  return (
    <div className="adress-card">
        <div className="additional">
          <h4>additional</h4>
          <div>
            <img onClick={()=>{editFormIsVisible(true,adress)}} className="edit-icon" src={imageEdit} alt="pencil"/>
            <img onClick={()=>{removeAddress(id)}} className="delete-icon" src={imageDelete} alt="trash"/>    
          </div> 
        </div>
        <div className="addresinfo">
          <h3 className="addresinfo-name">{userName}</h3>
          <p className="addresinfo-addresline">{userAddressfirst}</p>
          <p className="addres-info__city">{userCity}</p>
          <p className="addres-info__county">{userCountry}</p>
          <p className="addresinfo-phone">{usernumber}</p>
        </div>
    </div>   
  )
}
