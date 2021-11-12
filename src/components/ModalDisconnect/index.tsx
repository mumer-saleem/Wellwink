import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../../elements/Text';
import {Colors} from '../../configs';
import ButtonLinear from '../../elements/Buttons/ButtonLinear';
import {IMAGE} from '../../images/Image';
import Layout from '../../elements/Layout/Layout';

interface ModalDisconnectProps {}

const ModalDisconnect = memo((props: ModalDisconnectProps) => {
  const onPress = useCallback(() => {}, []);
  return (
    <View style={styles.container}>
      <Layout
        style={{
          borderRadius: 16,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}>
        <Text center size={17} lineHeight={20} bold>
          Ooop! Connection Lost!
        </Text>
        <Text center size={13} lineHeight={22} marginTop={16} marginBottom={32}>
          There seem to be a problem with your connection.
        </Text>
        <Image source={IMAGE.noEntry} style={{alignSelf: 'center'}} />
        <ButtonLinear white 
          title={'OK'}
          onPress={onPress}
          style={{width: '100%', marginTop: 40}}
        />
      </Layout>
    </View>
  );
});

export default ModalDisconnect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Black68,
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
