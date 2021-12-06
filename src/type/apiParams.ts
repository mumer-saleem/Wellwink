

export interface signUp {
  "patient": {
    "can_login": boolean,
    "age_year":string,
    "dob":  string,
    "gender":string,
    "mother_name": string,
    "name": string,
    "patient_type": string,
    "title": string,
    "user_attributes": user_attributes
    }
}

export interface user_attributes {
  "contact_hashid": string,
  "dob":  string,
  "dob_stage": string,
  "email":string,
  "first_name":string,
  "gender": string,
  "last_name":string,
  "password":string,
  "password_confirmation":string,
  "profile_pic_id": number,
  "profileable_id": number,
  "profileable_type": string,
  "selected_calendars": Array<any>,
  "username": string,
  "contact_numbers_attributes" : Array<any>,
  "roles_user_attributes": Array<any>,
  "address_attributes":object
}

export interface updateProfile {
  "patient": {
    "can_login": boolean,
    "gender":string,
    "id": string,
    "mother_name":string,
    "name":string,
    "patient_preferred_method":string,
    "patient_type":string,
    "title":string,
    "dob": string,
    "user_attributes": userUpdate
    }
}
export interface userUpdate {
  "dob": string,
  "email": string,
  "first_name": string,
  "id":string,
  "gender": string,
  "last_name": string,
  "password":string,
  "password_confirmation":string,
  "contact_numbers_attributes" : Array<any>,
   "address_attributes":object
}

export interface SignIn {
  email:string,password:string
}
export interface sendOtp {
  id:string,type:string
 }
export interface verifyOtp {
  id:string,otp:string
}
export interface forgetPassword {
 email:string,redirect_url:string 
}

