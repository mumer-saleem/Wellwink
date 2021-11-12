import React, {memo, useCallback, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Colors} from '../../../configs';
import scale from '../../../utils/scale';
import TaskstForToday from '../../../components/Home/TasksForToday';
import TodayTasksItem from '../../../components/TodayTasks/TodayTaskItem';
import keyExtractor from '../../../utils/keyExtractor';
import TodayTasksLoading from '../TodayTaskLoading';
import {TodayTaskFakeData} from '../../../configs/Data';
import {Tasks} from '../../../type/tasks';
import TodayTasksEmpty from '../TodayTaskEmpty';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from '../../../elements/Buttons/ButtonIconHeader';
import {useTheme} from '../../../configs/ChangeTheme';
import Layout from '../../../elements/Layout/Layout';
import Container from '../../../elements/Layout/Container';

const TodayTasks = memo(({route}: any) => {
  const [data, setData] = useState<Array<Tasks>>(TodayTaskFakeData);
  const [loading, setLoading] = useState(false);
  const {setOptions} = useNavigation();
  React.useEffect(() => {
    let dataTemp: Array<Tasks> = [];
    data.map(item => {
      if (item.id != route.params?.id) {
        dataTemp.push(item);
      } else {
        dataTemp.push({
          id: item.id,
          content: item.content,
          note: item.note,
          decription: item.decription,
          frequency: item.frequency,
          start_date: item.start_date,
          end_date: item.end_date,
          check: route.params?.check,
        });
      }
    });
    setData(dataTemp);
  }, [route.params?.check, route.params?.id]);
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View
          style={[styles.headerBackGround, {backgroundColor: theme.background}]}
        />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

  const renderItem = useCallback(({item}) => <TodayTasksItem {...item} />, []);
  const listEmptyComponent = () => {
    if (!loading) return <TodayTasksEmpty />;
    return <TodayTasksLoading />;
  };
  const listHeaderComponent = useCallback(() => {
    return (
      <Container
        style={{
          marginBottom: scale(24),
        }}>
        <TaskstForToday step={4} />
      </Container>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={
          data.length !== 0 || loading ? listHeaderComponent : null
        }
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </Container>
  );
});
export default TodayTasks;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(24),
  },
  flatList: {
    marginTop: scale(0),
  },
  headerBackGround: {
    flex: 1,
  },
});
