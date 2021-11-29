import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import {Routes} from 'configs';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import Layout from 'elements/Layout/Layout';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import Constants from 'configs/Const';
import useBackButton from 'hooks/useBackButton';
 import { CommonActions } from '@react-navigation/native';
interface SentVerifySuccessfulProps {}

const SentVerifySuccessful = memo((props: SentVerifySuccessfulProps) => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();

  const onGoToDashBoard = useCallback(() => {
    navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTab" }],
      }),
  })
  }, [navigate]);

  // useBackButton(()=>{
  //   navigation.dispatch({
  //     ...CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "MainTab" }],
  //     }),
  // })
  // return true;
  // })
 


  return (
    <Layout style={styles.container}>
      <Image
        source={require('images/Avatar/avatar-2.png')}
        style={styles.successImage}
      />
      <Text size={20} lineHeight={24} bold>
      {Constants.Welcometext}
      </Text>
      <Text size={15} lineHeight={24} center marginTop={16}>
        Get help instantly from top doctor anytime,
        {'\n'}anywhere.
      </Text>
      <ButtonLinear white 
        white
        title={'Go to Home Dashboard'}
        style={{paddingHorizontal: 32, marginTop: scale(32)}}
        onPress={onGoToDashBoard}
      />
    </Layout>
  );
});

export default SentVerifySuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
    ...Theme.center,
  },
  successImage: {
    width: scale(160, true),
    height: scale(160, true),
    marginBottom: scale(55, true),
  },
});
