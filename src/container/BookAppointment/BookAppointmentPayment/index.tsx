import React, {memo, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Routes} from '../../../configs';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import ConfirmPayment from '../../../components/ConfirmPayment';
import {DOCTOR_PROFILE} from '../../../configs/Data';
import {useTheme} from '../../../configs/ChangeTheme'
interface BookAppointmentPaymentProps {}

const BookAppointmentPayment = memo(({}: BookAppointmentPaymentProps) => {
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
    navigate(Routes.BookAppointmentSuccessful);
  };

  return (
    <Container style={styles.container}>
      <ConfirmPayment
        stepCurrent={3}
        stepSum={3}
        iconservice="appointmentActive"
        priceService={45}
        doctorInfo={DOCTOR_PROFILE}
        onPressPaymentAndSend={onPressPaymentAndSend}
      />
    </Container>
  );
});

export default BookAppointmentPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
