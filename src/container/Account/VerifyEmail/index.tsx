import React, {memo, useState, useCallback,useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {Colors, Routes} from 'configs';
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
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import  { emailOtpAction} from "Actions/OtpActions/emailOtpAction";
import  { emailOtpVerification} from "Actions/OtpActions/emailOtpVerification";
import useBackButton from 'hooks/useBackButton';
 import { CommonActions } from '@react-navigation/native';

 
interface VerifyEmail {}

const VerifyEmailAddress = memo((props: VerifyEmail) => {
  const dispatch=useAppDispatch();
  const reduxState=useAppSelector((state)=>state);
  const signUpState=reduxState.signUp;
  const sendOtpState=reduxState.sendOtp;
  const verifyOtpState=reduxState.verifyOtp;


  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const {navigate, setOptions} = useNavigation();
  const navigation = useNavigation();

  useBackButton(()=>{
     navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
      }),
  })
  return true;
  })

  const resetStack=()=>{
    navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
      }),
  })
  return true;
  }
  const onSendAgain = useCallback(() => {
    !sendOtpState.fetching&&dispatch(emailOtpAction({id:signUpState.data?.hashid,type:'email' })).then((res) => {
     res.type=="SendOtp/emailOtpAction/fulfilled"?navigateAction(): navigateError(res.payload)})
  }, [signUpState.signupbject]);

  const navigateError = useCallback(async (action) => {
    action.error?alert(action.error):alert("Network Error")
  }, []);

   
  const navigateAction = useCallback(async () => {
    alert("Email verification code sent successfully")
   }, []);

  const onVerify = useCallback(() => {
   if(!isVerified){
     alert("Please Verify Email First")
   }
   else{
    navigate(Routes.VerifyPhoneNumber);
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
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} onPress={resetStack} />
      ),
    });
  }, [setOptions]);

  const verification = useCallback((text:string) => {
    setCode(text);
   text.length==6&&!verifyOtpState.fetching&&dispatch(emailOtpVerification({id:signUpState.data?.hashid,otp:text })).then((res) => {
     res.type=="verifyOtp/emailOtpVerification/fulfilled"?VerificationAction(): VerificationError(res.payload)})
  }, [signUpState.signupbject]);

  const VerificationAction = useCallback(async () => {
    setIsVerified(true)
    console.log("otp send")
   }, []);
   const VerificationError = useCallback(async (action) => {
     action.message?alert(action.message):alert("Network Error")
  }, []);

  return (
    <Container style={styles.container} shoeActivityIndicator={(verifyOtpState.fetching||sendOtpState.fetching)}>
           <Text size={13} lineHeight={16} bold  >
          Step 4 of 5
        </Text>
      <Text size={24} lineHeight={28} bold  marginTop={16}>
        Email Verification
      </Text>
      <Text size={13} lineHeight={22} marginTop={16}>
        Please check you inbox for a five-digit security code and enter it below.
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
  
      <ButtonLinear white 
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
    </Container>
  );
});

export default VerifyEmailAddress;

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
});
