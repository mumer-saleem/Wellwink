import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,TouchableOpacity,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale'; 
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import { useTheme } from 'configs/ChangeTheme'
import { AVATAR } from 'images/Avatar';
import { useAppDispatch, useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import Container from 'elements/Layout/Container';
import { getBottomSpace } from 'react-native-iphone-x-helper'; 
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64' 
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import useBackButton from 'hooks/useBackButton';
import { 
  checkBluetoothPermission, 
} from 'react-native-google-nearby-messages';
import VitalsInformation from "./VitalsInformation";
import { 
  WaveIndicator,
} from 'react-native-indicators';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import VitalsDeviceDataDispaly from './VitalsDeviceDataDispaly';
import {sendVitalsValues} from 'Actions/Vitals/sendVitalsValues';

var hex64 = require('hex64');

const VitalsConnection = memo((props) => {
  const dispatch = useAppDispatch()
  const profileInfo=useAppSelector((state)=>state.profile.data?.patient);
  const vitalsList=useAppSelector((state)=>state.vitalsList);

  const { navigate, setOptions, goBack } = useNavigation();
  const [isConnected, setIsConnected] = useState(false)
  const [SPo2, setSPo2] = useState<number|null>(null);
  const [PR, setPR] = useState<number|null>(null);
  const [highblood, setHighBlood] = useState<number|null>(null);
  const [lowblood, setLowBlood] = useState<number|null>(null);
  const [temprature, setTemprature] = useState<number|null>(null);
  const [glucometerValue, setGlucometerValue] = useState<number|null>(null);
  const [selectedDevice, setSelectedDevice] = useState<any>();
  const bleManager = new BleManager();
 
  const [beforScanning, setBeforScanning] = useState(false)
  const [afterScanning, setAfterScanning] = useState(false)



  const [deviceScan, setDeviceScan] = useState(false)
  const [deviceUuid, setDeviceUuid] = useState<any>();
  const [deviceFound, setDeviceFound] = useState(false)

  const [devices, setDevices] = useState<any>()
  const { theme } = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: props?.route.params.device?.name,
      headerBackground: () => (
        <View style={{ flex: 1, backgroundColor: theme.background }} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginRight={24} tintColor={theme.text} onPress={goBackScreen} />
      ),
    });
  }, [setOptions]);

  const _checkPermissions = useCallback(async () => {
    const permission = await checkBluetoothPermission();
       if(!permission){
      Alert.alert(
        'Bluetooth Permissions:',
         `BluetoothPermissions denied`,
  
      );
    }
 
  }, []);


  const stopDeviceScan = () => {
    bleManager.stopDeviceScan()
    setDeviceScan(false)
  }

 
  const setDeviceValue=(value:any)=>{

    if(devices.name==='PRT Server'){
      setSPo2(value[4])
      setPR(value[3])
    }  
    else if(devices.name==='T101P��\u0002J�YX'){
        let temp=new Int32Array(value.buffer);
    let preciseValue=parseInt(((temp[1]/10 * 9/5)+ 32 ).toFixed(1))

         setTemprature(preciseValue)
  
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

    setBeforScanning(true)
    setDevices([])
    setDeviceScan(true) 
    bleManager.startDeviceScan(null, {allowDuplicates: true}, async (error, device: any) => {
      if (error) console.error(error, "errorerrorerror")
      else if (device.name === selectedDevice.deviceName) {
         stopDeviceScan()
        setDevices(device)
        setDeviceFound(true)
      }
    });
  }

  const startConnecting = () => {
 
    try {
      devices.connect().then((device: any) => {
        return device.discoverAllServicesAndCharacteristics()
       }).then(async(device:any) => {
        console.log(device,"device");

        monitorCharacter(device) 
     })
       .catch((error: any) => {
        Alert.alert("Please try again!!")
        setAfterScanning(false)
        setIsConnected(false)
         console.log(error, "Handle errors"); 
       }); 
    } catch (error) {
      Alert.alert("Your device is offline. Please try again!!")
      startDeviceScan()
    }
      
  }


  const monitorCharacter = async (device: any) => {
 
    const services = await device.services();
    const characteristics = await services[2].characteristics(); 
    let index:any=getValueIndex()
      characteristics&&Alert.alert(
      "Device is Connected",
      "The data tested by the health medical device app is only for a health reference and not to be used for medical diagnosis. Please check with doctor before making any medical decision. We hereby declare that we are not responsible for consequences caused by improper operation for professional diagnosis or treatment.",
      [  { text: "OK", onPress:()=> deviceConnected(characteristics[index].id) }
      ]
    );
    
    // setDeviceUuid(characteristics[index].deviceID)
     device.monitorCharacteristicForService(characteristics[index].serviceUUID, characteristics[index].uuid, (error: any, characteristic: any) => {
      if (error) {
        console.log(error.message,"khjbjhbjs")
        Alert.alert("Device is disconnected!!")
        return
      } 
     let value = _base64ToArrayBuffer(characteristic.value)
       setDeviceValue(value)
    

    })

  }


  const deviceConnected = (uuid:any) => {
       setDeviceUuid(uuid)
       setAfterScanning(true)
       setIsConnected(true)
  }
 
const Refresh = () => { 
  
 }
 

  const subscription = bleManager.onStateChange((state) => {
    if (state === 'PoweredOn') {
      _checkPermissions()
       subscription.remove();
    }
    else if (state === 'PoweredOff') {
      Alert.alert("Please turn on your bluetooth")
    }
  }, true);

  useEffect(() => {
     setSelectedDevice(props?.route.params.device)
     setDevices([]) 

  }, [])

 

  const submitValue = useCallback(() => {

    let date=new Date((Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()
    .substring(0, new Date((Date.now() - (new Date()).getTimezoneOffset() * 60000))
    .toISOString().length - 1).replace(/\.\d+/, '');

   let obj=
    {
    vitalsList:vitalsList.data,
    profileAbleID:profileInfo?.profileAbleID,
    date:date,
    userId:profileInfo?.userId,
    SPo2:SPo2,
    PR:PR,
    highblood:highblood,
    lowblood:lowblood,
    temprature:temprature,
    glucometerValue:glucometerValue
  
  }

     dispatch(sendVitalsValues(obj)).then((res) => {
      res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
  }, [SPo2,PR,highblood,lowblood,temprature,glucometerValue,profileInfo,vitalsList]);


  const navigateError = useCallback(async (action) => {
    action.errors?Alert.alert(action.errors[0]):Alert.alert("Network Error")
 }, []);

  
 const navigateAction = useCallback(async (res) => {
  Alert.alert("Results Submitted")
  }, []);

  
  
  useEffect(() => {
    console.log('useEffect', devices)
  }, [devices,isConnected])

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
    <Container style={styles.container}   >


{!beforScanning&&!afterScanning&&
      <VitalsInformation title='How to connect your device?' description={selectedDevice?.description} image={selectedDevice?.deviceImage} onPress={startDeviceScan} buttonTitle={"Find Your Device"} />
}

{beforScanning&&!afterScanning&&
 <Container style={{...styles.container,...Theme.center,  }} >
    <Text size={20} lineHeight={24} bold  marginTop={scale(24)}  >{beforScanning&&deviceFound?"Device Found":"Scanning is in process"}</Text>
      <Text size={14} lineHeight={16} marginTop={scale(10)}>{beforScanning&&deviceFound?'You can enable a device by clicking on it. Try again if it throws an error during connecting.':"Make sure Bluetooth is turned on and Wellwink app having location permissions as well as Bluetooth. In the list of paired devices, tap a paired but unconnected device. When your phone and the Bluetooth device are connected, the device shows as Connected."}</Text>

     <WaveIndicator color={Colors.TealBlue} size={400} />
     {beforScanning&&deviceFound&&
     <TouchableOpacity style={{ position:"absolute", bottom:220,}} onPress={startConnecting}> 
      <Image
        source={selectedDevice?.deviceImage}
        style={styles.successImage}
      />
      </TouchableOpacity>
      } 
 </Container>
      }

 
      
 {beforScanning&&afterScanning&&isConnected&&
  <>  
      <Text size={24} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>BlueTooth device values</Text>

       <VitalsDeviceDataDispaly deviceName={devices?.name}  SPo2={SPo2} PR={PR} temprature={temprature} highblood={highblood} lowblood={lowblood} glucometerValue={glucometerValue}/>
         
          <ButtonLinear
                white
                title={'Submit'}
                onPress={submitValue}
                style={styles.buttonLinear}
              />

      </>
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
   marginBottom:20
  },
  successImage: {
    width: scale(90, true),
    height: scale(90, true), 
    ...Theme.alignSelfCenter,
  },
});
   