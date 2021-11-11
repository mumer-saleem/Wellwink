import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Constants} from 'configs';
import Animated, {sub} from 'react-native-reanimated';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import scale from 'utils/scale';
import Theme from 'style/Theme';
import {width} from 'configs/Const';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme'


interface ModalProcessProps {
  children?: any;
  onClose: () => void;
  transY: Animated.Node<number>;
}

const ModalProcess = (props: ModalProcessProps) => {
  const {theme} = useTheme();
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        onPress={props.onClose}
        activeOpacity={1}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View
        style={[
          styles.modal,
          {backgroundColor: theme.backgroundItem},
          {
            transform: [
              {
                translateY: sub(0, props.transY),
              },
            ],
          },
        ]}>
        <View style={styles.children}>{props.children}</View>
        <ButtonLinear white  title="OK" onPress={props.onClose} />
      </Animated.View>
    </Layout>
  );
};

export default ModalProcess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ModalBackground,
    ...Theme.center,
    paddingHorizontal: 24,
  },
  modal: {
    bottom: -Constants.height,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'flex-start',
  },
  children: {
    marginBottom: 40,
  },
});
