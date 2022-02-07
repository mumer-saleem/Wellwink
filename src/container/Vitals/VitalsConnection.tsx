import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import { useTheme } from 'configs/ChangeTheme'
import { AVATAR } from 'images/Avatar';
import { useAppDispatch, useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import Container from 'elements/Layout/Container';
import { ICON } from 'images/Icon';
import keyExtractor from 'utils/keyExtractor';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Layout from 'elements/Layout/Layout';
import AccountItem from 'components/AccountItem';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'
var hex64 = require('hex64');
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import useBackButton from 'hooks/useBackButton';
import { 
  checkBluetoothPermission,
  checkBluetoothAvailability, 
} from 'react-native-google-nearby-messages';
 
const VitalsConnection = memo((props) => {
  const dispatch = useAppDispatch()
  const { navigate, setOptions, goBack } = useNavigation();
  const [isConnected, setIsConnected] = useState(false)
  const [SPo2, setSPo2] = useState<number>(0);
  const [PR, setPR] = useState<number>(0);
  const [highblood, setHighBlood] = useState<number>(0);
  const [lowblood, setLowBlood] = useState<number>(0);
  const [temprature, setTemprature] = useState<number>(0);
  const [glucometerValue, setGlucometerValue] = useState<number>(0);

  const bleManager = new BleManager();
  const [deviceScan, setDeviceScan] = useState(false)
  const [devices, setDevices] = useState<any>()
  const { theme } = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{ flex: 1, backgroundColor: theme.background }} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} onPress={goBackScreen} />
      ),
    });
  }, [setOptions]);

  const _checkPermissions = useCallback(async () => {
    const permission = await checkBluetoothPermission();
    // const available = await checkBluetoothAvailability();
    if(!permission){
      Alert.alert(
        'Bluetooth Permissions:',
        // `Granted: ${permission}, Available: ${available}`,
        `BluetoothPermissions denied`,
  
      );
    }
 
  }, []);


  const stopDeviceScan = () => {
    bleManager.stopDeviceScan()
    setDeviceScan(false)
  }

  const monitorCharacter = async (device: any) => {

    const services = await device.services();
    const characteristics = await services[2].characteristics();
    console.log(characteristics);
    let index:any=getValueIndex()
     device.monitorCharacteristicForService(characteristics[index].serviceUUID, characteristics[index].uuid, (error: any, characteristic: any) => {
       console.log(characteristic,"characteristic");
      if (error) {
        console.log(error.message)
        return
      }
      setIsConnected(true)

      let value = _base64ToArrayBuffer(characteristic.value)
     console.log(value,"valuevaluevalue");
      setDeviceValue(value)
    

    })

  }

  const setDeviceValue=(value:any)=>{

    if(devices.name==='PRT Server'){
      setSPo2(value[4])
      setPR(value[3])
    }  
    else if(devices.name==='T101P��\u0002J�YX'){
        let temp=new Int32Array(value.buffer);
         setTemprature(temp[1]/10)
  
    } 
    else if(devices.name==='Bioland-BPM'){
      value[9]&&setHighBlood(value[9])
      value[11]&& setLowBlood(value[11])
      value[12]&& setPR(value[12])
       } 
       else if(devices.name==='Bioland-BGM'){
        let preciseValue=value[9];
          preciseValue=  (preciseValue/18).toFixed(1);
          preciseValue&& setGlucometerValue(preciseValue)
   
         } 
  
 

  }


  const getValueIndex=()=>{
    if(devices.name==='PRT Server') return 1;
    else if(devices.name==='T101P��\u0002J�YX') return 0
    else if(devices.name==='Bioland-BPM') return 1
    else if(devices.name==='Bioland-BGM') return 1


  
  }

  useBackButton(() => {
    stopDeviceScan()
    bleManager.destroy()
    goBack()
    return true;
  })

  const goBackScreen = () => {
    stopDeviceScan()
    bleManager.destroy()
    goBack()
  }



  const startDeviceScan = () => {
  let  deviceName:any=props?.route.params.deviceName
    bleManager.startDeviceScan(null, null, async (error, device: any) => {

 
      if (error) {

        console.error(error, "errorerrorerror")

      }

      else if (device.name === deviceName) {

        stopDeviceScan()

        setDevices(device)

      }

      // else if (device.name ===deviceName) {

      //   stopDeviceScan()

      //   setDevices(device)

      // }
      // else if (device.name === deviceName) {

      //   stopDeviceScan()

      //   setDevices(device)

      // }



    });

  }


  const startConnecting = () => {
    devices.connect().then((device: any) => {
       return device.discoverAllServicesAndCharacteristics()

     }).then(async(device:any) => {
       
       monitorCharacter(device)
    })
      .catch((error: any) => {
        setIsConnected(false)
        console.log(error, "Handle errors");
        // Handle errors
      });


  }



  useEffect(() => {
    
     setDevices([])
    setDeviceScan(true)
    const subscription = bleManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        startDeviceScan()
        subscription.remove();
      }
      else if (state === 'PoweredOff') {
        Alert.alert("Please turn on your bluetooth")
      }
    }, true);

  }, [])


  
  useEffect(() => {
    console.log('useEffect', devices)
  }, [devices])

  const _base64ToArrayBuffer = (base_64: any) => {
    var binary_string =base64.decode(base_64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
 
  return (
    <Container style={styles.container} isVisible={deviceScan} >




      <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>{deviceScan ? "Searching Your Device..." : devices?.name}</Text>

      {!isConnected && !deviceScan &&
        <ButtonLinear
          white
          title={'Connect'}
          onPress={startConnecting}
          style={styles.buttonLinear}
        />
      }

      {devices?.name === 'PRT Server' && isConnected &&
        <Container style={styles.container} >
          <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>Oximeter</Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>SPO2 {SPo2} </Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>PR {PR} </Text>
          <ButtonLinear
            white
            title={'Refresh'}
            onPress={startConnecting}
            style={styles.buttonLinear}
          />
        </Container>
      }
         {devices?.name === 'T101P��\u0002J�YX' && isConnected &&
        <Container style={styles.container} > 
           <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>Thermometer</Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>temprature {temprature} C </Text>
          <ButtonLinear
            white
            title={'Refresh'}
            onPress={startConnecting}
            style={styles.buttonLinear}
          />
        </Container>
      }
       {devices?.name === 'Bioland-BPM' && isConnected &&
        <Container style={styles.container} > 
         <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>Blood Pressure Monitor</Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>High value {highblood} </Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>Low value {lowblood} </Text> 
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>PR {PR} </Text> 

          <ButtonLinear
            white
            title={'Refresh'}
            onPress={startConnecting}
            style={styles.buttonLinear}
          />
        </Container>
      }
      {devices?.name === 'Bioland-BGM' && isConnected &&
        <Container style={styles.container} > 
         <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>GlucoMonitor</Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>{glucometerValue} mmol/L</Text> 

          <ButtonLinear
            white
            title={'Refresh'}
            onPress={startConnecting}
            style={styles.buttonLinear}
          />
        </Container>
      }
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
  buttonLinear: {
    marginTop: scale(24),
  },
});
 
// import React, {useState, useCallback, useEffect} from 'react';
// import {StyleSheet, Text, View, Alert} from 'react-native';
// import {
//   connect,
//   publish,
//   subscribe,
//   checkBluetoothPermission,
//   checkBluetoothAvailability,
//   useNearbyErrorCallback,
//   disconnect,
// } from 'react-native-google-nearby-messages';
 
// const API_KEY = '<yourapikey>';

// export default function App() {
//   const [nearbyMessage, setNearbyMessage] = useState('');

//   useNearbyErrorCallback(
//     useCallback((kind, message) => {
//       Alert.alert(kind, message);
//     }, []),
//   );

//   const _connect = useCallback(async () => {
//     console.log('Connecting...');
//     await connect({
//       apiKey: "AIzaSyAaZeuZOGl5Pirp7CYyfjz8Ag88v-XKDO8",
//       discoveryModes: ['broadcast', 'scan'],
//       discoveryMediums: ['ble'],
//     });
//     console.log('Connected!');
//     return () => disconnect();
//   }, []);
 
//   const _subscribe = useCallback(async () => {
//     console.log('Subscribing...');
//     await subscribe(
//       (m) => {
//         console.log(m,"hybgygiuyghiuyg");
//         setNearbyMessage(m);
//         console.log(`Found: ${JSON.stringify(m)}`);
//       },
//       (m) => { 
//         setNearbyMessage('');
//         console.log(`Lost: ${JSON.stringify(m)}`);
//       },
//     );
//     console.log('Subscribed!');
//   }, []);
//   const _checkPermissions = useCallback(async () => {
//     const permission = await checkBluetoothPermission();
//     const available = await checkBluetoothAvailability();
//     Alert.alert(
//       'Bluetooth Permissions:',
//       `Granted: ${permission}, Available: ${available}`,
//     );
//   }, []);

//   useEffect(() => {
//     const start = async () => {
//       try {
//         await _checkPermissions();
//         await _connect();
//         await _subscribe();
//        } catch (e) {
//         Alert.alert(
//           'Unknown error occured while connecting!',
//           JSON.stringify(e.message ?? e,"hbvuvv"),
//         );
//       }
//     };

//     start();
//     return () => disconnect();
//   }, [_connect, _subscribe, _checkPermissions]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>☆GoogleNearbyMessages example☆</Text>
//       <Text style={styles.welcome}>Nearby Message:</Text>
//       <Text style={styles.instructions}>{nearbyMessage}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
 