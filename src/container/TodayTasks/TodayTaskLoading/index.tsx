import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import TodayTasksItemLoading from 'components/TodayTasks/TodayTaskItemLoading';
import Layout from 'elements/Layout/Layout';

const TodayTasksLoading = memo(() => {
  return (
    <Layout style={styles.container}>
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
    </Layout>
  );
});
export default TodayTasksLoading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(24),
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  buttonLinear: {
    marginTop: scale(68),
  },
});
