import React from 'react'
import {View, ActivityIndicator,StyleSheet,Dimensions} from 'react-native'
 import Colors from 'configs/Colors'
 
 import scale from 'utils/scale';

const LoaderAbsolute = () => {
 
  return (
    <View style={styless.loading}>
    <View style={{flex: 1, justifyContent: 'center', }}>
      <ActivityIndicator color={Colors.TealBlue} size={"small"} />
    </View>
    </View>         
  )
}
 
 

export default LoaderAbsolute

const styless = StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    alignSelf:"center",
    justifyContent: 'center',
    marginTop:scale(300)
 
},

})
 