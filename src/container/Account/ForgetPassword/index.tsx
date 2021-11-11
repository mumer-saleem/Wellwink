import React, {useState, useEffect, useCallback, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../../elements/Text';
import {Colors, Routes} from '../../../configs';
import Theme from '../../../style/Theme';
import scale from '../../../utils/scale';
import InputApp from '../../../elements/InputApp';
import validationEmail from '../../../utils/validation/email';
import ButtonLinear from '../../../elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {useTheme} from '../../../configs/ChangeTheme'
import Container from '../../../elements/Layout/Container';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';

interface ForgetPasswordProps {}

const ForgetPassword = memo((props: ForgetPasswordProps) => {
  const [email, setEmail] = useState('lehieuds@gmail.com');
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    const validation = validationEmail(email);
    setIsValidEmail(validation);
  }, [email]);
  const {goBack, navigate, setOptions} = useNavigation();

  const onSendEmail = useCallback(() => {
    navigate(Routes.RecoveryPassword);
  }, [navigate]);
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{flex: 1, backgroundColor: theme.background}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
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
        value={email}
        onChangeText={setEmail}
        marginTop={scale(40)}
        borderColor={isValidEmail ? Colors.TealBlue : Colors.Isabelline}
        autoFocus
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
