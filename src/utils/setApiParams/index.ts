import { object } from "yup/lib/locale"




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
             "address_attributes": {
                "city_area_attributes": {
                    "city_attributes": {
                        "custom_loaded": true,
                        "name": "",
                        "state": ""
                    },
                    "lat": "",
                    "long": "",
                    "name": ""
                },
                "line_1": "",
                "line_2": "",
                "postal_code": ""
            },
             "contact_numbers_attributes" : [
                 {
                     "custom_loaded": true,
                     "hashid": "",
                     "type": "phone",
                     "value": signupbject.phoneNumber
                 },
                 {
                    "custom_loaded": true,
                    "hashid": "",
                    "type": "fax",
                    "value": ""
                }
            
             ],
             "roles_user_attributes": [
                {
                    "role_id": 0,
                    "role_user_name": ""
                }
            ]
         
         }
         }
 } 
 }





export const setProfileUpdateParams=(obj:any)=>{
     let gender1 =  obj.gender.charAt(0).toLowerCase() + obj.gender.slice(1);
    return {   
            "patient": {
                "can_login": true,
                "gender":gender1 ,
                "id": obj.patientId,
                "mother_name": obj.motherName,
                "name":obj.firstName+" "+obj.lastName,
                "patient_preferred_method": obj.preferredMethod,
                "patient_type": "online",
                "title": obj.title,
                "dob": obj.date,
                "user_attributes": {
                    "dob":  obj.date,
                    "email":  obj.email,
                    "first_name":  obj.firstName,
                    "id": obj.patientId,
                    "gender": gender1,
                    "last_name": obj.lastName,
                    "password": "",
                    "password_confirmation": "",
                    "address_attributes": {
                        "city_area_attributes": {
                            "city_attributes": {
                                "custom_loaded": true,
                                "name": obj.city,
                                "id": obj.cityID,
                                "state": obj.state
                            },
                            "id": obj.addressId,
                            "lat": obj.lat,
                            "long":obj.lng,
                            "name": "N/A" 
                        },
                        "id":obj.addressId,
                        "line_1": obj.address,
                        "line_2": "",
                        "postal_code": obj.zipCode
                    },
                    "contact_numbers_attributes": [
                        {
                            "custom_loaded": true,
                            "type": "phone",
                            "id": obj.mobileId,
                            "value":  obj.mobile
                        },
                        {
                            "custom_loaded": true,
                            "type": "fax",
                            "id": obj.phoneId,
                            "value": obj.phone
                        }
                    ],
                    
                }
            }
        }
         
   }