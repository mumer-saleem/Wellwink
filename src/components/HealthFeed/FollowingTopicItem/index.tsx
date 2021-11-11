import React, {memo, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Text from 'elements/Text';
import {ICON} from 'images/Icon';
import {Colors, Routes} from 'configs';
import Theme from 'style/Theme';
import {width} from 'configs/Const';
import {useNavigation} from '@react-navigation/native';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';
import Line from 'elements/Layout/Line';

interface FollowingTopicItemProps {}

const FollowingTopicItem = memo((data: any) => {
  const {navigate} = useNavigation();
  const {
    doctor,
    img,
    topicType,
    topicName,
    numberOfAnswers,
    action,
    detail,
    link,
    numberOfThanks,
    numberOfShares,
  } = data.item;
  const {avatar, name} = doctor;

  let route: string;

  switch (topicType) {
    case 'Health Tip':
      route = Routes.HealthFeedTipsDetail;
      break;
    case 'Health Question':
      route = Routes.HealthFeedQuestionDetail;
      break;
    case 'Health Article':
      route = Routes.HealthFeed;
      break;
    case 'Health Guide':
      route = Routes.HealthFeed;
      break;
  }

  const onPress = useCallback(() => {
    navigate(route, data.item);
  }, []);
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.54}
      style={[styles.container, {backgroundColor: theme.backgroundItem}]}
      onPress={onPress}>
      <Layout style={styles.header}>
        <Text size={13} lineHeight={16} marginBottom={4}>
          {topicType}
        </Text>
        <Text semiBold size={17} lineHeight={25} marginBottom={12}>
          {topicName}
        </Text>
        {numberOfAnswers != undefined ? (
          <Layout style={Theme.flexRow}>
            <Image source={ICON.doctorAnswer} />
            <Text bold size={13} lineHeight={16} marginLeft={8} marginRight={4}>
              {numberOfAnswers}
            </Text>
            <Text size={13} lineHeight={16}>
              doctors answered
            </Text>
          </Layout>
        ) : (
          <Layout />
        )}
      </Layout>
      <Line />

      <Layout style={styles.content}>
        <Layout style={Theme.flexRow}>
          <Image style={styles.avatar} source={avatar} />
          <Text
            bold
            size={13}
            lineHeight={16}
            color={Colors.DodgerBlue}
            marginLeft={12}
            marginRight={4}>
            Dr. {name}
          </Text>
          <Text size={13} lineHeight={16}>
            {action}
          </Text>
        </Layout>
        <TouchableOpacity>
          <Image source={ICON.option} />
        </TouchableOpacity>
      </Layout>
      <Image source={img} style={styles.image} />
      <Text marginVertical={12} size={13} lineHeight={22} marginHorizontal={16}>
        {detail}
      </Text>
      {link != undefined ? (
        <Text
          color={Colors.GrayBlue}
          size={13}
          lineHeight={16}
          marginLeft={16}
          marginBottom={12}>
          {link}
        </Text>
      ) : (
        <Layout />
      )}
      <Layout style={Theme.flexRow}>
        {numberOfThanks != 0 ? (
          <Text
            size={13}
            lineHeight={16}
            color={Colors.GrayBlue}
            marginRight={24}
            marginLeft={16}>
            {numberOfThanks} Thanks
          </Text>
        ) : (
          <Layout />
        )}
        {numberOfShares != 0 ? (
          <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
            {numberOfShares} Shares
          </Text>
        ) : (
          <Layout />
        )}
      </Layout>
    </TouchableOpacity>
  );
});

export default FollowingTopicItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  header: {
    paddingLeft: 16,
    paddingBottom: 12,
    
  },
  content: {
    ...Theme.flexRowSpace,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    width: width - 48,
    height: 170,
  },
});
