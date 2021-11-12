import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';
import {Routes} from 'configs';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import {IMAGE} from 'images/Image';
import Container from 'elements/Layout/Container';
import {useTheme} from 'configs/ChangeTheme';
interface SentSuccessQuestionProps {}

const SentSuccessQuestion = memo((props: SentSuccessQuestionProps) => {
  const {navigate} = useNavigation();

  const onGoToDashBoard = useCallback(() => {
    navigate(Routes.MainTab);
  }, [navigate]);

  const {theme} = useTheme();
  return (
    <Container style={styles.container}>
      <Image source={IMAGE.sentSuccessful} style={styles.successImage} />
      <Text size={20} lineHeight={24} bold>
        Sent Successful!
      </Text>
      <Text size={15} lineHeight={24} center marginTop={16}>
        While waiting for the answers you can check{'\n'}the health feed and
        learn insight.
      </Text>
      <ButtonBorder
        title={'Check Health Feed'}
        borderColor={theme.borderColor}
        marginBottom={24}
      />
      <ButtonLinear
        white
        title={'Go to Home Dashboard'}
        style={{paddingHorizontal: 32}}
        onPress={onGoToDashBoard}
      />
    </Container>
  );
});

export default SentSuccessQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    width: scale(160, true),
    height: scale(160, true),
    marginBottom: scale(55, true),
  },
});
