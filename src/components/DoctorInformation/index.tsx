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
import {ICON} from 'images/Icon';
import Theme from 'style/Theme';
import Layout from 'elements/Layout/Layout';
import Line from 'elements/Layout/Line';

interface DoctorInformationProps {
  id: number;
  avatar: any;
  name: string;
  nameColor?: string;
  faculty: string;
  rating: number;
  feedback: number;
  careTeam?: boolean;
  isOnline?: boolean;
  style?: ViewStyle;
}

const DoctorInformation = memo(
  ({
    avatar,
    name,
    nameColor,
    faculty,
    rating,
    feedback,
    careTeam,
    isOnline,
    style,
  }: DoctorInformationProps) => {
    return (
      <TouchableOpacity activeOpacity={0.54} style={[styles.container, style]}>
        <Layout style={styles.box}>
          <View>
            <Text bold size={15} lineHeight={18} color={nameColor}>
              Dr. {name}
            </Text>
            <Text marginBottom={8} marginTop={8} size={13} lineHeight={16}>
              {faculty}
            </Text>
            <View style={Theme.flexRow}>
              <Image source={ICON.rateFull} />
              <Text marginHorizontal={5} size={13} lineHeight={16}>
                {rating}
              </Text>
              <Text color={Colors.GrayBlue} size={13} lineHeight={16}>
                ({feedback} Feedback)
              </Text>
            </View>
          </View>
          <View style={styles.avatarView}>
            <View style={Theme.center}>
              <Image style={styles.avatar} source={avatar} />
              {careTeam ? (
                <Image source={ICON.careTeam} style={{marginTop: 4}} />
              ) : (
                <></>
              )}
            </View>
            <Layout style={styles.statusView}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isOnline
                      ? Colors.Malachite
                      : Colors.RedNeonFuchsia,
                  },
                ]}
              />
            </Layout>
          </View>
        </Layout>
        <Line style={{width: '92%', alignSelf: 'center'}} />
      </TouchableOpacity>
    );
  },
);

export default DoctorInformation;

const styles = StyleSheet.create({
  container: {},
  box: {
    paddingLeft: 112,
    paddingTop: 24,
    paddingBottom: 22,
    paddingRight: 24,
    borderRadius: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  avatarView: {
    position: 'absolute',
    top: 24,
    left: 24,
  },
  statusView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    position: 'absolute',
    right: 0,
    ...Theme.center,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
