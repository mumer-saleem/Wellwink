import React, {memo, useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Theme from '../../../style/Theme';
import scale from '../../../utils/scale';
import validationEmail from '../../../utils/validation/email';
import {phonesAreaCodes} from '../../../configs/Data';
import SignUpUi from '../SignUp/UI/SignUpUi';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../../configs';
import ModalSlideBottom from '../../../components/ModalSlideBottom';
import ModalChangePhoneCode from '../../../components/SignUp/ModalChangePhoneCode';
import {TcodeArea} from '../../../type/codeArea';
import useModalAnimation from '../../../hooks/useModalAnimation';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {useTheme} from '../../../configs/ChangeTheme'
import Container from '../../../elements/Layout/Container';
import SplashScreen from 'react-native-splash-screen'

interface SignUpProps {}
const SignUp = memo((props: SignUpProps) => {
  const [email, setEmail] = useState('lehieuds@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('419-319-9837');
  const [password, setPassword] = useState('12345678');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [codeArea, setCodeArea] = useState(phonesAreaCodes[0]);
  const {visible, open, close, transY} = useModalAnimation();

  const {navigate, setOptions} = useNavigation();

  const onShowHidePassword = useCallback(() => {
    setVisiblePassword(prev => !prev);
  }, []);

  const onSignUp = useCallback(() => {
    navigate(Routes.VerifyPhoneNumber);
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
  useEffect(() => {
    SplashScreen.hide();
    
  }, []);
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
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
      <SignUpUi
        {...{
          email,
          setEmail,
          isValidEmail,
          codeArea,
          phoneNumber,
          setPhoneNumber,
          password,
          setPassword,
          visiblePassword,
          onShowHidePassword,
          onSignUp,
          onTermOfUse,
          onPrivacyPolicy,
          onGoToLogin,
          onLogInFacebook,
          onLogInTwitter,
        }}
        openModalChange={open}
      />
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
