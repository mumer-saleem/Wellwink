import React, {memo, useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Text from 'elements/Text';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import scale from 'utils/scale';
import {Colors, Routes} from 'configs';
import InputApp from 'elements/InputApp';
import Theme from 'style/Theme';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import validationEmail from 'utils/validation/email';
import {IMAGE} from 'images/Image';
import Container from 'elements/Layout/Container';
import  { useSelector,useDispatch } from "react-redux";
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";

import {LoginAction} from '../../../Actions/login';
import {RootState} from 'type';
import AuthManager from 'Services/authenticationManager'

 

interface LoginProps {}

const Login = memo((props: LoginProps) => {

  const dispatch = useAppDispatch()

  const list = useAppSelector((state) =>state)
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword(prev => !prev);
  }, []);

  const onSignUp = useCallback(() => {
    navigate(Routes.SignUp);
 
  }, [navigate]);

  const onLogin = useCallback(() => {
        dispatch(LoginAction({email:email,password:password})) 
       .unwrap()
       .then((originalPromiseResult) => {
        navigate(Routes.MainTab);
        })
       .catch((rejectedValueOrSerializedError) => {
         Alert.alert("Invalid Credentials")
        })

  }, [email,password]);

  const onForgotPassword = useCallback(() => {
    navigate(Routes.ForgetPassword);
  }, [navigate]);

  useEffect(() => {
    console.log(email);
    const validation = validationEmail(email);
    setIsValidEmail(validation);
    console.log(email);
  }, [email]);
  
  
  useEffect(() => {
 

  }, []); 
  

 
  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoApp}>
          <Image source={IMAGE.logo} style={styles.logo} resizeMode="center" />
          <Text type="H5" bold>
            Welcome back!
          </Text>
        </View>
        <View style={styles.inputLogin}>
          <InputApp
            title={'Email'}
            placeholder={'Enter Email'}
            value={email}
            onChangeText={(text)=>setEmail(text)}
            icon={
              <Image
                source={require('images/Icon/ic_accept.png')}
                style={styles.icon}
              />
            }
            isShowIcon={isValidEmail}
          />
          <InputApp
            title={'Password'}
            placeholder={'Enter Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!visiblePassword}
            marginTop={24}
            icon={
              <Image
                source={require('images/Icon/ic_eye_on.png')}
                style={styles.icon}
              />
            }
            isShowIcon
            iconPress={onShowHidePassword}
          />
        </View>
        <ButtonLinear
          white
          white
          title={'Log In'}
          onPress={()=>onLogin()}
          style={{marginTop: scale(24)}}
        />
        <TouchableOpacity style={styles.forgot} onPress={onForgotPassword}>
          <Text type="H6" color={Colors.GrayBlue} style={styles.textUnderline}>
            Forget Password?
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.loginSocial}>
          <Text type="H6" color={Colors.GrayBlue} style={styles.textUnderline}>
            Log in with social account
          </Text>
        </View> */}
        {/* <View style={styles.frameLoginSocial}>
          <TouchableOpacity
            style={styles.buttonFacebook}
            onPress={onLogInFacebook}>
            <Image
              style={{width: scale(20), height: scale(20)}}
              source={require('images/Icon/ic_facebook.png')}
            />
            <Text
              white
              type="H5"
              color={Colors.White}
              bold
              marginLeft={scale(10)}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTwitter}
            onPress={onLogInTwitter}>
            <Image
              style={{width: scale(20), height: scale(20)}}
              source={require('images/Icon/ic_twitter.png')}
            />
            <Text
              white
              type="H5"
              color={Colors.White}
              bold
              marginLeft={scale(10)}>
              Twitter
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.signUp}>
          <Text type="H6" color={Colors.GrayBlue}>
            Don't have an account?{' '}
            <Text
              blueLight
              type="H6"
              color={Colors.BlueCrayola}
              semiBold
              onPress={onSignUp}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
  },
  logoApp: {
    marginTop: getStatusBarHeight() + scale(36, true),
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: scale(12, true),
    marginLeft: scale(12),
    width: scale(60),
    height: scale(60),
  },
  inputLogin: {
    marginTop: scale(60, true),
  },
  icon: {
    width: scale(24),
    height: scale(24, true),
  },
  margin24: {
    marginTop: scale(24, true),
  },
  forgot: {
    alignSelf: 'center',
    marginTop: scale(32, true),
  },
  signUp: {
    alignSelf: 'center',
    marginBottom: scale(16, true),
    justifyContent: 'flex-end',
    borderRadius: 16,
    borderColor: Colors.Platinum,
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  loginSocial: {
    marginTop: scale(80, true),
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameLoginSocial: {
    marginTop: scale(20, true),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: scale(40, true),
  },
  buttonFacebook: {
    flexDirection: 'row',
    marginTop: scale(15, true),
    width: scale(152),
    height: scale(50, true),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bDazzledBlue,
  },
  buttonTwitter: {
    flexDirection: 'row',
    marginTop: scale(15, true),
    width: scale(152),
    height: scale(50, true),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MediumTurquoise,
  },
});
