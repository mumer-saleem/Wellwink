import { 
  PermissionsAndroid,Platform
} from 'react-native';

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
