

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
    "user_attributes": {
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
        "contact_numbers_attributes" : Array<any>
            // {
            //     "custom_loaded": boolean,
            //     "hashid": string,
            //     "type": string,
            //     "value": string
            // }
        // ]
    
    }
    }
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

