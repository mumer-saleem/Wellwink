import React, {Dispatch, SetStateAction, memo,useState,useEffect} from 'react';
import {View, StyleSheet, ViewStyle, TouchableOpacity,Image} from 'react-native';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import {Colors} from 'configs';
import {themes, useTheme} from 'configs/ChangeTheme';
import Theme from 'style/Theme';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {AVATAR} from 'images/Avatar';
import {ICON} from 'images/Icon';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";

interface headerProps {
    
}

const ProfileHeader = memo(
  ({
 
  }: headerProps) => {
  const profile = useAppSelector((state) =>state.profile.data?.patient)
 
  // const [info, setIsSearch] = useState(false);
  // useEffect(()=>{

  // },[LogIn.data])
  

    const {theme} = useTheme();
    return (
      <View style={[styles.infoView, {backgroundColor: theme.background}]}>
      <View style={Theme.flexRow}>
         <Image source={{uri:profile?.avatarSource}} style={styles.avatar} />
        <View>
          <Text size={15} bold marginBottom={4}>
          {profile?.name}
          </Text>
          <Text style={styles.email}>{profile?.email}</Text>
          <Text style={styles.type}>{profile?.profileableType}</Text>
        </View>
      </View>
      <Image source={ICON.arrDown} />
      {/* <ButtonIcon icon="edit" style={styles.icon} onPress={onEditButton} /> */}
    </View>
    );
  },
);

export default ProfileHeader;

const styles = StyleSheet.create({
  infoView: {
    ...Theme.flexRowSpace,
    marginHorizontal: 24,
   paddingTop: getStatusBarHeight(),

  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius:20
  },
  email: {
    fontSize: 13,
    marginBottom: 8,
  },
  type: {
    fontSize: 13,
    color: Colors.GrayBlue,
  },
});
