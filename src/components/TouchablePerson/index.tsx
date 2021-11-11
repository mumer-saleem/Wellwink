import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Text from 'elements/Text';
import {Colors} from 'configs';
import scale from 'utils/scale';
import {dataPerson} from 'type/healthyQuestion';
import {ICON} from 'images/Icon';
import Layout from 'elements/Layout/Layout';
import Theme from 'style/Theme';
import Line from 'elements/Layout/Line';

interface TouchablePersonProps {
  data: Array<dataPerson>;
  isYou: boolean;
  onPress: (item: dataPerson) => void;
  style: ViewStyle;
}

const TouchablePerson = memo((props: TouchablePersonProps) => {
  return (
    <Layout style={[props.style]}>
      <View style={styles.contentHeader}>
        <Image source={ICON.account} style={styles.contentHeaderIcon} />
        <Text marginLeft={16} bold size={15}>
          Is this for You or Someone else?
        </Text>
      </View>
      <Line />
      <View style={styles.frameFlat}>
        {props.data.map((item: dataPerson, index: number) => {
          if (item.check) {
            return (
              <View style={[styles.frameTouch]} key={index}>
                <TouchableOpacity
                  style={styles.touch1}
                  onPress={() => props.onPress(item)}>
                  <Image
                    source={
                      item.isAdd
                        ? ICON.addPatient
                        : item.check
                        ? ICON.accountWhite
                        : ICON.account
                    }
                    resizeMode="center"
                  />
                </TouchableOpacity>
                <Text
                  size={scale(13)}
                  lineHeight={scale(22)}
                  bold
                  center
                  marginTop={scale(16)}>
                  {item.isAdd ? 'Someone else' : item.lastName}
                </Text>
              </View>
            );
          }
          return (
            <View style={[styles.frameTouch]} key={index}>
              <TouchableOpacity
                style={styles.touch2}
                onPress={() => props.onPress(item)}>
                <Image
                  source={item.isAdd ? ICON.addPatient : ICON.account}
                  resizeMode="center"
                />
              </TouchableOpacity>
              <Text
                size={scale(13)}
                lineHeight={scale(22)}
                bold
                center
                marginTop={scale(16)}>
                {item.isAdd ? 'Someone else' : item.lastName}
              </Text>
            </View>
          );
        })}
      </View>
    </Layout>
  );
});

export default TouchablePerson;

const styles = StyleSheet.create({
  frameImg: {},
  img: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(16),
    marginLeft: scale(8),
  },
  frameFlat: {
    flexDirection: 'row',
    padding: scale(24),
    paddingRight: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  frameTouch: {
    marginLeft: scale(8),
    marginRight: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch1: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DodgerBlue,
  },
  touch2: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: Colors.WhiteSmoke,
  },
  contentHeaderIcon: {
    tintColor: Colors.TiffanyBlue,
    backgroundColor: Colors.TiffanyBlueOpacity,
    borderRadius: 4,
  },
  contentHeader: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'center',
  },
});
