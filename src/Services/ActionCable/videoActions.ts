 import { store } from 'Redux/ReduxPresist/ReduxPersist'
 import {Colors, Routes} from 'configs';
 import {setVideoCallbject} from 'Redux/Reducers/videoCall/videoCall';

export const handleReceived = (data:any,navigation:any) => {
  
  console.log(data,"handleReceived")
  switch(data.channel_action) {
   case 'video_call_cancelled': {
     alert("video_call_cancelled")
     break;
   }
   case 'video_call': {
     let obj={
      "callerFullName": data.caller_full_name,
      "callerProfile": data.caller_profile_pic,
      "roomNme": data.room_name,
     }
    store.dispatch(setVideoCallbject(obj))
        navigation(Routes.VideoCall);
    break;
  }
  

 }
 
}

export const handleConnected=()=> {
  console.log("handleConnected")
}
 export const handleDisconnected=()=> {
  console.log("handleDisconnected")

 }