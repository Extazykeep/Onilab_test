/* eslint-disable default-case */
import React from "react"

const useValidation = (value,validations) => {
  const [isEmpty, setEmpty] = React.useState(true)
  const [emailEror, setemailEror] = React.useState(false)
  const [minlengthError, setMinLengthError] = React.useState(false)
  React.useEffect(() => {
    for( const validation in validations) {
        switch(validation){
            case 'minLength':
              value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
              break;
            case 'isEmpty':
              value ? setEmpty(false) : setEmpty(true)
              break; 
            case 'isEmail':
              const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              reg.test(value) ? setemailEror(false) : setemailEror(true)
              break
        }
    }
  }, [value])
  return {
    isEmpty,minlengthError,emailEror
  }
}

const useInput = (initialValue,validations) => {
  const [value,setValue] = React.useState(initialValue)
  const [isDirty,setDirty] = React.useState(false)
  const valid = useValidation(value,validations)
  
  const onChange = (value) => {    
    setValue(value)
  }
  const onBlur = (e) => {
    setDirty(true)
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
} 
export default useInput
