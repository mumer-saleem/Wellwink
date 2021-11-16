import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors, Routes} from 'configs';
import Greeting from 'components/Home/Greeting';
import SearchBox from 'elements/SearchBox';
import MainControl from 'components/Home/MainControl';
import TasksForToday from 'components/Home/TasksForToday';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useNavigation} from '@react-navigation/native';
import IconNotification from 'components/Home/IconNotification';
import scale from 'utils/scale';
import Layout from 'elements/Layout/Container';
import Theme from 'style/Theme';
import {useTheme} from 'configs/ChangeTheme';

interface HomeProps {}

const Home = memo((props: HomeProps) => {
  const [searchKey, setSearchKey] = useState('');
  const {navigate} = useNavigation();
  const onTodayTask = useCallback(() => {
    navigate(Routes.TodayTask);
  }, [navigate]);
  const {theme} = useTheme();
  return (
    <Layout style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <IconNotification style={styles.notification} />
        <Greeting />
        <View style={styles.searchBox}>
          <SearchBox
            placeholder={'Search health issue, doctor, topic...'}
            value={searchKey}
            onChangeText={setSearchKey}
          />
        </View>
        <TasksForToday step={5} onPress={onTodayTask} />
        <MainControl />
      </ScrollView>
    </Layout>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
    
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 16,
  },
  notification: {
    position: 'absolute',
    top: getStatusBarHeight() + 16,
    right: 24,
    zIndex: 10,
  },
  searchBox: {
    width: scale(327),
    height: scale(48),
    ...Theme.shadow,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(42, true),
    marginBottom: scale(40, true),
  },
});
