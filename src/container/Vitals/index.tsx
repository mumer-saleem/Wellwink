import React, {memo, useLayoutEffect,useEffect,useCallback} from 'react';
import {View, StyleSheet, FlatList,Alert} from 'react-native';
import Text from 'elements/Text'; 
import scale from 'utils/scale';
 
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {useTheme} from 'configs/ChangeTheme'
import {AVATAR} from 'images/Avatar';
import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import Container from 'elements/Layout/Container';
import {ICON} from 'images/Icon';
import {IMAGE} from 'images/Image';

import keyExtractor from 'utils/keyExtractor';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Layout from 'elements/Layout/Layout';
import AccountItem from 'components/AccountItem';
import {vitalsListsAction} from 'Actions/Vitals';

 
const VitalsList = [
  {
    id: 0,
    icon: ICON.oxi,
    name: 'Oximeter',
    deviceName: 'PRT Server',
    deviceImage: IMAGE.oximeter, 
    description:"Remove any jewelry or fingernail polish on your finger if measuring from this location.Make sure your hand is warm, relaxed, and below heart level if attaching the device here.Place the device on your finger, earlobe, or toe.Keep the device on for as long as needed to monitor your pulse and oxygen saturation.Remove the device once the test is over."
  },
  {
    id: 1,
    icon: ICON.temp,
    name: 'Thermometer',
    deviceName: 'T101P��\u0002J�YX',
    deviceImage: IMAGE.thermo, 
    description:"The first step to using a non-contact infrared thermometer is to evaluate your testing environment - it should be free of air drafts, out of direct sun, and away from radiant heat sources. The environmental temperature should be in line with the specifications in the manual for your thermometer. Best practice is to leave your thermometer in the testing environment for at least ten minutes prior to use so it can adjust to the environment."


   },
  {
    id: 2,
    icon: ICON.bp,
    name: 'Blood Pressure Monitor',
    deviceName: 'Bioland-BPM', 
    deviceImage: IMAGE.bp, 
    description:"Push a Button Measurement with Fuzzy Logic Function Measurement Range 0 - 300mmHg, Pulse Rate 40 - 200/Minute Accuracy: Blood Pressure +/- 3 mmHg, Pulse +/- 5% Inflation/Deflation by Microcontroller Electric Pump System Large LCD Display Date/Time Clock, Systolic and Diastolic Pressure Level in One Display. 128 Automatic Memories Oscillometric Measuring Method Traveling Case for Unit Storage and Wrist-Pillow When Measurement Power Source: (AAA) x 2 Batteries(Included) Size/Weight - 77x72x38mm/140g (included battery)"


 
   },
  {
    id: 3,
    icon: ICON.gluco,
    name: 'Bioland-BGM',
    deviceName: 'Bioland-BGM',
    deviceImage: IMAGE.BGM, 
    description:"Push a Button Measurement with Fuzzy Logic Function Measurement Range 0 - 300mmHg, Pulse Rate 40 - 200/Minute Accuracy: Blood Pressure +/- 3 mmHg, Pulse +/- 5% Inflation/Deflation by Microcontroller Electric Pump System Large LCD Display Date/Time Clock, Systolic and Diastolic Pressure Level in One Display. 128 Automatic Memories Oscillometric Measuring Method Traveling Case for Unit Storage and Wrist-Pillow When Measurement Power Source: (AAA) x 2 Batteries(Included) Size/Weight - 77x72x38mm/140g (included battery)"

    
   },
   {
    id: 4,
    icon: ICON.bodyScale,
    name: 'Body Scale',
    deviceName: 'Body Scale',
    deviceImage: IMAGE.oximeter, 
    description:""

    
   },
];


const Vitals = memo(() => {
  const dispatch = useAppDispatch()
  const profileInfo=useAppSelector((state)=>state.profile.data?.patient);

  const {navigate, setOptions,} = useNavigation();
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{flex: 1, backgroundColor: theme.background}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

  const renderItem = useCallback(({item}) => {
    const {id, data} = item;
    if (id === 1) {
      return (
        <Layout style={styles.content}>
          {data.map((item: any, index: any) => {
            return <AccountItem key={index} {...item} onPress={()=>moveConnectionScreen(item)} />;
          })}
        </Layout>
      );
    } else return <View />;
  }, []);

  const moveConnectionScreen = useCallback((item) => {
   navigate(Routes.VitalsConnection,{"device":item});
   
 
  }, []);

  const getVitalsList = useCallback(() => {
    dispatch(vitalsListsAction(profileInfo?.profileAbleID))
    }, []);


    useEffect(() => {
      getVitalsList()
 
   }, [])

  const renderData = [{id: 0}, {id: 1, data: VitalsList}, {id: 2}];

  return (
    <Container style={styles.container}   >
      <Text
        size={24}
        lineHeight={28}
        bold
        marginBottom={scale(8)}
        marginTop={scale(24)}>
      Vitals List
      </Text>
      <FlatList
          keyExtractor={keyExtractor}
          data={renderData}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={renderItem}
         />
  
    </Container>
  );
});

export default Vitals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  flatList: {
    borderRadius: 12,
    paddingBottom: 180 + getBottomSpace(),
  },
  content: {
    borderRadius: 16,
    paddingVertical: 8,
   },
});
