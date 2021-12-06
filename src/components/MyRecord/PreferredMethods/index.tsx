import React, {memo, Dispatch,useState, SetStateAction,useEffect} from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {Colors} from 'configs';
import {ICON} from 'images/Icon';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme'
import Container from 'elements/Layout/Container';
import Line from 'elements/Layout/Line';
import TextInput from 'elements/TextInput';
import scale from 'utils/scale';
import {AVATAR} from 'images/Avatar';
import { useField, useFormikContext, ErrorMessage } from "formik";
 import {width} from 'configs/Const';
 import AccountItem from 'components/AccountItem';


interface PreferredMethods {
  emailValue:boolean,
  smsValue:boolean,
  bothValue:boolean,
  setState: Dispatch<SetStateAction<any>>;
}

export default memo((props: PreferredMethods) => {
  const {emailValue,smsValue,bothValue, setState}=props
  
 
  const {theme} = useTheme();
  return (
        <Layout style={styles.contentView}> 
        <View style={styles.contentHeader}>
          {/* <Image source={ICON.guideName} style={styles.contentHeaderIcon} /> */}
          <Text   bold size={15}>
          Preferred method of communication
          </Text>
        </View>
        <View style={styles.content}>
        <AccountItem
          switchValue={emailValue}
          onValueChange={()=>{
            setState( ( prevState:any) => ({
              ...prevState,
              emailSwitch:true,
              smsSwitch:false,
              bothSwitch:false,
              preferredMethod:"email",
          }))
        
        }}
          isToggle={true}
          style={styles.middleView}
          icon={ICON.message}
          name="Email"
        />
         <AccountItem
           switchValue={smsValue}
           onValueChange={()=>{
            setState( ( prevState:any) => ({
              ...prevState,
              emailSwitch:false,
              smsSwitch:true,
              bothSwitch:false,
              preferredMethod:"sms",
          }))
        
        }}
          isToggle={true}
          style={styles.middleView}
          icon={ICON.phone}
          name="Sms"
        />
        <AccountItem
          switchValue={bothValue}
          onValueChange={()=>{
            setState( ( prevState:any) => ({
              ...prevState,
              emailSwitch:false,
              smsSwitch:false,
              bothSwitch:true,
              preferredMethod:"sms_email",
          }))
        
        }}
          isToggle={true}
          style={styles.middleView}
          icon={ICON.clinicVital}
          name="Both"
        />
        </View>
      </Layout>
  
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  contentView: {
    borderRadius: 16,  
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 5,
  },
  middleView: {
    ...Theme.flexRowSpace,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  contentHeaderIcon: {
    tintColor: Colors.TiffanyBlue,
    backgroundColor: Colors.TiffanyBlueOpacity,
    borderRadius: 4,
  },
  contentHeader: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});