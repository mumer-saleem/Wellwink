import React, {memo, useLayoutEffect} from 'react';
import Text from 'elements/Text';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import SubtitleItem from 'components/Consults/SubtilteItem';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import AdditionalInformationItem from 'components/Consults/AdditionalInformationItem';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import DoctorInformation from 'components/DoctorInformation';
import {useTheme} from 'configs/ChangeTheme';
import Layout from 'elements/Layout/Layout';
import Content from 'elements/Layout/Content';
import {width} from 'configs/Const';
import Container from 'elements/Layout/Container';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import scale from 'utils/scale';

export default memo(({route}: any) => {
  const {setOptions} = useNavigation();
  const {item, statusName, statusColor} = route?.params;
  const {doctor, time, type, consultDetails, additionalInformation} = item;
  const {medications, allergies, diagnosedConditions} = additionalInformation; //item.additionalInformation
  const {date, sentTime} = time; //item.time
  const {price, questionDetails, answerDetails} = consultDetails; //item.consultDetails
  const {question, askFor, questionImage} = questionDetails; //consultDetails.questionDetails
  const {uri, title, uploadTime} = questionImage; //questionDetails.questionImage
  const {answerOne, answerImage, answerTwo} = answerDetails; //consultDetails.answerDetails
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
        height: scale(108),
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
            {type} Consults
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
        contentContainerStyle={{paddingBottom: getBottomSpace()}}>
        <View style={styles.container}>
          <DoctorInformation {...doctor} />
          <View>
            <SubtitleItem icon="calendar" title="Request Time">
              <Text size={15} lineHeight={18} marginBottom={12}>
                Message sent at {sentTime} {date}
              </Text>
              <Text size={15} lineHeight={18}>
                Message Consult: $ {price} / visit
              </Text>
            </SubtitleItem>
            <SubtitleItem icon="help" title="Consult Details">
              <View>
                <View style={styles.myQuestion}>
                  <Text bold size={15} lineHeight={18}>
                    My Question
                  </Text>
                  <Text size={15} lineHeight={18} marginTop={16}>
                    For {askFor}
                  </Text>
                  <Text
                    size={15}
                    lineHeight={24}
                    marginTop={12}
                    marginBottom={24}>
                    {question}
                  </Text>
                  <View style={Theme.flexRow}>
                    <Image source={uri} style={styles.myQuestionImage} />
                    <View>
                      <Text
                        size={13}
                        lineHeight={22}
                        marginLeft={24}
                        marginBottom={8}>
                        {title}
                      </Text>
                      <Text
                        size={13}
                        lineHeight={16}
                        color={Colors.GrayBlue}
                        marginLeft={24}>
                        Uploaded {uploadTime}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.doctorAnswer}>
                  <Text bold size={15} lineHeight={18}>
                    Doctor Answer
                  </Text>
                  <Text
                    size={15}
                    lineHeight={18}
                    color={Colors.GrayBlue}
                    marginTop={8}
                    marginBottom={10}>
                    Answered {answerDetails.time} {answerDetails.date}
                  </Text>
                  <Text size={15} lineHeight={24} marginBottom={24}>
                    {answerOne}
                  </Text>
                  <View style={Theme.center}>
                    <Image source={answerImage} />
                  </View>
                  <Text size={15} lineHeight={24} marginVertical={24}>
                    {answerTwo}
                  </Text>
                  <ButtonBorder
                    color={Colors.GrayBlue}
                    title="Request New Consult"
                  />
                </View>
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
              marginHorizontal={32}
              marginTop={16}
              color={Colors.GrayBlue}>
              For medical emergencies, please call 911 (or your local emergency
              services) or go to the nearest ER.
            </Text>
          </View>
        </View>
      </Content>
      <Layout style={styles.buttonBottom}>
        <ButtonLinear white title="Write A Review" />
      </Layout>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: getBottomSpace() + scale(132),
  },
  myQuestion: {
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
  myQuestionImage: {
    width: 100,
    height: 72,
  },
  doctorAnswer: {
    paddingVertical: 16,
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
