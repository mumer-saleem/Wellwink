import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import {Colors} from 'configs';
import scale from 'utils/scale';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Layout from 'elements/Layout/Layout';

interface Props {
  onPressChat?: () => void;
  onPressVoiceCall?: () => void;
  onPressVideocall?: () => void;
}

const ConnectionMethod = memo(
  ({onPressChat, onPressVoiceCall, onPressVideocall}: Props) => {
    return (
      <Layout style={[styles.container]}>
        <Text size={13} lineHeight={22}>
          Depend on your connection, we will recommend{'\n'}you a best consult
          method
        </Text>
        <View style={styles.frame}>
          <ButtonIcon
            style={styles.chat}
            icon={'typeLiveChat'}
            iconStyle={styles.iconStyle}
            onPress={onPressChat}
          />
          <ButtonIcon
            style={styles.call}
            icon={'typeCall'}
            iconStyle={styles.iconStyle}
            onPress={onPressVoiceCall}
          />
          <ButtonIcon
            style={styles.video}
            icon={'typeVideo'}
            iconStyle={styles.iconStyleVideo}
            onPress={onPressVideocall}
          />
        </View>
        <View style={styles.frame}>
          <Text size={13} lineHeight={16}>
            Live Chat
          </Text>
          <Text size={13} lineHeight={16}>
            Voice Call
          </Text>
          <Text size={13} lineHeight={16}>
            Video Call
          </Text>
        </View>
      </Layout>
    );
  },
);

export default ConnectionMethod;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
    marginTop: scale(16),
    padding: scale(24),
  },
  iconStyle: {
    width: scale(72),
    height: scale(72),
  },
  iconStyleVideo: {
    width: scale(72),
    height: scale(72),
    opacity: 0.5,
  },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(16),
    width: '100%',
  },
  chat: {
    alignItems: 'flex-end',
    width: scale(72),
    height: scale(72),
    borderWidth: 0,
  },
  call: {
    alignItems: 'center',
    width: scale(72),
    height: scale(72),
    borderWidth: 0,
  },
  video: {
    alignItems: 'flex-start',
    width: scale(72),
    height: scale(72),
    borderWidth: 0,
  },
});
