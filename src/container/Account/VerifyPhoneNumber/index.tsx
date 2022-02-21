import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {Colors, Routes} from 'configs';
import Constants from 'configs/Const';

import scale from 'utils/scale';
import InputCodeOtp from 'components/VerifyPhoneNumber/InputCodeOtp';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {useTheme} from 'configs/ChangeTheme'
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';
import ButtonText from 'elements/Buttons/ButtonText';
 import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import  { smsOtpAction} from "Actions/OtpActions/smsOtpAction";
import  { smsOtpVerification} from "Actions/OtpActions/smsOtpVerification";
import useBackButton from 'hooks/useBackButton';
 import { CommonActions } from '@react-navigation/native';

interface VerifyPhoneNumberProps {}

const VerifyPhoneNumber = memo((props: VerifyPhoneNumberProps) => {
  const dispatch=useAppDispatch();
  const reduxState=useAppSelector((state)=>state);
  const LogInState=reduxState.LogIn.data?.profileable;
  const signupbject=reduxState.signUp.signupbject;
    const sendOtpState=reduxState.sendOtp;
  const verifyOtpState=reduxState.verifyOtp;

  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const {navigate, setOptions} = useNavigation();


  const onSendAgain = useCallback(() => {
  dispatch(smsOtpAction({id:LogInState.hashid,type:'sms' })).then((res) => {
    !sendOtpState.fetching&&res.type=="SendOtp/smsOtpAction/fulfilled"?navigateAction(): navigateError(res.payload)})
  }, [signupbject]);

  const navigateError = useCallback(async (action) => {
    action.error?alert(action.error):alert("Network Error")
  }, []);


  const navigateAction = useCallback(async () => {
    alert("Phone Number verification code sent successfully")

   }, []); 
   
   
  //  const onVerify = useCallback(() => {
  //   navigate(Routes.SentVerifySuccessful);
  // }, [navigate]);
  const onVerify = useCallback(() => {
    if(!isVerified){
      alert("Please Verify Email First")
    }
    else{
      navigation.dispatch({
        ...CommonActions.reset({
            index: 0,
            routes: [{ name: "MainTab" }],
        }),
    })
      navigate(Routes.SentVerifySuccessful);

    }
  }, [isVerified]); 

  const {theme} = useTheme();
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
      headerBackground: () => <Container style={styles.header} />,
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} />
      ),
    });
  }, [setOptions]);
  
  // useBackButton(()=>{
  //   navigation.dispatch({
  //     ...CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "MainTab" }],
  //     }),
  // })
  // return true;  })

  // const resetStack=()=>{
  //   navigation.dispatch({
  //     ...CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "MainTab" }],
  //     }),
  // })
  // return true;
  // }


  const verification = useCallback((text:string) => {
    setCode(text);
   text.length==6&&!verifyOtpState.fetching&&dispatch(smsOtpVerification({id:LogInState.hashid,otp:text })).then((res) => {
     res.type=="verifyOtp/smsOtpVerification/fulfilled"?VerificationAction(): VerificationError(res.payload)})
  }, [signupbject]);

  const VerificationAction = useCallback(async () => {
    setIsVerified(true)
    }, []);
   const VerificationError = useCallback(async (action) => {
     action.message?alert(action.message):alert("Network Error")
  }, []);

  return (
    <Container style={styles.container} shoeActivityIndicator={(verifyOtpState.fetching||sendOtpState.fetching)}>
           <Text size={13} lineHeight={16} bold  >
          Step 5 of 5
        </Text>
      <Text size={24} lineHeight={28} bold  marginTop={16}>
        Number Verification
      </Text>
      <Text size={13} lineHeight={22} marginTop={16}>
        Please check you message for a six-digit security code and enter it below.
      </Text>
      <InputCodeOtp style={styles.enterCode} {...{code, verification,isVerified}} />

      <Text size={13} lineHeight={22} center color={Colors.DarkJungleGreen}>
        Didn'nt get a code?{' '}
        <Text
            blueLight
            type="H6"
            color={Colors.BlueCrayola}
            semiBold
            onPress={onSendAgain}>
          Send again
          </Text>
      </Text>
    

      

      <ButtonLinear 
        white 
        white
        title={'Verify'}
        style={styles.buttonLinear}
         children={
          <Image
            source={require('images/Icon/ic_next.png')}
            style={styles.buttonChildren}
          />
        }
        onPress={onVerify}
      />
           <ButtonText
          backgroundColor={Colors.White}
          hilight
          title={'Skip'}
          style={styles.signUpButton}
          titleColor={Colors.TealBlue}
          textProps={{bold: true}}
          onPress={()=> navigate(Routes.SentVerifySuccessful)}
         />
 
    </Container>
  );
});

export default VerifyPhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
  },
  header: {
    flex: 1,
  },
  enterCode: {
    marginTop: scale(56),
    marginBottom: 32,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: 8,
  },
  buttonLinear: {
    marginTop: 32,
  },
  signUpButton: {
    width: (Constants.width-50 ) ,
    height: 50,
    marginTop: 10,
    borderColor: Colors.Platinum,
    borderWidth: 1,
  },
});
