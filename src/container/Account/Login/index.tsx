import React, {memo, useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
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
import  LoaderAbsolute from 'elements/Loader/LoaderAbsolute'
import {LoginAction} from '../../../Actions/SignIn/login';
import {RootState} from 'type';
import AuthManager from 'Services/authenticationManager'
import * as Yup from "yup";
import { Formik , useFormikContext, } from "formik";
import { CommonActions } from '@react-navigation/native';


 import {EmailValidation,PasswordValidation} from 'utils/validation';

interface LoginProps {}

const Login = memo((props: LoginProps) => {
 
  const validationSchema =  Yup.object().shape({
    email: EmailValidation,
    password:PasswordValidation
  });

  const dispatch = useAppDispatch()

  const LogIn = useAppSelector((state) =>state.LogIn)
  const {navigate} = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigation = useNavigation();

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword(prev => !prev);
  }, []);

  const onSignUp = useCallback(() => {
    navigate(Routes.BasicInformation);
 
  }, [navigate]);

  const onLogin = useCallback((email,password) => {
        dispatch(LoginAction({email:email,password:password})).then((res) => {
          res.type=="Login/LoginAction/fulfilled"? navigateAction(): navigateError(res.payload) })
          
  }, [email,password,LogIn]);

  const navigateError = useCallback(async (action) => {
     if(action.error==401){
      alert("Invalid email or password")
    }
    else if(action.error==409){
      alert("User is inactive/blocked. Please contact our customer support to activate/unblock this user.")
    }
    else{
      alert("Network Error")
    }
   }, []);
  const navigateAction = useCallback(async () => {
    navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
      }),
    })
    }, []);

  const onForgotPassword = useCallback(() => {
    navigate(Routes.ForgetPassword);
  }, [navigate]);

  useEffect(() => {
     const validation = validationEmail(email);
    setIsValidEmail(validation);
   }, [email]);
  
  
  useEffect(() => {
 

  }, []); 
  

 
  return (
    <Container style={styles.container}>
      <ScrollView style={{  }} showsVerticalScrollIndicator={false}>
        <View style={styles.logoApp}>
          <Image source={IMAGE.logo} style={styles.logo} resizeMode="center" />
          <Text type="H5" bold>
            Welcome back!
          </Text>
        </View>
        <Formik
            initialValues={{   
              email: "",
              password:"" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

              onLogin(values.email,values.password)
          
            }}
          >
            {({errors, handleChange, handleBlur, handleSubmit, values,touched,}) => (
   <View>
        <View style={styles.inputLogin}>
          <InputApp
            title={'Email'}
            placeholder={'Enter Email'}
            value={values.email.trim()}
            onChangeText={ handleChange("email") }
            icon={
              <Image
                source={require('images/Icon/ic_accept.png')}
                style={styles.icon}
              />
            }
            isShowIcon={isValidEmail}
          />
           {errors.email==undefined &&  setEmail(values.email) }
           <View style={{height:scale(24)}}>       
           {errors.email && touched.email&& <Text style={{ color:"red",}}>{errors.email}</Text> }
           </View>
 
          <InputApp
            title={'Password'}
            placeholder={'Enter Password'}
            value={values.password}
            onChangeText={ handleChange("password") }
            secureTextEntry={!visiblePassword}
            // marginTop={24}
            icon={
              <Image
                source={require('images/Icon/ic_eye_on.png')}
                style={styles.icon}
              />
            }
            isShowIcon
            iconPress={onShowHidePassword}
          />
          <View style={{height:scale(24)}}> 
          
       {errors.password&& touched.email&&  <Text style={{ color:"red",   }}>{errors.password}</Text>}
           </View>
        </View>
        

        <ButtonLinear
          white
          white
          title={'Sign In'}
          onPress={handleSubmit}
          style={{marginTop: scale(24)}}
        />
        </View>
            )}
        </Formik>
     
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
  <TouchableOpacity style={styles.forgot} onPress={onForgotPassword}>
          <Text type="H6" color={Colors.GrayBlue} style={styles.textUnderline}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
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
      {LogIn.fetching&&(
 
 <LoaderAbsolute/>
 )
}
    </Container>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    
  },
  logoApp: {
    marginTop: getStatusBarHeight() + scale(36, true),
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
  
    marginLeft: scale(12),
    width: scale(180),
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
    marginTop: scale(10, true),

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
