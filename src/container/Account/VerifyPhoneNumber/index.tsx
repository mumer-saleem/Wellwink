import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
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

interface VerifyPhoneNumberProps {}

const VerifyPhoneNumber = memo((props: VerifyPhoneNumberProps) => {
  const [code, setCode] = useState('');
  const {navigate, setOptions} = useNavigation();
  const onSendAgain = useCallback(() => {}, []);
  const onVerify = useCallback(() => {
    navigate(Routes.BasicInformation);
  }, [navigate]);
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => <Container style={styles.header} />,
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} />
      ),
    });
  }, [setOptions]);
  return (
    <Container style={styles.container}>
      <Text size={24} lineHeight={28} bold marginTop={scale(40)}>
        Verification
      </Text>
      <Text size={13} lineHeight={22} marginTop={16}>
        Please check you message for a six-digit security code
        {'\n'}and enter it below.
      </Text>
      <InputCodeOtp style={styles.enterCode} {...{code, setCode}} />
      <Text size={13} lineHeight={22} center color={Colors.DarkJungleGreen}>
        Didn'nt get a code?{' '}
        <Text
          size={13}
          lineHeight={22}
          color={Colors.BlueCrayola}
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
});
