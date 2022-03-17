import React, {memo, useCallback,useEffect,useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Theme from 'style/Theme';
import LinearColors from 'elements/LinearColors';
import {Colors, Constants, Routes} from 'configs';
import OnboardingPage from 'components/OnBoarding/OnBoardingPage';
import Animated from 'react-native-reanimated';
import DotProgress from 'components/OnBoarding/DotProgress';
import ButtonText from 'elements/Buttons/ButtonText';
import Text from 'elements/Text';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useNavigation} from '@react-navigation/native';
import {ONBOARDING} from 'configs/Data';
import Container from 'elements/Layout/Container';
import SplashScreen from 'react-native-splash-screen'
// import {resetNavigation} from 'utils/BackHandler'
import AuthManager from 'Services/authenticationManager'
import { CommonActions } from '@react-navigation/native';

interface OnBoardingProps {}

const {Value, event, set} = Animated;

const OnBoarding = memo((props: OnBoardingProps) => {
  const scrollX = new Value(0);
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [display, setDisplay] = useState(false);

  const onLogin = useCallback(() => {
    navigate(Routes.Login);
  }, [navigate]);
  const onSignUp = useCallback(() => {
    navigate(Routes.BasicInformation);
  }, [navigate]);
  const onGetHere = useCallback(() => {}, []);

  const loginCheck = async () => {
    AuthManager.getTokens().then(_res => {
      let authHeader = AuthManager.getAuthHeaders()
      if (authHeader['access-token'] && authHeader['uid'] && authHeader['client']){
      navigation.dispatch({
        ...CommonActions.reset({
            index: 0,
            routes: [{ name: "MainTab" }],
        }),
      })
      setTimeout(() => {
        SplashScreen.hide()
      }, 1000)  
    }
      else
      setDisplay(true)
      setTimeout(() => {
        SplashScreen.hide()
      }, 1000)    
 
     })
  }


  useEffect(() => {
    loginCheck()
  }, [])

 
  return (
    
    <View style={styles.container}>
      <LinearColors
        style={StyleSheet.absoluteFillObject}
        colors={[Colors.TealBlue, Colors.TurquoiseBlue]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={Constants.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: {
                  x: (x: number) => set(scrollX, x),
                },
              },
            },
          ])}>
          {ONBOARDING.map((i, index) => (
            <OnboardingPage
              {...i}
              key={i.id.toString()}
              isFirstItem={index === 0}
              isLastItem={index === ONBOARDING.length - 1}
            />
          ))}
        </Animated.ScrollView>
        <DotProgress numberOfDots={ONBOARDING.length} scrollX={scrollX} />
        <ButtonText
          white
          title={'Sign in'}
          style={styles.loginButton}
          titleColor={Colors.White}
          textProps={{bold: true}}
          onPress={onLogin}
          backgroundColor={Colors.TealBlue}
        />
        <ButtonText
          backgroundColor={Colors.White}
          hilight
          title={'Sign Up'}
          style={styles.signUpButton}
          titleColor={Colors.TealBlue}
          textProps={{bold: true}}
          onPress={onSignUp}
        />
        <View style={styles.changeApp}>
          <Text type="H6" white>
            Are you a doctor?{' '}
            <Text
              type="H6"
              white
              style={{textDecorationLine: 'underline'}}
              onPress={onGetHere}>
              Get here!
            </Text>
          </Text>
        </View>
      </LinearColors>
    </View>
      
  );
      
});

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.DodgerBlue,
  },
  loginButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: 'absolute',
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    left: 32,
  },
  signUpButton: {
    width: (Constants.width - 88) / 2,
    height: 50,
    position: 'absolute',
    bottom: (Constants.height / 812) * 77 + getBottomSpace(),
    right: 32,
    borderColor: Colors.Platinum,
    borderWidth: 1,
  },
  changeApp: {
    position: 'absolute',
    bottom: 16 + getBottomSpace(),
    alignSelf: 'center',
  },
});
