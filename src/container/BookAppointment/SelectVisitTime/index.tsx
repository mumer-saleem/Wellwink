import React, {memo, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Text from 'elements/Text';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import {Colors, Routes} from 'configs';
import VisitTimeCalendar from 'components/Consults/VisitTimeCalendar';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import EditVisitTimeItem from 'components/ModalEditVisitTime/EditVisitTimeItem';
import {VISIT_TIME_LIST} from 'configs/Data';
import {useTheme} from 'configs/ChangeTheme'
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';

export default memo(() => {
  const {navigate, setOptions} = useNavigation();

  const [selectedDate, setSelectedDate] = useState<any>('Friday, Jan 5, 2020');
  const [selectedTime, setSelectedTime] = useState(VISIT_TIME_LIST[0]);

  const onContinue = () => {
    navigate(Routes.BookAppointmentDetail);
  };
  const {theme} = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} />
      ),
    });
  });
  return (
    <View style={styles.container}>
      <Layout>
        <Text
          bold
          size={13}
          lineHeight={16}
          marginLeft={24}
          marginVertical={16}>
          Step 1 of 3
        </Text>
        <Text bold size={24} lineHeight={28} marginLeft={24} marginBottom={12}>
          Select Visit Time
        </Text>
      </Layout>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.containerScroll}
        showsVerticalScrollIndicator={false}>
        <VisitTimeCalendar />

        <Container style={styles.listTime}>
          <Text bold size={15} lineHeight={18}>
            {selectedDate}
          </Text>
          <View style={styles.scrollView}>
            {VISIT_TIME_LIST.map((item, index) => {
              return (
                <EditVisitTimeItem
                  {...item}
                  selectedId={selectedTime.id}
                  key={index}
                  onPress={() => {
                    setSelectedTime(item);
                  }}
                />
              );
            })}
          </View>
        </Container>
      </ScrollView>
      <Layout style={styles.buttonBottom}>
        <ButtonLinear white  title="Continue" onPress={onContinue} />
      </Layout>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTime: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  scrollView: {
    height: 180,
    marginVertical: 18,
  },
  containerScroll: {
    paddingBottom: 160,
  },
  buttonBottom: {
    bottom: 0,
    paddingTop: 12,
    left: 0,
    right: 0,
    position: 'absolute',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
