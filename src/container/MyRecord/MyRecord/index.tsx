import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Animated, {Value, event, set} from 'react-native-reanimated';
import Text from 'elements/Text';
import {View, StyleSheet, FlatList, Modal, Platform, Image} from 'react-native';
import {Colors, Routes} from 'configs';
import AccountItem from 'components/AccountItem';
import {ICON} from 'images/Icon';
import {useFocusEffect} from '@react-navigation/native';
import keyExtractor from 'utils/keyExtractor';
import {AVATAR} from 'images/Avatar';
import Theme from 'style/Theme';
import {width} from 'configs/Const';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SyncHealth from 'components/SyncHealth';
import ModalSlideBottom from 'components/ModalSlideBottom';
import ModalChangeHealthData from 'components/ModalChangeHealthData';
import {LIST_HEALTH_DATA} from 'configs/Data';
import useModalAnimation from 'hooks/useModalAnimation';
import ModalProcess from 'components/ModalProcess';
import ImportSuccessful from 'components/BookAppointment/ImportSuccessful';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import MyRecordProgressBar from 'components/MyRecord/MyRecordProgressBar';
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';
import ProfileHeader from 'elements/Headers/profileHeader';

const PROFILE = [
  {
    id: 0,
    name: 'Nora Shelton',
    avatar: AVATAR.avatar2,
    progress: 78,
  },
  {
    id: 1,
    name: 'Devin Shelton',
    avatar: AVATAR.avatar3,
    progress: 28,
  },
  {
    id: 2,
    name: 'Other Shelton',
    avatar: AVATAR.avatar7,
    progress: 44,
  },
  {
    id: 3,
    name: 'Another Shelton',
    avatar: AVATAR.avatar6,
    progress: 82,
  },
  {
    id: 4,
    name: 'Last Shelton',
    avatar: AVATAR.avatar5,
    progress: 100,
  },
  {
    id: 5,
    name: 'Another Shelton',
    avatar: AVATAR.avatar4,
    progress: 100,
  },
  {
    id: 8,
    name: 'Another Shelton',
    avatar: AVATAR.avatar4,
    progress: 100,
  },
  {
    id: 6,
    name: 'Another Shelton',
    avatar: AVATAR.avatar4,
    progress: 100,
  },
  {
    id: 7,
    name: 'Another Shelton',
    avatar: AVATAR.avatar3,
    progress: 100,
  },
];

const MY_RECORD_CATEGORY = [
 
    {
      id: 0,
      icon: ICON.healthMetric,
      name: 'Problems',
       number: '2',
    },
    {
      id: 1,
      icon: ICON.medication,
      name: 'Medications',
      route: '',
      number: '2',
    },
    {
      id: 2,
      icon: ICON.allergies,
      name: 'Allergies',
      route: '',
      number: '2',
    },
    {
      id: 3,
      icon: ICON.clinicVital,
      name: 'Vitals',
      route: '',
      number: '2',
    },
  // {
  //   id: 0,
  //   icon: ICON.additionalInformation,
  //   name: 'Basic Information',
  //   route: Routes.MyRecordBasicInformation,
  // },
  // {
  //   id: 1,
  //   icon: ICON.healthMetric,
  //   name: 'Problems',
  //   route: Routes.MyRecordHealthMetric,
  //   number: '2',
  // },
  // {
  //   id: 2,
  //   icon: ICON.condition,
  //   name: 'Conditions & Symptoms',
  //   route: Routes.MyRecordCondition,
  //   number: '2',
  // },
  // {
  //   id: 3,
  //   icon: ICON.clinicVital,
  //   name: 'Clinical Vitals',
  //   route: '',
  //   number: '2',
  // },

  // {
  //   id: 4,
  //   icon: ICON.allergies,
  //   name: 'Allergies',
  //   route: '',
  //   number: '2',
  // },
  // {
  //   id: 5,
  //   icon: ICON.vaccination,
  //   name: 'Immunization',
  //   route: '',
  //   number: '2',
  // },
  // {
  //   id: 6,
  //   icon: ICON.labTest,
  //   name: 'Lab Results',
  //   route: '',
  //   number: '2',
  // },
  // {
  //   id: 7,
  //   icon: ICON.medication,
  //   name: 'Medications',
  //   route: '',
  //   number: '2',
  // },
  // {
  //   id: 8,
  //   icon: ICON.procedure,
  //   name: 'Procedures',
  //   route: '',
  //   number: '2',
  // },
];

export default memo(() => {
  const [myRecord, setMyRecord] = useState<any>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [index, setIndex] = useState<any>();

  const profileRef = useRef<FlatList>(null);

  const [healthData, setHealthData] = useState<any>();
  const {visible, open, close, transY} = useModalAnimation();

  const {
    visible: processVisible,
    open: processOpen,
    close: processClose,
    transY: processTransY,
  } = useModalAnimation();

  const scrollX = React.useRef(new Value(0)).current;

  const opacityAnim = scrollX.interpolate({
    inputRange: [0, width / 2, width],
    outputRange: [1, 0, 0],
  });

  const opacity = {opacity: opacityAnim};

  useFocusEffect(
    useCallback(() => {
      setMyRecord(MY_RECORD_CATEGORY);
    }, []),
  );

  
  const onPressPrevProfile = useCallback(() => {
    profileRef.current?.scrollToIndex({
      viewPosition: 0.5,
      index: currentIndex - 1,
      animated: true,
    });
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const onPressNextProfile = useCallback(() => {
    profileRef.current?.scrollToIndex({
      viewPosition: 0.5,
      index: currentIndex + 1,
      animated: true,
    });
    // setCurrentIndex(currentIndex + 1);
  }, [currentIndex]);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const healthOpen = () => {
    open();
  };

  const onPressHealthData = useCallback(() => {
    close();
    processOpen();
    setHealthData(LIST_HEALTH_DATA[0]);
  }, []);

  const onCloseHealth = useCallback(() => {
    setHealthData(null);
  }, [healthData]);

  const renderData = [{id: 0}, {id: 1, data: myRecord}, {id: 2}];

  const renderItem = useCallback(({item}) => {
    const {id, data} = item;
    if (id === 1) {
      return (
        <Layout style={styles.content}>
          {data.map((item: any, index: any) => {
            return <AccountItem key={index} {...item} />;
          })}
        </Layout>
      );
    } else return <View />;
  }, []);

  const renderHeaderItem = useCallback(
    ({item}) => {
      return (
        <Animated.Image
          style={[
            opacity,
            {
              opacity: item.id == currentIndex ? 1 : 0.5,
              width: 110,
              height: 110,
              marginHorizontal: 20,
            },
          ]}
          source={item.avatar}
        />
      );
    },
    [currentIndex],
  );

  const getHeaderItemLayout = (data: any, index: number) => ({
    length: 150,
    offset: 150 * index,
    index,
  });

  const listHeaderComponent = () => {
    return (
      <>
        <FlatList
          ref={profileRef}
          data={PROFILE}
          renderItem={renderHeaderItem}
          horizontal
          getItemLayout={getHeaderItemLayout}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: width / 2 - 99,
          }}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
        />
        <Layout style={styles.profile}>
          <ButtonIcon
            borderRadius={8}
            icon="arrowLeft"
            tintColor={Colors.White}
            disabled={currentIndex == 0}
            onPress={onPressPrevProfile}
            marginLeft={8}
          />
          <View>
            <Text bold center size={17} lineHeight={20} marginBottom={16}>
              {PROFILE[currentIndex].name}
            </Text>
            <MyRecordProgressBar percent={PROFILE[currentIndex].progress} />
          </View>
          <ButtonIcon
            borderRadius={8}
            icon="arrowRight"
            tintColor={Colors.White}
            disabled={currentIndex == PROFILE.length - 1}
            onPress={onPressNextProfile}
            marginRight={8}
          />
        </Layout>
      </>
    );
  };
  const listFooterComponent = () => {
    return (
      <Layout style={styles.listFooter}>
        <SyncHealth
          healthData={healthData}
          onOpenHealthModal={healthOpen}
          onCloseHealth={onCloseHealth}
        />
        <Text
          marginHorizontal={48}
          marginTop={24}
          size={11}
          lineHeight={14}
          center>
          Last synced: 13:29 PM Jan 04, 2020
        </Text>
        <Text size={11} lineHeight={14} center>
          from Apple Health
        </Text>
      </Layout>
    );
  };

  return (
    <>
   <Container style={styles.container}>
      
    <ProfileHeader/>
   <Text size={24} bold marginTop={20} marginBottom={20}  marginLeft={24}>
          My Records
   </Text>
        
        <FlatList
          keyExtractor={keyExtractor}
          data={renderData}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          // ListHeaderComponent={listHeaderComponent}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
        />
      </Container>
      <Layout style={{backgroundColor: 'red'}}>
        <Modal visible={visible} onRequestClose={close} transparent>
          <ModalSlideBottom onClose={close} transY={transY}>
            <ModalChangeHealthData
              healthData={LIST_HEALTH_DATA}
              onChange={onPressHealthData}
            />
          </ModalSlideBottom>
        </Modal>
      </Layout>
      <Layout style={{backgroundColor: 'red'}}>
        <Modal
          visible={processVisible}
          onRequestClose={processClose}
          transparent>
          <ModalProcess onClose={processClose} transY={processTransY}>
            <ImportSuccessful />
          </ModalProcess>
        </Modal>
      </Layout>
    </>
  );
});
const styles = StyleSheet.create({
  container: {},
  content: {
    borderRadius: 16,
    paddingVertical: 8,
    marginHorizontal: 24,
  },
  profile: {
    ...Theme.flexRowSpace,
    marginTop: 34,
    marginBottom: 40,
    borderRadius: 16,
    marginHorizontal: 24,
  },
  flatList: {
    borderRadius: 12,
    paddingBottom: 180 + getBottomSpace(),
  },
  listFooter: {
    padding: 24,
    paddingBottom: 31,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 24,
  },
});
