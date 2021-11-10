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
 import {ReducState} from '../../src/Type/index'
 import { signIn, signOut, } from '../Redux/Reducers/login/signIn'
 import {testing1} from '../Actions/login'
 import SplashScreen from 'react-native-splash-screen'
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import { useSelector, useDispatch,  } from 'react-redux'
 
  const Section: React.FC<{
   title: string;
 }> = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App = () => {
  const dispatch=useDispatch()
   const isDarkMode = useColorScheme() === 'dark';
  const Login=useSelector((state:ReducState)=>state.LogIn)
  const [count, setCount] = useState(Login?.isLogin);

  
  useEffect(() => {
   }, [Login?.isLogin])

  useEffect(() => {
    SplashScreen.hide();
 
  }, [])
   
   const backgroundStyle = {
     backgroundColor: "#60D1B1",
   };
 
   return (
 
        <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
    
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
        <TouchableOpacity onPress={()=>dispatch(signIn())}>
        <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
 signIn
       </Text>
    
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>dispatch(testing1())}>
        <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
 signOut
       </Text>
    
        </TouchableOpacity>

        <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
        {count?"yes am in ":"am not"}
       </Text>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
           <LearnMoreLinks />
         </View>
       </ScrollView>
 
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
  
     fontFamily: 'Mulish-SemiBold',
   },
 });
 
 export default App;
 