import React, {memo, useLayoutEffect} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import Text from '../../../elements/Text';
import {ICON} from '../../../images/Icon';
import {Colors} from '../../../configs';
import Theme from '../../../style/Theme';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {width} from '../../../configs/Const';
import InputItem from '../../../components/InputItem';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useTheme} from '../../../configs/ChangeTheme';
import Content from '../../../elements/Layout/Content';
import Layout from '../../../elements/Layout/Layout';
import Line from '../../../elements/Layout/Line';

const BASIC_INFOMATION_DATA = [
  {
    id: 0,
    label: 'Current Height(ft in)',
    value: '',
  },
  {
    id: 1,
    label: 'Current Weight (lbs)',
    value: '150',
  },
  {
    id: 2,
    label: 'Body Mass Index (BMI)',
    value: '23',
  },
];

const ADVANCE_INFOMATION_DATA = [
  {
    id: 0,
    label: 'Blood Pressure (Systolic)',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 1,
    label: 'Total Cholesterol',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 2,
    label: 'LDL Cholesterol',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 3,
    label: 'HDL Cholesterol',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 4,
    label: 'Triglycerides',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 5,
    label: 'Cholesterol/HDL Ratio',
    placeholder: 'N/A',
    value: '',
  },
  {
    id: 6,
    label: 'Glucose',
    placeholder: 'N/A',
    value: '',
  },
];

export default memo(() => {
  const {setOptions} = useNavigation();
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
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

  return (
    <Content
      style={styles.container}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: getBottomSpace() + 40}}>
      <Text marginTop={24} bold size={24}>
        Health Metrics
      </Text>
      <Text size={11} marginTop={8} marginBottom={40}>
        Last updated: 01:29 PM Jan 04, 2020
      </Text>
      <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} />
          <Text marginLeft={16} bold size={15}>
            Basic Information
          </Text>
        </View>
        <Line />

        {BASIC_INFOMATION_DATA.map((item, index) => {
          return <InputItem key={index} style={styles.content} {...item} />;
        })}
      </Layout>
      <Layout style={styles.contentView}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} />
          <Text marginLeft={16} bold size={15}>
            Advance Informations
          </Text>
        </View>
        <Line />
        {ADVANCE_INFOMATION_DATA.map((item, index) => {
          return <InputItem key={index} style={styles.content} {...item} />;
        })}
      </Layout>
    </Content>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  contentView: {
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginBottom: 16,
  },
  contentHeader: {
    ...Theme.flexRow,

    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 56,
  },
  touchRow: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    padding: 12,
    height: 48,
  },
  touchSpace: {
    ...Theme.flexRowSpace,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    height: 48,
    padding: 12,
  },
  phoneTextInput: {
    width: width - 216,
    marginLeft: 8,
  },
  touchLanguage: {
    ...Theme.flexRow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.WhiteSmoke,
    padding: 12,
    paddingRight: 40,
    flexWrap: 'wrap',
  },
  language: {
    ...Theme.flexRowCenter,
    backgroundColor: Colors.DodgerBlue,
    margin: 4,
    borderRadius: 4,
    padding: 8,
  },
});
