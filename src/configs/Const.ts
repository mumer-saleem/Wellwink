import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Dimensions } from "react-native";

const Constants = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  FONTS_APP: "Mulish",
  Welcometext:"Welcome to WellWink!",

};
export default Constants;

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const HEADER_HEIGHT = 108 - getStatusBarHeight();

export enum ConsultsType {
  LiveChat = "LiveChat",
  Message = "Message",
  VoiceCall = "VoiceCall",
  Appointment = "Appointment",
  VideoCall = "VideoCall",
}

export enum ConsultsStatus {
  stillInProgress = 1,
  accepted = 2,
  unConFirmed = 3,
  completed = 4,
  canceled = 5,
}

// baseURL: "http://192.168.4.169:3000/",
//  hjasasn 
// baseURL: "http://192.168.5.127:3000/",
// own
export const apiConstants={
  baseURL:"http://192.168.4.164:3000/",
  headers : {
    'X-Custom-Header': 'foobar'
  },
  videChannelName:"UserChannel",
  videoURl:"ws://192.168.5.127:3000/cable",
  chatChannelName:"",
  chatURl:"",
  PRESENCE_INTERVAL:60000,
  timeout:3000,
  
}
 