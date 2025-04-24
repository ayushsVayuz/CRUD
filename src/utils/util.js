// params: event(user action), field(existing data of user), returns user's name 
export const handleNameChange = ({e,field}) => {

    if (!isNaN(e.target.value.trim())) e.target.value = ""

    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      e.target.value = e.target.value.trimStart();
      e.target.value = e.target.value.replace(/\s+/g, ' ');

      field.onChange(e);
    }
  }


// params: event(user action), field(existing data of user), returns user's email
export const handleEmailChange = ({e,field}) => {
    
    e.target.value = e.target.value.trim();

    if (/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(e.target.value)) {
      field.onChange(e);
    } else if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(e.target.value) && e.target.value !== " ") {
      field.onChange()
    }
}


// params: event(user action), field(existing data of user), return user phone number
export const handlePhoneChange = ({e,field}) => {

  e.target.value = e.target.value.trim();

    if (/^[0-9]*$/.test(e.target.value)) {
      e.target.value = e.target.value.trimStart();
      e.target.value = e.target.value.replace(/\s+/g, ' ');
      field.onChange(e);
    }
}


// params: event(user action), field(existing data of user), return user's location
export const handleLocationChange = ({e,field}) => {

    if (!isNaN(e.target.value.trim())) e.target.value = ""

    if (/^[a-zA-Z ]*$/.test(e.target.value)) {
      e.target.value = e.target.value.trimStart();
      e.target.value = e.target.value.replace(/\s+/g, ' ');
      field.onChange(e);
    }
}


// params: event(user action), field(existing data of user), return description of user
export const handleAboutChange = ({e,field}) => {

  if (!isNaN(e.target.value.trim())) e.target.value = ""

  if (/^[a-zA-Z0-9,#.+/' ]*$/.test(e.target.value)) {
    e.target.value = e.target.value.trimStart();
    e.target.value = e.target.value.replace(/\s+/g, ' ');
    field.onChange(e);
  }
}

// params: event(user action), field(existing data of user), returns user's password
export const handlePasswordChange = ({e,field}) => {
  
  e.target.value = e.target.value.trim();
  field.onChange(e);

}
