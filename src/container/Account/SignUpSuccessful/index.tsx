import React, {memo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {Colors, Routes} from 'configs';
import scale from 'utils/scale';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import Layout from 'elements/Layout/Layout';
import Constants from 'configs/Const';

interface SignUpSuccessfulProps {}

const SignUpSuccessful = memo((props: SignUpSuccessfulProps) => {
  const {navigate} = useNavigation();
  const onPressFillProfile = useCallback(() => {
    navigate(Routes.BasicInformation);
  }, [navigate]);

  return (
    <Layout style={styles.container}>
      
      <Text size={20} lineHeight={24} bold>
      {Constants.Welcometext}
      </Text>
      <Text size={15} lineHeight={24} center marginTop={16}>
        Get help instantly from top doctor anytime, anywhere.
      </Text>
      <ButtonLinear white 
        title={'Fill Out My Work Profile'}
        onPress={onPressFillProfile}
        style={styles.buttonLinear}
      />
    </Layout>
  );
});

export default SignUpSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Theme.center,
    paddingHorizontal: 24,
  },
  buttonLinear: {
    paddingHorizontal: 32,
    marginTop: 32,
  },
  successImage: {
    width: scale(160, true),
    height: scale(160, true),
    marginBottom: scale(55, true),
  },
});