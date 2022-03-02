import {Colors, Routes} from 'configs';
import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {ICON} from 'images/Icon';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import scale from 'utils/scale';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'configs/ChangeTheme';

import Layout from 'elements/Layout/Layout';
import { date } from 'yup/lib/locale';
interface EnrolProgramItemProps {
  style?: any;
  item:any;
  CallRequest?: any;
 

}

export default memo(
  ({
    style,
    item,
    CallRequest,
 
  }: EnrolProgramItemProps) => {
    const {navigate} = useNavigation();
 
    const {theme} = useTheme();
    return (
      <View
        style={[
          styles.container,
          style,
          {backgroundColor: theme.backgroundItem},
        ]} >
          <View style={Theme.flexRowSpace}>
          <Text bold   color={Colors.DodgerBlue}>
          {item.name}
        </Text>
        <View style={styles.verified}>
              <Image style={styles.iconVerified} source={ICON.verified} />
              <Text  white size={10} marginLeft={2} lineHeight={15}  bold uppercase color={Colors.White}> {item.status}</Text>
            </View>
          </View>
      
        <Text size={13} lineHeight={16} marginVertical={8}>
        {item.practice_name}
        </Text>

        <Text   size={13} lineHeight={16}   >
            {item.ccm==true&&"CCM "}
            {item.pcm==true&&"PCM "}
            {item.rpm==true&&"RPM "}
          </Text>
          
    
          {/* <Image source={ICON.rateFull} /> */}
         
          <Text semiBold size={13}  color={Colors.GrayBlue} marginVertical={8}>
          {item.care_team.map((item:any)=>item+", ")}
          </Text>
   
       
          <Text  marginBottom={12} size={13} lineHeight={16}  >
            {item?.created_at}
          </Text>
        <View style={Theme.flexRowCenter}>
     
            <ButtonIcon
              backgroundColor={Colors.BlueCrayola}
              icon={'message'}
              marginRight={16}
              disabled={true}
              
            />
     
        
            <ButtonIcon
              marginRight={16}
              backgroundColor={Colors.TiffanyBlue}
              icon={'phone'}
              onPress={()=>CallRequest(item.id,"phone")} 
            />
     
         <ButtonIcon marginRight={16} icon={'video'}
         onPress={()=>CallRequest(item.id,"video")} />
        </View>

     
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    padding:20
    // paddingLeft: 112,
    // paddingRight: 24,
    // paddingBottom: 24,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 24,
    alignSelf: 'center',
  },
  myNetwork: {
    backgroundColor: Colors.Orange,
    marginTop: 8,
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    ...Theme.center,
    ...Theme.flexRow,
  },
  statusView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    position: 'absolute',
    right: 0,
    ...Theme.center,
  },
  avatarView: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.Malachite,
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  verified: {
    ...Theme.flexRow,
    marginTop: 8,
    borderRadius: 2,
    backgroundColor: Colors.ForestGreen,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  iconVerified: {
    width: 10,
    height: 10,
  },
  care: {
    ...Theme.center,
    marginTop: scale(5),
  },
  iconCare: {
    width: 16,
    height: 16,
  },
});
