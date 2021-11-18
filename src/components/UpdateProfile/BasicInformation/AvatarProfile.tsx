import React, {memo, useState, useEffect} from 'react';
import { View, StyleSheet, Image,TouchableOpacity } from "react-native";
import scale from "utils/scale";
import Theme from "style/Theme";
import { Colors } from "configs";
import { ICON } from "images/Icon";
interface AvatarProfileProps {
  onPress?: () => void;
  avatarSource:string,
  open: () => void;

}

 

const AvatarProfile = memo((props: AvatarProfileProps) => {
  
   const {avatarSource,open}=props;

 

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
           source={ avatarSource == "" ? ICON.addImage : { uri: avatarSource }} 
          resizeMode="stretch"
          style={styles.img}
        />
      </View>
      <View style={styles.buttonUpload}>
         <TouchableOpacity onPress={open}>
       <Image source={avatarSource == "" ?  ICON.addIcon  :  ICON.editIcon } style={{ alignSelf: 'center',     height: scale(25), width: scale(25), borderRadius: 20 }} />
             </TouchableOpacity>
        </View>
    </View>
  );
});

export default AvatarProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(40),
    justifyContent: 'center',
     ...Theme.flexRow,
     flexDirection:"column",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center", 
    overflow: "hidden",
    width: scale(112),
    height: scale(112),
    borderRadius: scale(16),
 
   
  },
  buttonUpload: {
    height: scale(25),
    width: scale(25),
    marginLeft: scale(70),
    marginTop:scale(-30),
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
    borderRadius: scale(16),
  },
  img: {
    width: scale(112),
    height: scale(112),
    borderRadius:30,
  },
});
