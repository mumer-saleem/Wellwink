import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import {ICON} from 'images/Icon';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import {AVATAR} from 'images/Avatar';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {width} from 'configs/Const';
import ModalChangePhoneCode from 'components/SignUp/ModalChangePhoneCode';
import ModalSlideBottom from 'components/ModalSlideBottom';
 import Calendar from 'components/Schedule/Calendar';
import useModalAnimation from 'hooks/useModalAnimation';
import {GENDER, phonesAreaCodes, RELATIONSHIP} from 'configs/Data';
import {TcodeArea} from 'type/codeArea';
import ModalSelect from 'components/ModalSelect';
import {categoryList} from 'type/category';
import ModalChangeRelationship from 'components/ModalChangeRelationship';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import MyBasicInformation from 'components/MyRecord/MyBasicInformation';
import MyContactInformation from 'components/MyRecord/MyContactInformation';

import {useTheme} from 'configs/ChangeTheme';
import Layout from 'elements/Layout/Layout';
import Line from 'elements/Layout/Line';
import scale from 'utils/scale';
import {CameraImage ,libraryImage} from 'utils/imagePiker';
import {ModalManueOptions} from 'configs/Data'
import Container from 'elements/Layout/Container';
import { Formik , useFormikContext, } from "formik";
import * as Yup from "yup";
import {EmailValidation,StrongPassword,PhoneValidation,StringValidation} from 'utils/validation';


const MY_RECORD_INFORMATION = {
  name: 'Devin Shelton',
  avatar: '',
  gender: 'Male',
  birthday: '06/07/1990',
  language: [
    {
      id: 0,
      language: 'English',
    },
    {
      id: 1,
      language: 'Spanish',
    },
    {
      id: 2,
      language: 'Spanish',
    },
    {
      id: 3,
      language: 'Spanish',
    },
    {
      id: 4,
      language: 'Spanish',
    },
  ],
  contactEmail: 'lehieuds@gmail.com',
  contacPhoneCode: phonesAreaCodes[0],
  contactPhone: '968-926-0227',
  contactAdress: '150 Greene St, NY 10012, NY',
  emergencyContactName: 'Jane Foster',
  emergencyContactPhoneCode: phonesAreaCodes[0],
  emergencyContactPhone: '968-926-0227',
  relationship: RELATIONSHIP[0],
};

export default memo(() => {
  const validationSchema =  Yup.object().shape({
    firstName:StringValidation,
    lastName:StringValidation,
    motherName:StringValidation,
    email: EmailValidation, 
     phone:PhoneValidation,
     mobile:PhoneValidation,
   });
  const {setOptions} = useNavigation();
  const [gender, setGender] = useState<any>(MY_RECORD_INFORMATION.gender);
  const [menuOptions, setMenuOptions] = useState({});
  const [state, setState] = useState({
    avatarSource:"http://192.168.5.84:3000/ilaaj.png",
    avatarSourcError:"",
    date:'Select Date',
    dateError:"",
    address:"",
    state:"",
    city:"",
    zipCode:"",
  });


  const [relationship, setRelationship] = useState(
    MY_RECORD_INFORMATION.relationship,
  );
  const [contactCodeArea, setContactCodeArea] = useState(
    MY_RECORD_INFORMATION.contacPhoneCode,
  );
  const [emergencyCodeArea, setEmergencyCodeArea] = useState(
    MY_RECORD_INFORMATION.emergencyContactPhoneCode,
  );

  const {
    visible: contactPhoneModal,
    open: openContactPhoneModal,
    close: closeContactPhoneModal,
    transY: transYContact,
  } = useModalAnimation();

  const {
    visible: emergencyPhoneModal,
    open: openEmergencyPhoneModal,
    close: closeEmergencyPhoneModal,
    transY: transYEmergency,
  } = useModalAnimation();

  const {
    visible: genderPick,
    open: openGenderPick,
    close: closeGenderPick,
  } = useModalAnimation();

  const {visible:imageModalVisible, open:openImageModal, close:closeImageModal} = useModalAnimation();

  const {
    visible: relationPick,
    open: openRelationPick,
    close: closeRelationPick,
    transY: transYRelation,
  } = useModalAnimation();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {height: 0},
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);
  const {  visible:dateVisisblity,  open: dateOpen,  close: dateClose,  transY: dateTransY, } = useModalAnimation();

  const [name, setName] = useState<any>(MY_RECORD_INFORMATION.name);
  const [contactEmail, setContactEmail] = useState<any>(
    MY_RECORD_INFORMATION.contactEmail,
  );
  const [contactPhone, setContactPhone] = useState<any>(
    MY_RECORD_INFORMATION.contactPhone,
  );
  const [emergencyContactName, setEmergencyContactName] = useState<any>(
    MY_RECORD_INFORMATION.emergencyContactName,
  );
  const [emergencyContactPhone, setEmergencyContactPhone] = useState<any>(
    MY_RECORD_INFORMATION.emergencyContactPhone,
  );

  const onChangeContactCode = useCallback((item: TcodeArea) => {
    setContactCodeArea(item);
    closeContactPhoneModal();
  }, []);
  const onChangeEmergencyCode = useCallback((item: TcodeArea) => {
    setEmergencyCodeArea(item);
    closeEmergencyPhoneModal();
  }, []);
  const onChangeGender = useCallback(item => {
    setGender(item.name);
    closeGenderPick();
  }, []);
  const selectImageResource = useCallback(item => {
    setGender(item.name);
    closeGenderPick();
  }, []);

 
  const onChangeRelationship = useCallback((item: categoryList) => {
    setRelationship(item);
    closeRelationPick();
  }, []);

  const onChangeEmail = useCallback(value => {
    setContactEmail(value);
  }, []);
  const onChangePhone = useCallback(value => {
    setContactPhone(value);
  }, []);
  const onChangeEmergencyContactName = useCallback(value => {
    setEmergencyContactName(value);
  }, []);
  const onChangeEmergencyContactPhone = useCallback(value => {
    setEmergencyContactPhone(value);
  }, []);
    const onUploadAvatar = useCallback(async() => {
    let response =  await CameraImage()
   }, []);
    
   
   const selectImage = useCallback(async(result) => {
    switch (result?.id) {
      case 0:
     let result= await libraryImage()
        uploadImage(result?.assets)
        closeImageModal()
        break;
     case 1:
      let result1= await CameraImage()
      uploadImage(result1?.assets)
      closeImageModal()
          break;
      default:
        break;
    } 
 
  }, []);
   
  const uploadImage = useCallback(async(result) => {
         if(result[0]){
           setState(  prevState => ({
          ...prevState,
          avatarSource:result[0].uri,
          avatarSourcError:""

      }))
         }
    }  , [state]);
   
    const onPickDatePress = useCallback(day => {
      setState(  prevState => ({
      ...prevState,
      date:day.dateString,
      dateError:""
  }))
  
  dateClose();
  }, [state]);
    
    const openModalForImage=useCallback(() => { 
      setMenuOptions(ModalManueOptions.ImagePickerOptions)
      openImageModal()
    }  , []);

  const {theme} = useTheme();
  return (
 
       <Formik
    initialValues={{   
      firstName:"",
      lastName:"",
      motherName:"",
      email: "",
      password:"",
       phone:"",
       mobile:"" }}
      validationSchema={validationSchema}

    onSubmit={async (values) => {
   
     }}
  >
    {({errors, handleChange, handleBlur, handleSubmit, values,touched,}) => 
      
      (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background}]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: getBottomSpace() + 40}}>
      <Text marginTop={24} bold size={24}>
        Basic Informations
      </Text>
      <Text size={11} marginTop={8} marginBottom={40}>
        Last updated: 01:29 PM Jan 04, 2020
      </Text>
      {/* <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} style={styles.contentHeaderIcon} />
          <Text marginLeft={16} bold size={15}>
            Share Basic Information
          </Text>
        </View>
        <Line />
        <View style={styles.content}>
          <Image style={styles.avatar} source={AVATAR.avatar2} />

          {/* <InputItem label="Full Name" value={MY_RECORD_INFORMATION.name} /> */}
          {/* <Text marginTop={24} marginBottom={4}>
          First Name
          </Text>
          <TextInput
            value={name}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={setName}
          />
          <Text marginTop={24} marginBottom={4}>
            Last Name
          </Text>
          <TextInput
            value={name}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={setName}
          />
        <Text marginTop={24} marginBottom={4}>
            Mother Name
          </Text>
          <TextInput
            value={name}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={setName}
          />
          <Text marginBottom={4} marginTop={24}>
            Birthday
          </Text>

          <TouchableOpacity
            activeOpacity={0.54}
            style={{...styles.touchRow, borderColor: theme.borderColor}}>
            <Image source={ICON.calendar} />
            <Text marginLeft={14}>{MY_RECORD_INFORMATION.birthday}</Text>
          </TouchableOpacity>
          <Text marginTop={24} marginBottom={4}>
            Biological Sex
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={[styles.touchSpace, {borderColor: theme.borderColor}]}
            onPress={openGenderPick}>
            <Text>{gender}</Text>
            <Image source={ICON.arrowDown} />
          </TouchableOpacity>
          <Text marginTop={24} marginBottom={4}>
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
          </TouchableOpacity>
        </View>
     
      </Layout> */} 
    
      <MyBasicInformation
       onUploadAvatar={onUploadAvatar}
       avatarSource={state.avatarSource}
       openModalForImage={openModalForImage}
       firstName={values.firstName}
       lastName={values.lastName}
       motherName={values.motherName}
       birthday={state.date}
       datePicker={dateOpen}
       gender={gender}
       openGenderPick={openGenderPick}
       errors={errors}
       touched={touched}
     />
     <MyContactInformation
       email={values.email}
       phone={values. phone}
       mobile={values. mobile}
       address={state.address}
       city={state.city}
       state={state.state}
       zipCode={state.zipCode}
       numbercode={contactCodeArea.code}
       errors={errors}
       touched={touched}
       
     />
   
{/* 
      <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.emergency} style={styles.contentHeaderIcon} />
          <Text marginLeft={12} size={15}>
            Emergency Contact
          </Text>
        </View>
        <View style={styles.content}>
          <Text marginTop={24} marginBottom={4}>
            Contact Name
          </Text>
          <TextInput
            value={emergencyContactName}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={onChangeEmergencyContactName}
          />
          <Text marginTop={24} marginBottom={4}>
            Emergency Phone
          </Text>
          <View style={Theme.flexRow}>
            <TouchableOpacity
              activeOpacity={0.54}
              style={[styles.touchSpace, {borderColor: theme.borderColor}]}
              onPress={openEmergencyPhoneModal}>
              <Text>{emergencyCodeArea.code}</Text>
              <Image source={ICON.arrowDown} />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneTextInput}
              borderColor={Colors.WhiteSmoke}
              value={emergencyContactPhone}
              editable
              onChangeText={onChangeEmergencyContactPhone}
            />
          </View>
          <Text marginTop={24} marginBottom={4}>
            Relationship
          </Text>
          <TouchableOpacity
            activeOpacity={0.54}
            style={[styles.touchSpace, {borderColor: theme.borderColor}]}
            onPress={openRelationPick}>
            <Text>{relationship.name}</Text>
            <Image source={ICON.arrowDown} />
          </TouchableOpacity>
        </View>
      </Layout> */}
      <Modal
        visible={contactPhoneModal}
        onRequestClose={closeContactPhoneModal}
        transparent
        animationType={'none'}>
        <ModalSlideBottom
          onClose={closeContactPhoneModal}
          transY={transYContact}>
          <ModalChangePhoneCode
            onChangeCode={onChangeContactCode}
            phonesAreaCodes={phonesAreaCodes}
          />
        </ModalSlideBottom>
      </Modal>
      <Modal
        visible={emergencyPhoneModal}
        onRequestClose={closeEmergencyPhoneModal}
        transparent
        animationType={'none'}>
        <ModalSlideBottom
          onClose={closeEmergencyPhoneModal}
          transY={transYEmergency}>
          <ModalChangePhoneCode
            onChangeCode={onChangeEmergencyCode}
            phonesAreaCodes={phonesAreaCodes}
          />
        </ModalSlideBottom>
      </Modal>
      <Modal
        visible={genderPick}
        onRequestClose={closeGenderPick}
        transparent
        animationType={'none'}>
        <ModalSelect
          onPressItem={onChangeGender}
          choices={GENDER}
          close={closeGenderPick}
        />
      </Modal>
      <Modal
        visible={relationPick}
        onRequestClose={closeRelationPick}
        transparent
        animationType={'none'}>
        <ModalSlideBottom onClose={closeRelationPick} transY={transYRelation}>
          <ModalChangeRelationship
            onChangeRelationship={onChangeRelationship}
          />
        </ModalSlideBottom>
      </Modal>

      <Modal visible={imageModalVisible} onRequestClose={closeImageModal} transparent>
        <ModalSelect choices={menuOptions} close={closeImageModal} onPressItem={selectImage} />
      </Modal>
    
      <Modal
        visible={dateVisisblity}
        onRequestClose={dateClose}
        transparent
        animationType="fade">
        <ModalSlideBottom onClose={dateClose} transY={dateTransY}>
          <Calendar onPress={onPickDatePress}  value={state.date=='Select Date'?"1999-01-01":state.date}/>
        </ModalSlideBottom>
      </Modal>

    </ScrollView>

)

}
      </Formik>
 
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
    width: scale(112),
  },
  phoneTextInput: {
    width: width - 216,
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
