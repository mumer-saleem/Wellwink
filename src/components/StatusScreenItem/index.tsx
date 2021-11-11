import React, {memo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {IMAGE} from 'images/Image';
import {Colors, Routes} from 'configs';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import Container from 'elements/Layout/Container';

interface StatusScreenItemProps {
  img: string;
  status: string;
  detail1?: string;
  detail2?: string;
  children?: any;
}

const StatusScreenItem = memo(
  ({img, status, detail1, detail2, children}: StatusScreenItemProps) => {
    const {navigate} = useNavigation();
    const onDashBoard = () => {
      navigate(Routes.MainTab);
    };
    return (
      <Container style={styles.container}>
        <Image source={IMAGE[`${img}`]} />
        <Text bold size={20} lineHeight={24} marginTop={56} center>
          {status}
        </Text>
        <Text
          center
          size={15}
          lineHeight={24}
          marginHorizontal={32}
          marginTop={16}>
          {detail1}
        </Text>
        <Text
          center
          size={15}
          lineHeight={24}
          marginBottom={32}
          marginHorizontal={32}>
          {detail2}
        </Text>
        <>
          {children}
          <ButtonLinear white 
            style={styles.button}
            title="Go to Home Dashboard"
            onPress={onDashBoard}
          />
        </>
      </Container>
    );
  },
);

export default StatusScreenItem;

const styles = StyleSheet.create({
  container: {
    ...Theme.center,
    flex: 1,
  },
  button: {
    width: 240,
  },
});
