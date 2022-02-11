import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale'; 
import Container from 'elements/Layout/Container'; 
import { getBottomSpace } from 'react-native-iphone-x-helper'; 
import ButtonLinear from 'elements/Buttons/ButtonLinear'; 
import Theme from 'style/Theme';
import Layout from 'elements/Layout/Layout';
import { color } from 'react-native-reanimated';
 
interface VitalsConnectionProps {
  title?: string | undefined;
  description?: string;
  image?:any;
  value?: number ;
}

const VitalsConnection = memo(({description,image,title,value}:VitalsConnectionProps) => {

  return (
 
         <Layout style={styles.dataContainer}>
            <View style={{width:"50%"}}>
            <Image source={image}   style={styles.successImage1} />
           <Text size={20} lineHeight={28} bold marginBottom={scale(8)}   center={true}>{description}</Text>
         </View>
         <View style={{justifyContent:"center",alignItems:"center"}} >
           <Text size={20} lineHeight={28} bold  marginTop={scale(24)} hilight={true}>{title}</Text>
           <Text size={60} lineHeight={65} bold marginBottom={scale(8)} marginTop={scale(24)}>{value}</Text>

         </View>
       </Layout>
      
 
 

  );
});

export default VitalsConnection;

const styles = StyleSheet.create({
 
 
 
  successImage1: {
    width: scale(60, true),
    height: scale(60, true), 
    ...Theme.alignSelfCenter,
    
  },
 
  dataContainer: {
    borderRadius: scale(16),
     marginTop:scale(16),
    justifyContent:"space-around",
    ...Theme.flexRow, 
  },
});
   