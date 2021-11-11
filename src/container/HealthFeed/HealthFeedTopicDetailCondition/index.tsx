import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Text from '../../../elements/Text';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../configs';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import Theme from '../../../style/Theme';
import {ICON} from '../../../images/Icon';
import useModalAnimation from '../../../hooks/useModalAnimation';
import ModalSlideBottom from '../../../components/ModalSlideBottom';
import ForWhoItem from '../../../components/ForWhoItem';
import {DATA_PERSON, HEALTH_FEED_CONDITION_AND_SYMTOMS} from '../../../configs/Data';
import ButtonBorder from '../../../elements/Buttons/ButtonBorder';
import ButtonLinear from '../../../elements/Buttons/ButtonLinear';
import {useTheme} from '../../../configs/ChangeTheme';

import Container from '../../../elements/Layout/Container';
import Content from '../../../elements/Layout/Content';
import Layout from '../../../elements/Layout/Layout';
import Line from '../../../elements/Layout/Line';
export default memo(() => {
  const {setOptions} = useNavigation();
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
      headerRight: () => <Layout style={{marginRight: 24}} />,
      headerTitle: () => (
        <Text size={17} lineHeight={20} center bold>
          Conditions & Symptoms
        </Text>
      ),
    });
  });
  const {visible, open, close, transY} = useModalAnimation();
  const [conditionList, setConditionList] = useState(
    HEALTH_FEED_CONDITION_AND_SYMTOMS,
  );
  const [pressedItem, setPressedItem] = useState(conditionList[0]);
  const onJustFollow = () => {
    close();
  };
  const onButtonOK = () => {
    close();
  };
  return (
    <Container style={styles.container}>
      <Content
        scrollEventThrottle={16}
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}>
        {conditionList.map((item, index) => {
          const {id, title, isFollow} = item;
          const [_isFollow, setIsFollow] = useState(false);
          const onPressUnfollow = () => {
            setIsFollow(false);
          };
          const onPressFollow = () => {
            setIsFollow(true);
            open();
          };
          return (
            <View>
              <TouchableOpacity
                key={index}
                style={styles.content}
                activeOpacity={0.54}
                onPress={_isFollow ? onPressUnfollow : onPressFollow}>
                <Text
                  semiBold
                  size={15}
                  lineHeight={24}
                  color={Colors.DodgerBlue}
                  maxWidth={240}>
                  {title}
                </Text>
                <View
                  style={[
                    styles.icon,
                    {
                      backgroundColor: _isFollow
                        ? Colors.DodgerBlue
                        : Colors.Platinum,
                    },
                  ]}>
                  {_isFollow ? (
                    <Image
                      source={ICON.followed}
                      style={{tintColor: Colors.White}}
                    />
                  ) : (
                    <Image
                      source={ICON.follow}
                      style={{tintColor: Colors.GrayBorder4}}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Line />
            </View>
          );
        })}
      </Content>
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSlideBottom onClose={close} transY={transY}>
          <ForWhoItem dataPerson={DATA_PERSON} />
          <View style={styles.footer}>
            <ButtonBorder
              borderColor={theme.borderColor}
              style={styles.justFollow}
              title="Just Follow"
              color={Colors.GrayBlue}
              onPress={onJustFollow}
            />
            <ButtonLinear
              white
              style={styles.buttonOK}
              title="OK"
              onPress={onButtonOK}
            />
          </View>
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  view: {
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  content: {
    ...Theme.flexRowSpace,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  icon: {
    ...Theme.center,
    borderRadius: 12,
    width: 40,
    height: 40,
  },
  footer: {
    ...Theme.flexRowSpace,
    padding: 24,
  },
  justFollow: {
    width: 155,
  },
  buttonOK: {
    width: 155,
  },
});
