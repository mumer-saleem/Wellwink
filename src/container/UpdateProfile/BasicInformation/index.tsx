import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image,Modal, Alert} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import {Routes} from 'configs';
import InputApp from 'elements/InputApp';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import AvatarProfile from 'components/UpdateProfile/BasicInformation/AvatarProfile';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Colors from 'configs/Colors';
import {ICON} from 'images/Icon';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';
import Container from 'elements/Layout/Container';
import Constants from 'configs/Const';
import {CameraImage ,libraryImage} from 'utils/imagePiker';
import {ModalManueOptions} from 'configs/Data'
import useModalAnimation from 'hooks/useModalAnimation';
import ModalSelect from 'components/ModalSelect';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import  { basicInfo } from "Redux/Reducers/signUp/signUp";


const BasicInformation = memo(() => {
  const dispatch=useAppDispatch()
 
  const {visible, open, close} = useModalAnimation();
  
  const [menuOptions, setMenuOptions] = useState({});

  const [state, setState] = useState({
    firstName:"",
    firstNameError:"",
    lastName:"",
    lastNameError:"",
    title:'Selelct Title',
    titleError:"", 
  });
  

  const {navigate, setOptions} = useNavigation();
  const {theme} = useTheme();

  const isvalidate=useCallback(() => {
   const {firstName,firstNameError,lastName,lastNameError,title,titleError }=state
    if(firstName==''||lastName==''||title=='Selelct Title' ){
      setState(  prevState => ({...prevState,  firstNameError:firstName==""?"Required":"", lastNameError:lastName==""?"Required":"", 
       titleError:title=="Selelct Title"?"Required":"",
        })  )
       return false
 
  }
  return true
  },[state])

  const onGoToOtherInfo = useCallback(() => {
     const validation =  isvalidate()
     validation && navigate(Routes.OtherInformation);
     validation && dispatch(basicInfo({
      firstName:state.firstName, 
      lastName:state.lastName, 
      title:state.title,  
      // imageurl:state.imageurl 
    }))
  }, [state]);

 
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
      
      headerBackground: () => (
        <Container
          style={[styles.headerBackground, {backgroundColor: theme.background}]}
        />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} />
      ),
    });
  }, [setOptions]);

  const onPressItem = useCallback(async(result) => {
    ModalManueOptions.titileOptions==menuOptions&&selectTitle(result) 
    // ModalManueOptions.ImagePickerOptions==menuOptions&&selectImage(result)

  }, [menuOptions]);

 

   const selectTitle = useCallback(async(result) => {
      // setTitle(result.name)
       setState(  prevState => ({
        ...prevState,
        title:result.name,
        titleError:""

    }))
  }, [state]);

 
  
  
    const openModalForTitle=useCallback(() => { 
      setMenuOptions(ModalManueOptions.titileOptions)
      open()
    }  , []);
    const onGoToLogin = useCallback(() => {
      navigate(Routes.Login);
    }, [navigate]);

  return (
    
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
  

     <Text size={24} lineHeight={28} bold marginTop={scale(32)}>
           {Constants.Welcometext} 
        </Text>
  
         <Text
          size={scale(13)}  lineHeight={scale(16)} bold marginTop={scale(10)} >
          Step 1 of 5
        </Text>
        <InputApp
          title={'Title'}
          marginTop={scale(30)}
          value={state.title}
           onPress={()=>{openModalForTitle()}}
          isShowIconLeft
          iconLeft={<Image source={ICON.blackArrDown} style={Theme.icons16} />}
          editable={false}
        />
          <View style={{height:scale(24)}}> 
      {state.titleError!="" &&<Text style={{ color:"red",   }}>{state.titleError}</Text>}
         </View> 
         <InputApp
          title={'First Name'}
          placeholder={"First Name"}
          // marginTop={scale(24)}
          value={state.firstName}
          onChangeText={(text)=>
             setState(  prevState => ({
            ...prevState,
            firstName:text,
            firstNameError:state.firstName.length<1?"At least two characters":""
  
        }))}
        />
        <View style={{height:scale(24)}}> 
        {state.firstNameError!="" &&<Text style={{ color:"red",   }}>{state.firstNameError}</Text>}
        </View>
        <InputApp
          title={'Last Name'}
          placeholder={"Last Name"}
          // marginTop={scale(12)}
          value={state.lastName}
           onChangeText={(text)=>{
            setState(  prevState => ({
              ...prevState,
              lastName:text,
              lastNameError:state.lastName.length<1?"At least two characters":""
      
          }))
        }}
         />
       {state.lastNameError!="" &&<Text style={{ color:"red",   }}>{state.lastNameError}</Text>}

        <ButtonLinear
          white
          title={'Continue'}
          children={<Image source={ICON.next} style={styles.buttonChildren} />}
          onPress={onGoToOtherInfo}
          style={styles.buttonLinear}
        />
        <View style={{ marginBottom:20}}>
          <Text
          size={13}
          lineHeight={22}
          marginTop={26}
          center
          
          color={Colors.DarkJungleGreen}>
          Already have an account?{' '}
          <Text
            blueLight
            type="H6"
            color={Colors.BlueCrayola}
            semiBold
            onPress={onGoToLogin}>
            Sign in
          </Text>
        </Text>
        </View>
      </ScrollView>
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSelect choices={menuOptions} close={close} onPressItem={onPressItem} />
      </Modal>
     
    </Container>
  );
});

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
     
   },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  inputApp: {
    marginTop: scale(24),
  },
  firstName: {
    marginTop: scale(38),
  },
  homeAddress: {
    marginTop: scale(32),
  },
  buttonLinear: {
    marginTop: scale(24),
  },
  genders: {
    marginTop: scale(24),
    ...Theme.flexRow,
    ...Theme.center,
  },
  headerBackground: {
    flex: 1,
  },
});
