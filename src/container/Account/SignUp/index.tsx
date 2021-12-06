import React, {memo, useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Modal,Alert} from 'react-native';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import validationEmail from 'utils/validation/email';
import {phonesAreaCodes} from 'configs/Data';
import SignUpUi from './UI/SignUpUi';
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ModalSlideBottom from 'components/ModalSlideBottom';
import ModalChangePhoneCode from 'components/SignUp/ModalChangePhoneCode';
import {TcodeArea} from 'type/codeArea';
import useModalAnimation from 'hooks/useModalAnimation';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {useTheme} from 'configs/ChangeTheme'
import Container from 'elements/Layout/Container';
import * as Yup from "yup";
import { Formik , useFormikContext, } from "formik";
import {EmailValidation,StrongPassword,PhoneValidation} from 'utils/validation';
import  { accountInfo } from "Redux/Reducers/signUp/signUp";
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import {SignUpAction} from 'Actions/SignUp/signUp'
import  LoaderAbsolute from 'elements/Loader/LoaderAbsolute'
import { CommonActions } from '@react-navigation/native';



interface SignUpProps {}

const SignUp = memo((props: SignUpProps) => {
  const dispatch=useAppDispatch();
  const signUpState=useAppSelector((state)=>state.signUp);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [codeArea, setCodeArea] = useState(phonesAreaCodes[0]);
  const {visible, open, close, transY} = useModalAnimation();
  const navigation = useNavigation();

   
  const validationSchema =  Yup.object().shape({
    email: EmailValidation,
    password:StrongPassword,
    phoneNumber:PhoneValidation,
  });

  const {navigate, setOptions} = useNavigation();

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword(prev => !prev);
  }, []);

  const onSignUp = useCallback((email,password,phoneNumber) => {
    let signupbject ={...signUpState.signupbject,
      password:password,
      email:email,
      phoneNumber:phoneNumber,
    }
    dispatch(SignUpAction(signupbject)).then((res) => {
     res.type=="signUp/SignUpAction/fulfilled"?navigateAction(): navigateError(res.payload)})
  }, [signUpState.signupbject]);

  const navigateError = useCallback(async (action) => {
    action.error?alert(action.error):alert("Network Error")
  }, []);
  const navigateAction = useCallback(async () => {
    navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
      }),
  })
    navigate(Routes.VerifyEmail)
    
   }, []);

  const onTermOfUse = useCallback(() => {}, []);
  const onPrivacyPolicy = useCallback(() => {}, []);
  const onGoToLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);

  const onChangeCode = useCallback((item: TcodeArea) => {
    setCodeArea(item);
    close();
  }, []);

  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);

  const onLogInFacebook = useCallback(async () => {
    ///
  }, []);
  const onLogInTwitter = useCallback(async () => {
    ///
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
      headerBackground: () => (
        <Container style={{flex: 1, backgroundColor: theme.background}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);
  return (
    <Container style={styles.container}>
              <Formik
            initialValues={{   
              email: "",
              password:"",
              phoneNumber:"", }}
              validationSchema={validationSchema}
            onSubmit={async (values) => {
               dispatch(accountInfo({
                email: values.email,
                password:values.password,
                phoneNumber:values.phoneNumber, 
               }))
               &&onSignUp(values.email,values.password,values.phoneNumber)
          
             }}
          >
            {({errors, handleChange, handleBlur, handleSubmit, values,touched,}) => 
              
              (
      <SignUpUi
        {...{
          email:values.email,
          setEmail,
          isValidEmail,
          codeArea,
          phoneNumber:values.phoneNumber,
          // setPhoneNumber,
          password:values.password,
          // setPassword,
          visiblePassword,
          onShowHidePassword,
          handleSubmit,
          onTermOfUse,
          onPrivacyPolicy,
          onGoToLogin,
          onLogInFacebook,
          onLogInTwitter,
          values,
          errors,
          touched
        }}
        // openModalChange={open}
        openModalChange={()=>console.log("no need to")}

      />

       )

}
      </Formik>
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={'none'}>
        <ModalSlideBottom onClose={close} transY={transY}>              
          <ModalChangePhoneCode
            onChangeCode={onChangeCode}
            phonesAreaCodes={phonesAreaCodes}
          />
        </ModalSlideBottom>
      </Modal>
    

       {signUpState.fetching&&(
 
          <LoaderAbsolute/>
          )
        }
    </Container>
  );
});

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  password: {
    marginTop: 24,
  },
  phoneNumber: {
    marginLeft: 8,
    flex: 1,
  },
  emailInput: {
    marginTop: scale(34),
  },
  bottom: {
    ...Theme.flexOne,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flag: {
    width: 32,
    height: 20,
  },
  changePhoneCode: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
});
