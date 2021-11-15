import React, {memo, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {width} from 'configs/Const';
import {useTheme} from 'configs/ChangeTheme';
import Layout from 'elements/Layout/Layout';
import Container from 'elements/Layout/Container';
import scale from 'utils/scale';

export default memo(({route}: any) => {
  const {item, statusName, statusColor} = route?.params;
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
            Live Chat Consults
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
    <Container style={styles.container}>
      <Text></Text>
      <Layout style={styles.buttonBottom}>
        <ButtonLinear white title="Request New Consult" />
      </Layout>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBottom: {
    width: width,
    paddingBottom: 34,
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 0,
  },
});
