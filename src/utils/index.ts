import { 
  PermissionsAndroid,Platform,ToastAndroid,Alert,Linking
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { store } from 'Redux/ReduxPresist/ReduxPersist'
import Geolocation from '@react-native-community/geolocation'


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
 const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
      Linking.openSettings().catch(() => {
          Alert.alert('Unable to open settings');
      });
  };
const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
  }

  if (status === 'denied') {
      Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
      Alert.alert(
          `Turn on Location Services to allow Sales Door to determine your location.`,
          '',
          [
              { text: 'Go to Settings', onPress: openSetting },
              { text: "Don't Use Location", onPress: () => { } },
          ],
      );
  }

  return false;
};

export const hasLocationPermission = async () => {
  GeolocationPermission()
  if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
  }

  const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
      return true;
  }
 
  const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
   if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
  }
 
  if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
          'Location permission denied by you.',
          ToastAndroid.LONG,
      );
 

  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
      );
  }

  return false;
};

 const GeolocationPermission =()=>{

  
  Geolocation.getCurrentPosition(
    (position) => {
 
    },
    (error) => {
      if(error.code)  {
        
      }
        },
    {
      enableHighAccuracy: true,
      timeout: 5000
    }
  );

 
  }