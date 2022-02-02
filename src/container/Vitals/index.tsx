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
import keyExtractor from 'utils/keyExtractor';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Layout from 'elements/Layout/Layout';
import AccountItem from 'components/AccountItem';
 
const VitalsList = [
 
  {
    id: 0,
    icon: ICON.clinicVital,
    name: 'Oximeter',
    deviceName: 'PRT Server',

    // route: Routes.VitalsConnection,
  },
  {
    id: 1,
    icon: ICON.clinicVital,
    name: 'Thermometer',
    deviceName: 'T101P��\u0002J�YX',
    // route: Routes.VitalsConnection,
   },
  {
    id: 2,
    icon: ICON.clinicVital,
    name: 'Blood Pressure Monitor',
    deviceName: 'Bioland-BPM',

    // route: Routes.VitalsConnection,
   },
  {
    id: 3,
    icon: ICON.clinicVital,
    name: 'Bioland-BGM',
    deviceName: 'Bioland-BGM',
    // route: '',
   },
 
];


const Vitals = memo(() => {
  const dispatch = useAppDispatch()
 
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
   navigate(Routes.VitalsConnection,{"deviceName":item?.deviceName});
   
 
  }, []);


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
