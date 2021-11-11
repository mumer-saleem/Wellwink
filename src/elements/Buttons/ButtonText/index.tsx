import React, {memo} from 'react';
import {
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import Text, {TextProps} from '../../../elements/Text';
import {Colors} from '../../../configs';
import Theme from '../../../style/Theme';
import {useTheme} from '../../../configs/ChangeTheme';

interface ButtonTextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  marginLeft?: number;
  backgroundColor?: ColorValue | string;
  white?: boolean;
  hilight?: boolean;
  blueLight?: boolean;
}

const ButtonText = memo(
  ({
    backgroundColor,
    title,
    style,
    titleColor = Colors.DodgerBlue,
    onPress,
    borderColor,
    marginLeft,
    white,
    blueLight,
    hilight,
    ...textProps
  }: ButtonTextProps) => {
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {
            marginLeft: marginLeft,
            backgroundColor: backgroundColor || theme.backgroundItem,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.54}>
        <Text
          blueLight={blueLight}
          type="H5"
          color={titleColor}
          {...textProps}
          white={white}
          hilight={hilight}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.White,
    ...Theme.center,
  },
});
