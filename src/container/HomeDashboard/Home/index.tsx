import React, {memo, useState, useCallback,useEffect} from 'react';
import {View, StyleSheet, ScrollView,AppState} from 'react-native';
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
import {SubscribeVideoChannle,UnSubscribeVideoChannle} from 'Services/ActionCable/subscribeCannels';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import {GetVideoCallPermissions} from 'utils';

interface HomeProps {}

const Home = memo((props: HomeProps) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) =>state.profile.data?.patient)
  const [searchKey, setSearchKey] = useState('');
  const [appState, setAppState] = React.useState(AppState.currentState)

  const {navigate} = useNavigation();
  
  const onTodayTask = useCallback(() => {
    navigate(Routes.TodayTask);
  }, [navigate]);

 


  useEffect(() => {
    GetVideoCallPermissions()
    SubscribeVideoChannle(profile?.userId,navigate);
    return () => {
      UnSubscribeVideoChannle()       
    }
 

  }, [profile?.userId])

//   useEffect(() => {
//     AppState.addEventListener('change', handleAppStateChange)

//     setAppState(AppState.currentState)

//     return AppState.removeEventListener('change')
// },[])
//   const handleAppStateChange = newState => {
//     console.log(AppState.currentState)

//     if (appState.match(/inactive|background/) && newState === 'active') {
//       console.log(AppState.currentState,'App has come to the foreground!')
//       // Show the splash screen
//      } else {
//       console.log(AppState.currentState,'App has gone to the background!')
//       // do something in background
//     }

//     setAppState(newState)
// }


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

