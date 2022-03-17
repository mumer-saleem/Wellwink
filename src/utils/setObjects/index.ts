import { object } from "yup/lib/locale"
import Moment from 'moment';




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
                "id": obj.userId,
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
                    "id": obj.userId,
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
                            "id": obj.cityAreaID,
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


   export const setProfileObject=(Data:any)=>{

  const profileInfo=Data;
  const UserInfo=profileInfo.user;
    const {first_name,last_name,dob,gender,profile_pic,address,contact_numbers,email, profileable_id,id,profileable_type,updated_at}=UserInfo;
    const { patient_preferred_method,mother_name}=profileInfo;
  let gender1 =  gender.charAt(0).toUpperCase() + gender.slice(1);
    return {   
           "patient": {
            avatarSource:profile_pic,
            dob:Moment(dob).format('YYYY-MM-DD'),
            gender:gender1,
            firstName:first_name,
            lastName:last_name,
            motherName:mother_name,
            email:email ,
            mobile:contact_numbers[0].value,
            phone:contact_numbers[1].value,
            address:address.line_1,
            state:address.city_area.city.state,
            city:address.city_area.city.name,
            zipCode:address.postal_code,
            lat:address.city_area.city.lat,
            lng:address.city_area.city.long,
            preferredMethod:patient_preferred_method,
            mobileId:contact_numbers[0].id,
            phoneId:contact_numbers[1].id,
            addressId:address.id,
            cityID:address.city_area.city.id,
            cityAreaID:address.city_area.id,
            profileAbleID:profileable_id,
            userId:id,
            title:profileInfo.title,
            name:profileInfo.name,
            profileableType:profileable_type,
            updatedAt:updated_at,

        }
             
       }
  }
 

export   const setVitalsValueParams=async(mainOBject:any)=>{
    const {vitalsList,profileAbleID,date,userId }=mainOBject
    let vital_entries_attributes:any[]=[];
    vital_entries_attributes=await getVital_entries_attributes(vitalsList,mainOBject,vital_entries_attributes)
    return {
        "patient_vital": {
            "creator_id": userId,
            "patient_id": profileAbleID,
            "reading_date": date,
            "vital_entries_attributes": vital_entries_attributes
        }
    }

       
  }

  const getVital_entries_attributes=async(vitalsList:any,mainOBject:any,entries_attributes:any[])=>{
 
     for(let i=0;i<=vitalsList.length-1;i++){
        entries_attributes.push({
                "value":await getVitalValue(mainOBject,vitalsList[i].short),
                "vital_id": vitalsList[i].id,
                "_destroy": false,
                "vital": vitalsList[i]

        })
    }

    return entries_attributes;

 }

 const getVitalValue=async(obj:any,type:any)=>{
    const {SPo2,PR,highblood,lowblood,temprature,glucometerValue}=obj;

    switch(type) {
        case "spo2":
          return SPo2;
        case "pulse":
            return PR;
       case "sbp":
            return highblood;
        case "dbp":
            return lowblood ; 
        case "temp":
            return temprature;
        case "rbg":
            return glucometerValue;
        default:
            return null; 
      }

 }
 
export   const setContactParams=async(mainOBject:any,id:any)=>{
 
    const {firstName,phone,relationID, }=mainOBject
      return  {
        "contact": {
            "contact_type": "emergency",
            "name": firstName,
            "relationship_id": relationID,
            "source_id": id,
            "source_type": "Patient",
            "contact_number_attributes": {
                "custom_loaded": true,
                "hashid": "",
                "type": "phone",
                "value": phone
            }
            }
    }

       
  }