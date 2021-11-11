/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */


import { SafeAreaView, AppRegistry, StatusBar } from 'react-native'
import React,{Component} from "react";

import { isIphoneX } from 'react-native-iphone-x-helper';
import { Provider } from 'react-redux'
import SignUp from './src/container/Account/SignUp/index'
import { PersistGate } from 'redux-persist/integration/react'
import {Colors } from './src/configs/index' 
import {useTheme} from './src/configs/ChangeTheme';

import AppNavigation from './src/Navigation/AppContainer/appNavigation'
import { store, persistor } from './src/Redux/ReduxPresist/ReduxPersist'

 
 
 
 
 const App = () => {
  const {theme} = useTheme();
   return (
     <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: Colors.White,

      marginBottom: isIphoneX() ? -35 : 0,
      paddingBottom: isIphoneX() ? 35 : 0,
      marginTop: isIphoneX() ? -5 : 0,
    }}>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.White}></StatusBar>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     <AppNavigation/>
      </PersistGate>
    </Provider>
  </SafeAreaView>
   );
 };
 
 
 
 export default App;
 