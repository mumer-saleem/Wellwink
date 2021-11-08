/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { Component } from 'react'
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider  } from 'react-redux'
import Appp from './src/Screens/App'
import { PersistGate } from 'redux-persist/integration/react'

import {store,persistor} from './src/Redux/ReduxPresist/ReduxPersist'

 
// export const store = configureStore({
//   reducer: reducers
// })
class App extends Component {

  componentDidMount=()=>{

  }
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Appp />
        </PersistGate>
      </Provider>
    )
  }
}


 
export default App;
