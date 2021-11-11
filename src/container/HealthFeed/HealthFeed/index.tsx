import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {Colors} from '../../../configs';
import ScrollableTab from '../../../elements/ScrollableTab';
import Text from '../../../elements/Text';
import FollowingQuestions from '../../../components/HealthFeed/FollowingQuestions';
import FollowingTopics from '../../../components/HealthFeed/FollowingTopics';
import Theme from '../../../style/Theme';
import changeAlias from '../../../utils/stringAlias';
import SearchBox from '../../../elements/SearchBox';
import ButtonText from '../../../elements/Buttons/ButtonText';
import keyExtractor from '../../../utils/keyExtractor';
import {FOLLOWING_TOPIC} from '../../../configs/Data';
import {useTheme} from '../../../configs/ChangeTheme';
import Container from '../../../elements/Layout/Container';
import scale from '../../../utils/scale';
import Layout from '../../../elements/Layout/Layout';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {width} from '../../../configs/Const';

const barHeight = getStatusBarHeight();

export default memo(() => {
  const {setOptions} = useNavigation();
  const [indexPage, setIndexPage] = useState<any>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = React.useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const onSearchChange = React.useCallback(
    (text: string) => {
      setSearchKey(text);
      if (text === '' || text === null || text === undefined) {
        setDataSearch([]);
      } else {
        let data = [];
        for (let i = 0; i < FOLLOWING_TOPIC.length; i++) {
          if (
            changeAlias(FOLLOWING_TOPIC[i].topicName).includes(
              changeAlias(text),
            )
          ) {
            data.push(FOLLOWING_TOPIC[i]);
          }
        }
        setDataSearch(data);
      }
    },
    [dataSearch],
  );

  const onSearch = () => {
    setIsSearch(!isSearch);
  };

  const onCancel = () => {
    setIsSearch(!isSearch);
    setSearchKey('');
    setDataSearch([]);
  };

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity style={{marginBottom: 24}}>
        <Text white size={15} lineHeight={18} bold>
          {item.topicName != undefined && item.topicName != null
            ? item.topicName
            : item.question}
        </Text>
      </TouchableOpacity>
    );
  }, []);
  const {theme} = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {height: 0},
        backgroundColor: theme.background,
        elevation: 0,
      },
      headerLeft: () => (
        <>
          {isSearch ? (
            <Layout
              style={{
                flexDirection: 'row',
                paddingBottom: 24,
                width: width,
              }}>
              <SearchBox
                marginTop={barHeight + 24}
                placeholder={'Search topic, question...'}
                value={searchKey}
                onChangeText={onSearchChange}
                style={styles.searchText}
                borderColor={Colors.TiffanyBlue}
                autoFocus={true}
              />
              <ButtonText
                blueLight
                title="Cancel"
                onPress={onCancel}
                style={styles.cancel}
              />
            </Layout>
          ) : (
            <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
          )}
        </>
      ),
      headerRight: () => (
        <>
          {isSearch ? (
            <View></View>
          ) : (
            <View style={Theme.flexRow}>
              <ButtonIconHeader
                icon="search"
                marginRight={24}
                tintColor={Colors.DodgerBlue}
                borderColor={Colors.DodgerBlue}
                onPress={onSearch}
              />
              {indexPage === 1 ? (
                <ButtonIconHeader
                  icon="plus"
                  marginRight={24}
                  tintColor={Colors.DodgerBlue}
                  borderColor={Colors.DodgerBlue}
                />
              ) : (
                <View />
              )}
            </View>
          )}
        </>
      ),
    });
  }, [setOptions, indexPage, isSearch, searchKey]);

  const getIndex = useCallback(
    index => {
      setIndexPage(index);
    },
    [indexPage],
  );

  return (
    <Container style={styles.container}>
      {isSearch ? (
        <FlatList
          data={dataSearch}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.list}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollableTab
          scrollDisable={true}
          getIndex={getIndex}
          titles={['Following Topics', 'Following Questions']}>
          <FollowingTopics />
          <FollowingQuestions />
        </ScrollableTab>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    paddingRight: 88,
    paddingLeft: 24,
    ...Theme.flexRowSpace,
  },
  cancel: {
    marginLeft: 15,
    padding: 10,
    borderWidth: 0,
    marginTop: barHeight + 24,
  },
  searchText: {
    minWidth: 264,
    marginLeft: 24,
    width: scale(263),
    height: scale(48, true),
  },
  searchBox: {
    ...Theme.searchBox,
    marginLeft: 24,
  },
  list: {
    padding: 24,
  },
});
