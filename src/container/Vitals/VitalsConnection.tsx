import React, {memo, useLayoutEffect,useEffect,useCallback,useState} from 'react';
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
import { BleManager } from 'react-native-ble-plx';

 


const VitalsConnection = memo(() => {
  const dispatch = useAppDispatch()
 
  const {navigate, setOptions} = useNavigation();
  const [isConnected, setIsConnected] = useState<string>('Trying to connect with Oximeter');
  const [SPo2, setSPo2] = useState<string>('');
  const [PR, setPR] = useState<string>('');
  const bleManager = new BleManager();
  const [deviceScan, setDeviceScan] = useState(false)
  const [devices, setDevices] = useState([])
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

  const stopDeviceScan = () => {
    bleManager.stopDeviceScan()
     setDeviceScan(false)
 }

 const addDevice =async (device:any) => {

           const services = await device.services();
          const characteristics = await services[2].characteristics();

        device.monitorCharacteristicForService(characteristics[1].serviceUUID, characteristics[1].uuid, (error:any, characteristic:any) => {
          if (error) {
            console.log(error.message)
            return
          }
          console.log(characteristic,"monitorCharacteristicForService")
        })

  }
 const startDeviceScan = () => {
     bleManager.startDeviceScan(null, null,async(error, device:any) => {
       
     if (error) {
       console.error(error,"errorerrorerror")
   } else {
        // addDevice(device)
       if (device.name === 'PRT Server' ) {
         stopDeviceScan()
         console.log(device,"devicedevice");
         device.connect()
            .then((device:any) => {
             return device.discoverAllServicesAndCharacteristics()
          })
         .then(async(device:any) => {
            addDevice(device)
 })
 .catch((error:any) => {
   console.log(error,"Handle errors");
     // Handle errors
 });


   }
   }
 });
}


 

useEffect(() => {
 // console.trace('Init - Timer')
 console.log('Init - Timer')
 let timerId = setTimeout(() => {
     stopDeviceScan()
 }, 15000)
 return () => clearTimeout(timerId);
}, [])

useEffect(() => {

 setDevices([])
 setDeviceScan(true)
 const subscription = bleManager.onStateChange((state) => {
    if (state === 'PoweredOn') {
     startDeviceScan()
     subscription.remove();
   }
}, true);

}, [])

useEffect(() =>{
 console.log('useEffect',devices)
},[devices])



 
  return (
    <Container style={styles.container}   >
      <Text size={24}  lineHeight={28} bold  marginBottom={scale(8)}  marginTop={scale(24)}>Oximeter connection </Text>
      <Text size={15}  lineHeight={28} bold  marginBottom={scale(8)}  marginTop={scale(24)}>{isConnected}</Text>
      <Text size={14}  lineHeight={28} bold  marginBottom={scale(8)}  marginTop={scale(24)}>SPO2 {SPo2} </Text>
      <Text size={14}  lineHeight={28} bold  marginBottom={scale(8)}  marginTop={scale(24)}>PR {PR} </Text>
    </Container>
  );
});

export default VitalsConnection;

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
