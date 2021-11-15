import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {width} from 'configs/Const';
import Container from 'elements/Layout/Container';

export default memo(() => {
  return (
    <Container style={styles.container}>
      <Text>Healthy</Text>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Theme.center,
    width: width,
  },
});
