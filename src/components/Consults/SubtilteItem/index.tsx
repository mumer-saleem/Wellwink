import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  ViewStyle,
  Switch,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import Text from '../../../elements/Text';
import Theme from '../../../style/Theme';
import {Colors} from '../../../configs';
import {ICON} from '../../../images/Icon';
import Layout from '../../../elements/Layout/Layout';
import {useTheme} from '../../../configs/ChangeTheme';
import Line from '../../../elements/Layout/Line';

interface SubtitleItemProps {
  icon: string;
  children: any;
  title: string;
  style?: ViewStyle;
  toggle?: boolean;
  iconRight?: string;
  contentContainerStyle?: ViewStyle;
  onIconRight?: () => void;
  backgroundColor?: ColorValue | string;
}

const SubtitleItem = memo(
  ({
    icon,
    children,
    title,
    style,
    toggle,
    iconRight,
    contentContainerStyle,
    onIconRight,
    backgroundColor,
  }: SubtitleItemProps) => {
    const [toggleValue, setToggleValue] = useState<boolean>(true);
    const onSwitch = () => {
      setToggleValue(!toggleValue);
    };
    const {theme} = useTheme();
    return (
      <Layout
        style={[
          styles.container,
          style,
          {backgroundColor: theme.backgroundItem},
        ]}>
        <View style={styles.header}>
          <View style={Theme.flexRow}>
            <View style={Theme.center}>
              <Image
                style={[styles.iconImage, {tintColor: Colors.TiffanyBlue}]}
                source={ICON[`${icon}`]}
              />
              <View style={styles.opacity}></View>
            </View>
            <Text bold size={15} lineHeight={18} marginLeft={16}>
              {title}
            </Text>
          </View>
          {toggle ? (
            <Switch value={toggleValue} onValueChange={onSwitch} />
          ) : (
            <></>
          )}
          {iconRight != null ? (
            <TouchableOpacity
              activeOpacity={0.54}
              style={styles.iconRight}
              onPress={onIconRight}>
              <Image source={ICON[`${iconRight}`]} tintColor={Colors.White} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Line />
        {toggleValue ? (
          <View style={[styles.children, contentContainerStyle]}>
            {children}
          </View>
        ) : (
          <></>
        )}
      </Layout>
    );
  },
);

export default SubtitleItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 12,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 24,

    ...Theme.flexRowSpace,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  opacity: {
    width: 24,
    height: 24,
    position: 'absolute',
    opacity: 0.16,
    backgroundColor: Colors.TiffanyBlue,
    borderRadius: 6,
  },
  children: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  iconRight: {
    backgroundColor: Colors.DodgerBlue,
    padding: 4,
    borderRadius: 8,
    width: 24,
    height: 24,
  },
});
