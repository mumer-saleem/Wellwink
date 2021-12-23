 import { store, } from 'Redux/ReduxPresist/ReduxPersist'
 import {Colors, Routes} from 'configs';



export const handleReceived = (data:any,navigation:any) => {
 console.log(store.getState,"store.getStatestore.getStatestore.getState")  
 
  console.log(data,"handleReceived")
  switch(data.channel_action) {
   case 'video_call_cancelled': {
     alert("video_call_cancelled")
   }
  

 }
 if(data.sub_type=="call_started"){
  navigation(Routes.VideoCall);
  }
}

export const handleConnected=()=> {
  console.log("handleConnected")
}
 export const handleDisconnected=()=> {
  console.log("handleDisconnected")

 }