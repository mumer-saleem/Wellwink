import React, {memo, useLayoutEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Text from '../../../elements/Text';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {Colors} from '../../../configs';
import {useNavigation} from '@react-navigation/native';
import ButtonText from '../../../elements/Buttons/ButtonText';
import Theme from '../../../style/Theme';
import {height} from '../../../configs/Const';
import {ICON} from '../../../images/Icon';
import {useTheme} from '../../../configs/ChangeTheme'
import Container from '../../../elements/Layout/Container';

export const SOCIAL_MEDIA = [
  {id: 0, name: 'facebook', icon: 'facebook', color: Colors.bDazzledBlue},
  {
    id: 1,
    name: 'instagram',
    icon: 'instagram',
    color: Colors.DarkJungleGreen,
  },
  {id: 2, name: 'twitter', icon: 'twitter', color: Colors.MediumTurquoise},
  {id: 3, name: 'message', icon: 'message', color: Colors.RedNeonFuchsia},
];

export default memo(() => {
  const {setOptions, navigate} = useNavigation();
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {height: 0},
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <Text bold size={24} marginTop={24} marginBottom={40}>
        $15 for Your Friends!
      </Text>
      <Text marginBottom={24} lineHeight={22}>
        Your friends can just enter promotion code in checkout to get $15.e
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.refCode, {backgroundColor: theme.backgroundItem}]}>
        <Text bold size={15}>
          REF249202
        </Text>
        <ButtonText title="Copy" />
      </TouchableOpacity>
      <Text marginVertical={32}>or share this link:</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.refCode, {backgroundColor: theme.backgroundItem}]}>
        <Text>doctorplus.com/referral/u2492022</Text>
        <ButtonText title="Copied" textProps={{color: Colors.Jade}} />
      </TouchableOpacity>
      <Text marginBottom={10} marginTop={32}>
        Share Via
      </Text>
      <View style={Theme.flexRowCenter}>
        {SOCIAL_MEDIA.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.54}
              key={index}
              style={[styles.socialMedia, {backgroundColor: item.color}]}>
              <Image source={ICON[`${item.icon}`]} tintColor={Colors.White} />
            </TouchableOpacity>
          );
        })}
      </View>
      <Text marginTop={4}>
        You'll see a preview before anything is posted. Please only share the
        offer with friends you know would be happy to receive it.
      </Text>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: height,
  },
  refCode: {
    borderRadius: 8,
    height: 48,
    ...Theme.flexRowSpace,
    paddingHorizontal: 16,
  },
  socialMedia: {
    width: 40,
    height: 40,
    ...Theme.center,
    margin: 12,
    borderRadius: 12,
  },
});
