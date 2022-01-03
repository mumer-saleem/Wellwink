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
import React, {useCallback, useMemo, useState,useEffect} from 'react';

import { isIphoneX } from 'react-native-iphone-x-helper';
import { Provider } from 'react-redux'
import SignUp from './src/container/Account/SignUp/index'
import { PersistGate } from 'redux-persist/integration/react'
import {Colors } from './src/configs/index' 
import {TMode, themes, ThemeContext} from './src/configs/ChangeTheme';

import AppNavigation from './src/Navigation/AppContainer/appNavigation'
import { store, persistor } from './src/Redux/ReduxPresist/ReduxPersist'
import ModalDisconnect from 'components/ModalDisconnect';
import {checkInternet} from 'utils';
import NetInfo from "@react-native-community/netinfo";

 
 
 
 const App = () => {

  let [isDisconnect, setIsDisconnect] = useState(false);
  useEffect(() => {
    NetInfo.addEventListener(({ isConnected, isInternetReachable, }) => {
 
      if (isInternetReachable == null) isInternetReachable = true

      if (isConnected && isInternetReachable) {
        setIsDisconnect(true)
        } else {
        setIsDisconnect(false)
      }
  });
  }, [isDisconnect])

   const [mode, setMode] = useState<TMode>('dark');

  const toggleTheme = useCallback(() => {
    setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () => (mode === 'light' ? themes.dark : themes.light),
    [mode],
  );
   return (
     
    <Provider store={store}>
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: Colors.Snow,

      marginBottom: isIphoneX() ? -35 : 0,
      paddingBottom: isIphoneX() ? 35 : 0,
      marginTop: isIphoneX() ? -5 : 0,
    }}>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.Snow}></StatusBar>
     <PersistGate loading={null} persistor={persistor}>
     <AppNavigation/>
      </PersistGate>
      {!isDisconnect && <ModalDisconnect />}

       </SafeAreaView>
      </ThemeContext.Provider>
      
    </Provider>
 
   );
 };
 
 
 export default App;
 