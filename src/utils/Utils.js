// params: event(user action), field(existing data of user), returns user's name 
export const handleNameChange = ({e,field}) => {
    e.target.value = e.target.value.trimStart().replace(/\s+/g, ' ');
    if (!/^[a-zA-Z ]*$/.test(e.target.value)) return;
    field.onChange(e);
  }


// params: event(user action), field(existing data of user), returns user's email
export const handleEmailChange = ({e,field}) => {
  if (e.target.value) {  
    e.target.value = e.target.value.replace(/\s/g, ""); 
  }
    field.onChange(e);
};


// params: event(user action), field(existing data of user), return user phone number
export const handlePhoneChange = ({ e, field }) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    field.onChange(e);
  };


// params: event(user action), field(existing data of user), return user's location
export const handleLocationChange = ({ e, field }) => {
    e.target.value = e.target.value.trimStart().replace(/\s+/g, ' ');
    
    if (!/^[a-zA-Z ]*$/.test(e.target.value)) return;
  
    field.onChange(e);
};

// params: event(user action), field(existing data of user), return description of user
export const handleAboutChange = ({ e, field }) => {
  e.target.value = e.target.value.trimStart().replace(/\s+/g, ' ');
  field.onChange(e);
};


// params: event(user action), field(existing data of user), returns user's password
export const handlePasswordChange = ({e,field}) => { 
  if (e.target.value) {  
    e.target.value = e.target.value.replace(/\s/g, ""); 
  }

  field.onChange(e);
}