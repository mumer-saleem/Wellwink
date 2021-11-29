import React, {useState, useEffect, useCallback, memo} from 'react';
import {View, StyleSheet,Image} from 'react-native';
import Text from 'elements/Text';
import {Colors, Routes} from 'configs';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import InputApp from 'elements/InputApp';
 import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {useTheme} from 'configs/ChangeTheme'
import Container from 'elements/Layout/Container';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {forgetPasswordAction} from 'Actions/ForgetPassword/forgetPasswordAction';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";


interface ForgetPasswordProps {}

const ForgetPassword = memo((props: ForgetPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const dispatch=useAppDispatch();
  const reduxState=useAppSelector((state)=>state);
  const forgetPasswordState=reduxState.ForgetPassword;

  useEffect(() => {
  
  }, [email]);
  const {goBack, navigate, setOptions} = useNavigation();

 

  const onSendEmail = useCallback(() => {
    !forgetPasswordState.fetching&&dispatch(forgetPasswordAction({email:email,url:''})).then((res) => {
     res.type=="ForgetPassword/forgetPasswordAction/fulfilled"?navigateAction(res): navigateError(res.payload)})
  }, [email]);

  const navigateError = useCallback(async (action) => {
     action.errors?alert(action.errors[0]):alert("Network Error")
  }, []);

   
  const navigateAction = useCallback(async (res) => {
     alert(res.payload.data.message)
   }, []);
 

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
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor}  />
      ),
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Text type={'H2'} bold>
          Forget Password
        </Text>
        <Text type="P6" style={{marginTop: 16}}>
          Please enter your email below to receive your
          {'\n'}password reset instructions.
        </Text>
      </View>
      <InputApp
        title={'Email'}
        placeholder={"Email"}
        value={email}
        onChangeText={setEmail}
        marginTop={scale(40)}
        // borderColor={isValidEmail ? Colors.TealBlue : Colors.Isabelline}
        autoFocus
        icon={
          <Image
            source={require('images/Icon/ic_accept.png')}
            style={styles.icon}
          />
        }
        isShowIcon={isValidEmail}
      />
      <ButtonLinear white 
        title={'Send Email'}
        onPress={onSendEmail}
        style={{marginTop: scale(24)}}
      />
    </Container>
  );
});

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Platinum,
    ...Theme.center,
  },
  content: {
    marginTop: scale(40),
  },
  description: {
    marginTop: 16,
  },
});
