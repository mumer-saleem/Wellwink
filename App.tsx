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
import React, {useCallback, useMemo, useState} from 'react';

import { isIphoneX } from 'react-native-iphone-x-helper';
import { Provider } from 'react-redux'
import SignUp from './src/container/Account/SignUp/index'
import { PersistGate } from 'redux-persist/integration/react'
import {Colors } from './src/configs/index' 
import {TMode, themes, ThemeContext} from './src/configs/ChangeTheme';

import AppNavigation from './src/Navigation/AppContainer/appNavigation'
import { store, persistor } from './src/Redux/ReduxPresist/ReduxPersist'
import ModalDisconnect from 'components/ModalDisconnect';

 
 
 
 
 const App = () => {
  const isDisconnect = false;
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
          

       </SafeAreaView>
      </ThemeContext.Provider>
      
    </Provider>
 
   );
 };
 
//  <StatusBar barStyle='dark-content' backgroundColor={Colors.White}></StatusBar>
//  <Provider store={store}>
//    <PersistGate loading={null} persistor={persistor}>
//   <AppNavigation/>
//    </PersistGate>
//  </Provider>
// </SafeAreaView>
// );
 
 export default App;
 