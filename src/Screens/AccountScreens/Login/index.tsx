/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useState, useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 
 
 import { useSelector, useDispatch,  } from 'react-redux'
 
 
 const App = () => {
  const dispatch=useDispatch()
 

  
 
  useEffect(() => {
    SplashScreen.hide();
 
  }, [])
   
   const backgroundStyle = {
     backgroundColor: "#60D1B1",
   };
 
   return (
 
    
 
   );
 };
 
 
 
 export default App;
 