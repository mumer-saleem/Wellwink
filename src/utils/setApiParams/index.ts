



export const setSignUpParams=(signupbject:any)=>{
  return {
     "patient": {
         "can_login": true,
         "age_year": "Year",
         "dob":  signupbject.db,
         "gender":signupbject.gender,
         "mother_name": signupbject.gender,
         "name": signupbject.firstName+" "+signupbject.lastName,
         "patient_type": "online",
         "title": signupbject.title,
         "user_attributes": {
             "contact_hashid": "",
             "dob":  signupbject.db,
             "dob_stage": "3",
             "email":signupbject.email,
             "first_name":signupbject.firstName,
             "gender": signupbject.gender,
             "last_name": signupbject.lastName,
             "password":signupbject.password,
             "password_confirmation": signupbject.password,
             "profile_pic_id": 0,
             "profileable_id": 0,
             "profileable_type": "",
             "selected_calendars": [],
             "username": "",
             "contact_numbers_attributes" : [
                 {
                     "custom_loaded": true,
                     "hashid": "",
                     "type": "phone",
                     "value": signupbject.phoneNumber
                 }
            
             ]
         
         }
         }
 } 
 }