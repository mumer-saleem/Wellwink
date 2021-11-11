import React, {memo, useLayoutEffect} from 'react';
import Text from 'elements/Text';
import {View, StyleSheet, ScrollView, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import SubtitleItem from 'components/Consults/SubtilteItem';
import AdditionalInformationItem from 'components/Consults/AdditionalInformationItem';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import DoctorInformation from 'components/DoctorInformation';
import useModalAnimation from 'hooks/useModalAnimation';
import ModalSlideBottom from 'components/ModalSlideBottom';
import ModalEditVisitTime from 'components/ModalEditVisitTime';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {width} from 'configs/Const';
import {useTheme} from 'configs/ChangeTheme';

import Layout from 'elements/Layout/Layout';
import Content from 'elements/Layout/Content';
import Container from 'elements/Layout/Container';
import scale from 'utils/scale';

export default memo(({route}: any) => {
  const {setOptions} = useNavigation();
  const {item, statusName, statusColor} = route?.params;
  const {doctor, time, consultDetails, additionalInformation} = item;
  const {medications, allergies, diagnosedConditions} = additionalInformation; //item.additionalInformation
  const {date, timeRange, sentTime} = time; //item.time
  const {price, questionDetails} = consultDetails; //item.consultDetails
  const {question, askFor} = questionDetails; //consultDetails.questionDetails
  const {visible, close, transY} = useModalAnimation();
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {height: 0},
        elevation: 0,
        backgroundColor: theme.backgroundItem,
        marginBottom: 16,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
      headerRight: () => (
        <ButtonIconHeader
          marginRight={24}
          tintColor={Colors.DodgerBlue}
          borderColor={Colors.DodgerBlue}
          icon="option"
        />
      ),
      headerTitle: () => (
        <View style={Theme.center}>
          <Text size={17} lineHeight={20} marginBottom={8} bold>
            Voice Call Consult
          </Text>
          <Text
            semiBold
            size={13}
            lineHeight={16}
            marginBottom={12}
            color={statusColor}>
            {statusName}
          </Text>
        </View>
      ),
    });
  });

  return (
    <Container>
      <Content
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: getBottomSpace() + 100}}>
        <View style={styles.container}>
          <DoctorInformation {...doctor} />
          <SubtitleItem icon="calendar" title="Consult Time">
            <Text size={15} lineHeight={18}>
              {date}
            </Text>
            <View style={Theme.flexRow}>
              <Text bold size={15} lineHeight={18} marginVertical={12}>
                {sentTime}
              </Text>
              <Text
                size={13}
                lineHeight={16}
                marginVertical={12}
                color={Colors.RedNeonFuchsia}
                marginLeft={9}>
                {timeRange}
              </Text>
            </View>
            <Text size={15} lineHeight={18}>
              Voice Call Consult: $ {price} / visit
            </Text>
          </SubtitleItem>
          <SubtitleItem icon="help" title="Consult Details">
            <View>
              <Text size={15} lineHeight={18} marginTop={16} bold>
                For {askFor}
              </Text>
              <Text size={15} lineHeight={24} marginTop={12}>
                {question}
              </Text>
            </View>
          </SubtitleItem>
          <SubtitleItem
            icon="additionalInformation"
            title="Addition Information">
            <AdditionalInformationItem
              diagnosedConditions={diagnosedConditions}
              medications={medications}
              allergies={allergies}
            />
          </SubtitleItem>
          <Text
            center
            size={11}
            lineHeight={18}
            color={Colors.GrayBlue}
            marginTop={16}
            marginBottom={40}
            marginHorizontal={32}>
            For medical emergencies, please call 911 (or your local emergency
            services) or go to the nearest ER.
          </Text>
          <Text
            center
            size={13}
            lineHeight={16}
            textDecorationLine="underline"
            color={Colors.GrayBlue}
            marginBottom={24}>
            Cancel Request
          </Text>
        </View>
      </Content>
      <Layout style={styles.buttonBottom}>
        <ButtonLinear white title="Notify Doctor Again" />
      </Layout>
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalEditVisitTime onPressDone={close} />
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: getBottomSpace() + scale(132),
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: getBottomSpace() + 16,
    paddingTop: 40,
    width: width,
    paddingHorizontal: 24,
  },
});
