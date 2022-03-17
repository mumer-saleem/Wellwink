import React, {memo,useEffect,useLayoutEffect,useState,useCallback} from 'react';
import {TouchableOpacity, View, Image, StyleSheet,Modal,Alert} from 'react-native';
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
import { useField, useFormikContext, ErrorMessage ,Formik} from "formik";
import AvatarProfile from 'components/UpdateProfile/BasicInformation/AvatarProfile';
import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import { useNavigation } from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader'; 
import ButtonLinear from 'elements/Buttons/ButtonLinear';
 import * as Yup from "yup";
 import { PhoneValidation,StringValidation} from 'utils/validation';
 import {width} from 'configs/Const';
 import {FormatPhone} from "utils/formatNumber";
 import InputApp from 'elements/InputApp';
 import {ModalManueOptions} from 'configs/Data'
 import {setContactParams} from 'utils/setObjects';
 import  { postPatientContact } from "Actions/Contacts/postContactsAction";

 import useModalAnimation from 'hooks/useModalAnimation';
 import ModalSelect from 'components/ModalSelect';

 const AddEmerrgencyContacts = memo(( ) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) =>state.profile.data?.patient)
  const [menuOptions, setMenuOptions] = useState({});

  const { navigate, setOptions, goBack } = useNavigation();
  const { theme } = useTheme();
  const validationSchema =  Yup.object().shape({
    firstName:StringValidation,
    phone:PhoneValidation,
    motherName:StringValidation, 
   });

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{ flex: 1, backgroundColor: theme.background }} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ), 
    });
  }, [setOptions]);

  const [state, setState] = useState({
    firstName:"",
    firstNameError:"",
    phone:"",
    phoneError:"",
    relation:"Select Relation", 
    relationError:"", 
    relationID:"",
  })
  const {visible, open, close} = useModalAnimation();


  const isvalidate=useCallback(() => {
        if(state.firstName==''||state.phone==''|| state.relation=='Select Relation' ){
        setState(  prevState => ({...prevState,  firstNameError:state.firstName==""?"Required":"", phoneError:state.phone==""?"Required":"", 
       relationError:state.relation=="Select Relation"?"Required":"",
         })  )
        return false
  
   }
   return true
   },[state])

 
 
   

   const Submit = useCallback(async() => {
     const validation =  isvalidate();
      validation && dispatch(postPatientContact(setContactParams(state,profile?.profileAbleID))).then((res) => {
      res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
    }, [state]);
   
    const navigateError = useCallback(async (action) => {
      action.errors?Alert.alert(action.errors[0]):Alert.alert("Network Error")
   }, [state]);
  
    
   const navigateAction = useCallback(async (res) => {
    Alert.alert("Add Successfully")
      }, []);
  
  const onPressItem = useCallback(async(result) => {
  selectRelation(result) 
 
  }, [menuOptions]);

  const selectRelation = useCallback(async(result) => {
      setState(  prevState => ({
      ...prevState,
      relation:result.name,
      relationError:"",
      relationID:result.id

  }))
}, [state]);

  const openModalForTitle=useCallback(() => { 
    setMenuOptions(ModalManueOptions.relationOptions)
    open()
  }  , []);
 
 
  return (
    <Container style={styles.container}   >

     
<Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} style={styles.contentHeaderIcon} />
          <Text marginLeft={16} bold size={15}>
            Add Emergency Contact
          </Text>
        </View>
        <Line />
        <View style={{paddingHorizontal:20, marginTop:20}}>

        <Text  marginBottom={4}>
            Name*
          </Text>
          <TextInput
          placeholder={"Name"}
            value={state.firstName}
            borderColor={Colors.WhiteSmoke}
            editable
            onChangeText={(value)=>{
              setState(prevState => ({
                ...prevState,
              firstName:value,firstNameError:""
            }))
 
             }}
          />
         <View style={{height:scale(24)}}>  
            {state.firstNameError!=""&& <Text style={{ color:"red",}}>{state.firstNameError}</Text> }
         </View>


         <Text marginBottom={4}>
         Phone Number
          </Text>
          <View style={Theme.flexRow}>
            <TouchableOpacity
              activeOpacity={0.54}
              style={[styles.touchSpace, {borderColor: theme.borderColor}]}
              // onPress={openContactPhoneModal}
              >
              <Text>+1</Text>
              {/* <Image source={ICON.arrowDown} /> */}
            </TouchableOpacity>
            <TextInput
             placeholder={"Phone Number"}
              style={styles.phoneTextInput}
              value={state.phone}
              borderColor={Colors.WhiteSmoke}
              editable
              keyboardType="numeric"
              maxLength={14}
              onChangeText={(value)=>{
                setState(prevState => ({
                  ...prevState,
                phone:FormatPhone(value),phoneError:""
              }))
 
 
              }}
             />
          </View>

          <View style={{height:scale(24)}}>  
            {state.phoneError!=""&& <Text style={{ color:"red",}}>{state.phoneError}</Text> }
         </View>

     
        <InputApp
          title={'Relation*'} 
          value={state.relation}
           onPress={()=>{openModalForTitle()}}
          isShowIconLeft
           iconLeft={<Image source={ICON.blackArrDown} style={Theme.icons16} />}
          editable={false}
        />
          <View style={{height:scale(24)}}> 
           {state.relationError!="" &&<Text style={{ color:"red",   }}>{state.relationError}</Text>}
         </View> 
    
         </View>
      
        <ButtonLinear
          white
          white
          title={'ADD'}
          onPress={()=>Submit()}
          style={{marginTop: scale(24), width:"80%", alignSelf:"center"}}
        />
       </Layout>
   
  
       <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSelect choices={menuOptions} close={close} onPressItem={onPressItem} />
      </Modal>

 
    </Container>

  );
});

export default AddEmerrgencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
 insuranceItem:{
  padding: 16,
  marginTop: scale(8),
  borderRadius: scale(16),
  justifyContent: 'space-between',
  flexDirection: 'row',
},
  
contentView: {
  borderRadius: 16,
  paddingTop: 16,
  paddingBottom: 32,
  marginBottom: 16,
  marginTop: 16,

  
},  
phoneTextInput: {
  width: width - 150,
  marginLeft: 8,
},
contentHeader: {
  ...Theme.flexRow,
  paddingHorizontal: 24,
  paddingBottom: 16,
},  
  contentHeaderIcon: {
  tintColor: Colors.TiffanyBlue,
  backgroundColor: Colors.TiffanyBlueOpacity,
  borderRadius: 4,
},
touchSpace: {
  ...Theme.flexRowSpace,
  borderRadius: 8,
  borderWidth: 1,
  height: 48,
  padding: 12,
  width:50,
},
});
    