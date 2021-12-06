import React, {memo,useEffect} from 'react';
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
import AvatarProfile from 'components/UpdateProfile/BasicInformation/AvatarProfile';


interface MyBasicProps {
   avatarSource:string,
  openModalForImage: () => void;
  firstName:string,
  lastName:string,
  motherName:string,
  birthday:string,
  gender:string,
  openGenderPick: () => void;
  datePicker: () => void;
  errors:any;
  touched:any;
}

export default memo((props: MyBasicProps) => {
  const {avatarSource,openModalForImage,
    firstName,lastName,motherName,birthday,gender,
    openGenderPick,errors,touched,datePicker}=props
    const { handleChange, handleBlur, } = useFormikContext();
    
    useEffect(() => {
 
     console.log(firstName,"firstName")
    }, [firstName])

    

  const {theme} = useTheme();
  return (
 
       <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} style={styles.contentHeaderIcon} />
          <Text marginLeft={16} bold size={15}>
            Share Basic Information
          </Text>
        </View>
        <Line />
        <View style={styles.content}>
          {/* <Image style={styles.avatar} source={AVATAR.avatar2} /> */}
          {/* <InputItem label="Full Name" value={MY_RECORD_INFORMATION.name} /> */}
         <AvatarProfile   avatarSource={avatarSource} open={openModalForImage} />

          <Text marginTop={24} marginBottom={4}>
          First Name*
          </Text>
          <TextInput
          placeholder={"First Name"}
            value={firstName}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('firstName')}
          />
         <View style={{height:scale(24)}}>  
            {errors.firstName && touched.firstName&& <Text style={{ color:"red",   }}>{errors.firstName}</Text> }
           </View>
          <Text   marginBottom={4}>
            Last Name*
          </Text>
          <TextInput
          placeholder={"Last Name"}
            value={lastName}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('lastName')}
          />
      <View style={{height:scale(24)}}>  
            {errors.lastName && touched.lastName&& <Text style={{ color:"red",   }}>{errors.lastName}</Text> }
           </View>
        <Text  marginBottom={4}>
            Mother Name*
          </Text>
          <TextInput
          placeholder={"Mother Name"}
            value={motherName}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('motherName')}
          />
         <View style={{height:scale(24)}}>  
            {errors.motherName && touched.motherName&& <Text style={{ color:"red",}}>{errors.motherName}</Text> }
           </View>
          <Text marginBottom={4}>
            Birthday*
          </Text>

          <TouchableOpacity 
            onPress={datePicker}
            activeOpacity={0.54}
            style={{...styles.touchRow, borderColor: theme.borderColor}}>
            <Image source={ICON.calendar} />
            <Text marginLeft={14}>{birthday}</Text>
          </TouchableOpacity>
        
          <Text marginTop={24} marginBottom={4}>
            Biological Sex*
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={[styles.touchSpace, {borderColor: theme.borderColor}]}
            onPress={ openGenderPick}>
            <Text>{gender}</Text>
            <Image source={ICON.arrowDown} />
          </TouchableOpacity>
        
        </View>
      </Layout>
   
 
  );
});
const styles = StyleSheet.create({
 
  contentView: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: 16,
    
  },
  content: {
    paddingHorizontal: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 56,
  },
  touchRow: {
    ...Theme.flexRow,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    height: 48,
  },
  touchSpace: {
    ...Theme.flexRowSpace,
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    padding: 12,
    width: scale(112),
  },
 
  touchLanguage: {
    ...Theme.flexRow,
    borderRadius: 12,

    padding: 12,
    paddingRight: 40,
    flexWrap: 'wrap',
  },
  language: {
    ...Theme.flexRowCenter,
    backgroundColor: Colors.DodgerBlue,
    margin: 4,
    borderRadius: 4,
    padding: 8,
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


   {/* <Text marginTop={24} marginBottom={4}>
            Language
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={{...styles.touchLanguage, borderColor: theme.borderColor}}>
            <View style={{height: 24}} />
            {MY_RECORD_INFORMATION.language.map((item, index) => {
              const [show, setShow] = useState<boolean>(true);
              const {language} = item;
              return (
                <View key={index}>
                  {show ? (
                    <TouchableOpacity
                      style={styles.language}
                      onPress={() => {
                        setShow(false);
                      }}>
                      <Text
                        white
                        color={Colors.White}
                        size={11}
                        marginRight={4}>
                        {language}
                      </Text>
                      <Image
                        style={{width: 12, height: 12}}
                        source={ICON.close}
                      />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
              );
            })}
          </TouchableOpacity> */}