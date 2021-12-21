export const handleReceived = (data) => {
  console.log(data,"handleReceived")
  switch(data.channel_action) {
   case 'video_call_cancelled': {
     alert("video_call_cancelled")
   }
  

 }
 if(data.sub_type=="call_started"){
  alert("video calling")

 }
}

export const handleConnected=()=> {
  console.log("handleConnected")
}
 export const handleDisconnected=()=> {
  console.log("handleDisconnected")

 }