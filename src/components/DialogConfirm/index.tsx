import React, {memo} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';
import {Colors, Constants} from 'configs';
import Animated, {sub} from 'react-native-reanimated';
import Theme from 'style/Theme';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {IMAGE} from 'images/Image';
import Layout from 'elements/Layout/Layout';
import Container from 'elements/Layout/Container';
import {useTheme} from 'configs/ChangeTheme'


interface Props {
  open: () => void;
  close: () => void;
  transY: Animated.Node<number>;
  onPress: () => void;
  leftTittle?: string;
  rightTitle?: string;
  onPressLeftButton?: () => void;
  onPressRightButton?: () => void;
  header?: string;
  content?: string;
}

const DialogConfirm = memo(
  ({
    open,
    onPress,
    close,
    onPressLeftButton,
    onPressRightButton,
    transY,
    header,
    content,
    leftTittle,
    rightTitle,
  }: Props) => {
    const {theme} = useTheme();
    return (
      <Container style={styles.container}>
        <TouchableOpacity
          onPress={close}
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
                  translateY: sub(0, transY),
                },
              ],
            },
          ]}>
          <Text size={17} lineHeight={20} center bold marginTop={scale(8)}>
            {header || 'Cancel Request'}
          </Text>
          <Image style={styles.iconStyle} source={IMAGE.warning} />
          <Text size={15} lineHeight={24} center marginTop={scale(32)}>
            {content || 'Are you sure want to cancel request?'}
          </Text>
          <View style={styles.styleButton}>
            <ButtonBorder
              style={{flex: 1, marginRight: 8}}
              title={leftTittle || 'Yes'}
              onPress={onPressLeftButton || close}
            />
            <ButtonLinear white 
              styleButton={{flex: 1, marginLeft: 8}}
              style={{marginTop: 0}}
              title={rightTitle || 'No'}
              onPress={onPressRightButton || close}
            />
          </View>
        </Animated.View>
      </Container>
    );
  },
);

export default DialogConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    bottom: -Constants.height,
    borderRadius: scale(16),
    padding: scale(24),
    width: '90%',
    height: scale(334),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  styleButton: {
    ...Theme.flexRowSpace,
    marginTop: scale(32),
    marginBottom: scale(32),
  },
  iconStyle: {
    marginTop: scale(32),
    width: scale(72),
    height: scale(72),
  },
});
