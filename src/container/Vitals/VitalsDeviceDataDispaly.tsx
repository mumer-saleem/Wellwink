import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale'; 
import Container from 'elements/Layout/Container'; 
import { getBottomSpace } from 'react-native-iphone-x-helper'; 
import ButtonLinear from 'elements/Buttons/ButtonLinear'; 
import VitalDataItems from './VitalDataItems'; 
import {ICON} from 'images/Icon';

import Theme from 'style/Theme';

interface VitalsDeviceDataProps {
  deviceName?: string | undefined;
  isConnected?: number|undefined;
  SPo2?:number|undefined;
  PR?: number|undefined;
  temprature?:number|undefined;
  highblood?:number|undefined;
  lowblood?: number|undefined;
  glucometerValue?: number|undefined;
 
}

const VitalsDeviceData = memo(({deviceName,PR,SPo2,temprature,lowblood,highblood,glucometerValue}:VitalsDeviceDataProps) => {

  return (
    <Container style={styles.container}   >
      
      {deviceName === 'PRT Server' && 
       <> 
          <VitalDataItems  title="SpO2 %" description="Oxygen Saturation" image={ICON.oxygenSymbol} value={SPo2}/>
          <VitalDataItems  title="PR" description="Pulse Rate" image={ICON.pulse} value={PR}/>
      </>
       }
         {deviceName === 'T101P��\u0002J�YX' && 
    <> 
          <VitalDataItems  title="Fahrenheit" description="Temperature" image={ICON.fahrenheit} value={temprature}/>
  
     </>
      }
       {deviceName === 'Bioland-BPM' &&  
   <>       
          <VitalDataItems  title="HB" description="High Blood" image={ICON.bloodpressure} value={highblood}/>
          <VitalDataItems  title="LB" description="Low Blood" image={ICON.bloodpressure} value={lowblood}/>
          <VitalDataItems title="PR" description="Pulse Rate" image={ICON.pulse} value={PR}/>

           {/* <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>High value {highblood} </Text>
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>Low value {lowblood} </Text> 
          <Text size={14} lineHeight={28} bold marginBottom={scale(8)} marginTop={scale(24)}>PR {PR} </Text>  */}
     </>
      }
      {deviceName === 'Bioland-BGM' && 
         <> 
           <VitalDataItems  title="mmol/L" description="Blood Glucometer" image={ICON.bloodCells} value={glucometerValue}/>
        </>
        }
    </Container>

  );
});

export default VitalsDeviceData;

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  buttonLinear: {
    marginTop: scale(24),
    width:scale(280),
    ...Theme.alignSelfCenter,
  },
});
   