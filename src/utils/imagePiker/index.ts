import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, { Component } from 'react';
import {
 PermissionsAndroid,  Platform,

} from 'react-native';



export const CameraImage = async () => {
      return launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400,
    },)

}
export const libraryImage = async () => {
 return launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
  },)

}

export const menuOptions = [
    {
      id: 0,
      name: 'Photo Gallery',
    },
    {
      id: 1,
      name: 'Camera',
    },

  ];