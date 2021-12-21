import React, {memo, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Routes} from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import ConfirmPayment from 'components/ConfirmPayment';
import {DOCTOR_PROFILE} from 'configs/Data';
import {useTheme} from 'configs/ChangeTheme'

interface MessagePaymentProps {}

const MessagePayment = memo(({}: MessagePaymentProps) => {
  const {setOptions, navigate} = useNavigation();
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        backgroundColor: theme.background,
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  });

  const onPressPaymentAndSend = () => {
    navigate(Routes.MessageSentSuccessful);
  };

  return (
    <View style={styles.container}>
      <ConfirmPayment
        stepCurrent={2}
        stepSum={2}
        iconservice="message"
        priceService={45}
        doctorInfo={DOCTOR_PROFILE}
        onPressPaymentAndSend={onPressPaymentAndSend}
      />
    </View>
  );
});

export default MessagePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.Snow,
  },
});