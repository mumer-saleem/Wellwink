import React, {memo, useCallback, useEffect,useLayoutEffect, useState} from 'react';
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
import GeoLocation from 'components/GeoLocation';
import {GeoLocationAddress} from 'type'
import Moment from 'moment';

import {useTheme} from 'configs/ChangeTheme';
import {uploadImageAction} from 'Actions/UploadImage';
import Line from 'elements/Layout/Line';
import scale from 'utils/scale';
import {CameraImage ,libraryImage} from 'utils/imagePiker';
import {ModalManueOptions} from 'configs/Data'
import Container from 'elements/Layout/Container';
import { Formik , useFormikContext, } from "formik";
import * as Yup from "yup";
import {EmailValidation,PhoneValidation,StringValidation} from 'utils/validation';
import PreferredMethods from 'components/MyRecord/PreferredMethods';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import { State } from 'react-native-gesture-handler';
import { actionUpdateProfile } from 'Actions/Profile/actionUpdateProfile';


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
  const dispatch = useAppDispatch()

  const profileInfo=useAppSelector((state)=>state.profile.data?.patient);
 

  
  const validationSchema =  Yup.object().shape({
    firstName:StringValidation,
    lastName:StringValidation,
    motherName:StringValidation,
    email: EmailValidation, 
    mobile:PhoneValidation,
   });
  const {setOptions} = useNavigation();
  const [gender, setGender] = useState<any>(MY_RECORD_INFORMATION.gender);
  const [menuOptions, setMenuOptions] = useState({});
 
  const [state, setState] = useState({
    avatarSource:"",
    avatarSourcError:"",
    dob:'Select Date',
    dateError:"",
    firstName:"",
    lastName:"",
    motherName:"",
    email: "",
    gender:"",
    mobile:"",
    phone:"",
    address:"Select Address",
    state:"",
    city:"",
    zipCode:"",
    lat:"",
    lng:"",
    emailSwitch:false,
    smsSwitch:false,
    bothSwitch:true,
    preferredMethod:"",
    mobileId:"",
    phoneId:"",
    addressId:"",
    cityID:"",
    profileAbleID:"",
    userId:"",
    title:"",
  });
  // const [relationship, setRelationship] = useState(
  //   MY_RECORD_INFORMATION.relationship,
  // );
  const [contactCodeArea, setContactCodeArea] = useState(
    MY_RECORD_INFORMATION.contacPhoneCode,
  );
  // const [emergencyCodeArea, setEmergencyCodeArea] = useState(
  //   MY_RECORD_INFORMATION.emergencyContactPhoneCode,
  // );

  const {
    visible: contactPhoneModal,
    open: openContactPhoneModal,
    close: closeContactPhoneModal,
    transY: transYContact,
  } = useModalAnimation();
  
  const {
    visible: geoLocationVisible,
    open: openGeoLocation,
    close: CloseGeoLocation,
    transY: transYGeo,
   } = useModalAnimation();

  // const {
  //   visible: emergencyPhoneModal,
  //   open: openEmergencyPhoneModal,
  //   close: closeEmergencyPhoneModal,
  //   transY: transYEmergency,
  // } = useModalAnimation();

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
 
 
 

  const onChangeGender = useCallback(item => {
    setState(prevState => ({
      ...prevState,
      gender:item.name
  }))
     closeGenderPick();
  }, []);
 

  const onChangeRelationship = useCallback((item: categoryList) => {
    setRelationship(item);
    closeRelationPick();
  }, []);
 
 
    
   const selectImage = useCallback(async(result) => {
     switch (result?.id) {
      case 0:
     let result= await libraryImage()
     console.log(result);
     
        uploadImage(result?.assets)
        closeImageModal()
        break;
     case 1:
      let result1= await CameraImage()
      console.log(result1);

      uploadImage(result1?.assets)
      closeImageModal()
          break;
      default:
        break;
    } 
 
  }, []);
  
  const uploadImage = useCallback(async(result) => {
    dispatch(uploadImageAction({id:profileInfo?.userId,file:result[0].uri}))
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
    
    const openModalForImage=useCallback(( ) => { 
      setMenuOptions(ModalManueOptions.ImagePickerOptions)
      openImageModal()
    }  , []);
   
    const onSelectAddress=useCallback((address:GeoLocationAddress) => { 

      const {complete_address,city,state,zip_code,lat,lng}=address

      setState(prevState => ({
        ...prevState,
        address:complete_address,
        state:state,
        city:city,
        zipCode:zip_code,
        lat:lat,
        lng:lng,
    }))
      
      CloseGeoLocation()
    }  , []);

    const setData=useCallback(() => { 
 
    let gender1 =  gender.charAt(0).toUpperCase() + gender.slice(1);
      setState(  prevState => ({
        ...prevState,...profileInfo, 
        emailSwitch:profileInfo?.preferredMethod=="email"?true:false,
        smsSwitch:profileInfo?.preferredMethod=="sms"?true:false,
        bothSwitch:profileInfo?.preferredMethod=="sms_email"?true:false,
   
    }))
    }  , [State]);
 
  useEffect(() => {
    setData()
  }, [])
  

  const updateProfile=useCallback((obj) => {
   
     dispatch(actionUpdateProfile(obj)).then((res) => {
      res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
    },[state])


    const navigateError = useCallback(async (action) => {
      
       action.errors?alert(action.errors[0]):alert("Network Error")
    }, []);
  
    const navigateAction = useCallback(async (res) => {
       alert("Successfully updated ")
     }, []);

  const {theme} = useTheme();
  return (

      <Formik
      enableReinitialize
      initialValues={{   
      firstName:state.firstName,
      lastName:state.lastName,
      motherName:state.motherName,
      email:state.email,
      mobile:state.mobile,
       }}
      validationSchema={validationSchema}

    onSubmit={async (values) => {
       setState(  prevState => ({
        ...prevState,
        firstName:values.firstName,
        lastName:values.lastName,
        motherName:values.motherName,
        email:values.email ,
        mobile:values.mobile, 
    }))
    let obj={
      ...state,    
       firstName:values.firstName,
      lastName:values.lastName,
      motherName:values.motherName,
      email:values.email ,
      mobile:values.mobile, 
    }

    updateProfile(obj)
     }}
  >
    {({errors, handleChange, handleBlur, handleSubmit, values,touched,}) => 
      
      (
     
    <ScrollView
      style={[styles.container, {backgroundColor: theme.background}]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{paddingBottom: getBottomSpace() + 40}}>
      <Text marginTop={24} bold size={24}>
        Basic Informations
      </Text>
      
      <Text size={11} marginTop={8} marginBottom={40}>
        Last updated: 01:29 PM Jan 04, 2020
      </Text>
    
    
      <MyBasicInformation
       avatarSource={state.avatarSource}
       openModalForImage={openModalForImage}
       firstName={values.firstName}
       lastName={values.lastName}
       motherName={values.motherName}
       birthday={state.dob}
       datePicker={dateOpen}
       gender={state.gender}
       openGenderPick={openGenderPick}
       errors={errors}
       touched={touched}
     />
     <MyContactInformation
       email={values.email}
       phone={state.phone}
       mobile={values.mobile}
       address={state.address}
       city={state.city}
       state={state.state}
       zipCode={state.zipCode}
       numbercode={contactCodeArea.code}
       findAddress={openGeoLocation}
       errors={errors}
       touched={touched}
       setState={setState}
       
     />

     <PreferredMethods
       emailValue={state.emailSwitch}
       smsValue={state.smsSwitch}
       bothValue={state.bothSwitch}
       setState={setState}
     
     />
       <ButtonLinear
          white
          white
          title={'Update'}
          onPress={handleSubmit}
          style={{marginTop: scale(24)}}
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
      {/* <Modal
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
      </Modal> */}
      {/* <Modal
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
      </Modal> */}
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
      {/* <Modal
        visible={relationPick}
        onRequestClose={closeRelationPick}
        transparent
        animationType={'none'}>
        <ModalSlideBottom onClose={closeRelationPick} transY={transYRelation}>
          <ModalChangeRelationship
            onChangeRelationship={onChangeRelationship}
          />
        </ModalSlideBottom>
      </Modal> */}

      <Modal visible={imageModalVisible} onRequestClose={closeImageModal} transparent>
        <ModalSelect choices={menuOptions} close={closeImageModal} onPressItem={selectImage} />
      </Modal>
    
      <Modal
        visible={dateVisisblity}
        onRequestClose={dateClose}
        transparent
        animationType="fade">
        <ModalSlideBottom onClose={dateClose} transY={dateTransY}>
          <Calendar onPress={onPickDatePress}  value={state.dob=='Select Date'?"1999-01-01":state.dob}/>
        </ModalSlideBottom>
      </Modal>

      <Modal
        visible={geoLocationVisible}
        onRequestClose={openGeoLocation}
        transparent
        animationType={'none'}>
        <ModalSlideBottom
          onClose={CloseGeoLocation}
          transY={transYGeo}>
          <GeoLocation 
          onSelect={onSelectAddress}
          />
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
