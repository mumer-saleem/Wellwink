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
import Appp from './src/Screens/App'
import { PersistGate } from 'redux-persist/integration/react'
import {Colors } from './src/configs/index'

import appNavigation from './src/Navigation/AppContainer/appNavigation'
import { store, persistor } from './src/Redux/ReduxPresist/ReduxPersist'


class App extends Component {

  componentDidMount = () => {

  }
  render() {

    return (

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.appColor,
          marginBottom: isIphoneX() ? -35 : 0,
          paddingBottom: isIphoneX() ? 35 : 0,
          marginTop: isIphoneX() ? -5 : 0,
        }}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.appColor}></StatusBar>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Appp />
          </PersistGate>
        </Provider>
      </SafeAreaView>


    )

  }
}



export default App;
