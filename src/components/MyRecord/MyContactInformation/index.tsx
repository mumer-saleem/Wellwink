import React, {memo} from 'react';
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


interface MyContactProps {
 
  email:string,
  phone:string,
  mobile:string,
  address:string,
  city:string,
  state:string,
  zipCode:string,
  numbercode:string,
  errors:any;
  touched:any;
}

export default memo((props: MyContactProps) => {

  const {  email, phone,mobile,address,numbercode,errors,touched}=props
    const { handleChange, handleBlur, } = useFormikContext();

  const {theme} = useTheme();
  return (
        <Layout style={styles.contentView}> 
        
        <View style={styles.contentHeader}>
          <Image source={ICON.guideName} style={styles.contentHeaderIcon} />
          <Text marginLeft={16} bold size={15}>
            Contact Information
          </Text>
        </View>
        <View style={styles.content}>
          <Text marginTop={24} marginBottom={4}>
            Email
          </Text>
          <TextInput
            placeholder={"Email"}
            value={email}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('email')}
          />
          <Text marginTop={24} marginBottom={4}>
         Phone Number
          </Text>
          <View style={Theme.flexRow}>
            <TouchableOpacity
              activeOpacity={0.54}
              style={[styles.touchSpace, {borderColor: theme.borderColor}]}
              // onPress={openContactPhoneModal}
              >
              <Text>{numbercode}</Text>
              {/* <Image source={ICON.arrowDown} /> */}
            </TouchableOpacity>
            <TextInput
             placeholder={"Phone Number"}
              style={styles.phoneTextInput}
              value={phone}
              borderColor={Colors.WhiteSmoke}
              editable
              onChangeText={handleChange('phone')
            }
            />
          </View>
          <Text marginTop={24} marginBottom={4}>
            Mobile Number
          </Text>
          <View style={Theme.flexRow}>
            <TouchableOpacity
              activeOpacity={0.54}
              style={[styles.touchSpace, {borderColor: theme.borderColor}]}
              // onPress={openContactPhoneModal}
              >
              <Text>{numbercode}</Text>
              {/* <Image source={ICON.arrowDown} /> */}
            </TouchableOpacity>
            <TextInput
             placeholder={"Mobile Number"}
              style={styles.phoneTextInput}
              value={mobile}
              borderColor={Colors.WhiteSmoke}
              editable
              onChangeText={handleChange('mobile')}
                          />
          </View>
          <Text marginTop={24} marginBottom={4}>
            Adress
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={{...styles.touchRow, borderColor: theme.borderColor}}>
            <Image source={ICON.pinMap} />
            <Text marginLeft={12} size={15}>
              150 Greene St, NY 10012, NY
            </Text>
          </TouchableOpacity>
          <Text marginTop={24} marginBottom={4}>
            City
          </Text>
          <TextInput
            placeholder={"City"}
            value={email}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('email')}
          />
           <Text marginTop={24} marginBottom={4}>
            Zip Code
          </Text>
          <TextInput
            placeholder={"Zip Code"}
            style={{width:"50%"}}
            value={email}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('email')}
          />
           <Text marginTop={24} marginBottom={4}>
            State
          </Text>
          <TextInput
            placeholder={"State"}
            value={email}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={handleChange('email')}
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
    width:50,
  },
  phoneTextInput: {
    width: width - 150,
    marginLeft: 8,
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