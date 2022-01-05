import { 
  PermissionsAndroid,Platform
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { store } from 'Redux/ReduxPresist/ReduxPersist'

export async function GetVideoCallPermissions() {
  // it will ask the permission for user 
  try {
    if (Platform.OS === "android") {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
      return userResponse;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
  }

  export const checkInternet = () => {


    NetInfo.addEventListener(({ isConnected, isInternetReachable, }) => {
 
        if (isInternetReachable == null) isInternetReachable = true

        if (isConnected && isInternetReachable) {
            return true
         } else {
          return false
        }
    });
}