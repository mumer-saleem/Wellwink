import React, {memo, useLayoutEffect,useEffect,useCallback} from 'react';
import {View, StyleSheet,Alert,TouchableOpacity,ImageBackground} from 'react-native';
import Theme from 'style/Theme';
import {Routes} from 'configs';
import FeatureItem from 'components/FeatureItem';
import {IMAGE} from 'images/Image';
import {ICON} from 'images/Icon';

import Container from 'elements/Layout/Container';
import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import {callRequestAction} from "Actions//VideoCall/callRequestAction";
import {enrolmentsAction} from "Actions/Enrolments";
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'configs/ChangeTheme'
import scale from 'utils/scale';
import {width} from 'configs/Const';
import Text from 'elements/Text';
import {Colors} from 'configs';

const mainFeature = [
  {
    img: IMAGE.askFreeQuestion,
     title: 'Record Vitals',
    route: Routes.Vitals,
  },
  {
    img: IMAGE.healthFeed,
     title: 'My Program',
    route: Routes.OnlineConsult,
  },
  {
    img: ICON.call,
    title: 'Request a Phone \nCall',
     type:'phone'
    },
 
  {
    img: ICON.typeVideo,
    title:  'Request a Video \nCall',
    type:'video'
   },
];

const MainControl = memo(() => {
 
  const {theme} = useTheme();
  const {navigate} = useNavigation();

  const dispatch = useAppDispatch()

  const enrolProgram = useAppSelector((state) =>state.enrolProgram.data)
  const profile = useAppSelector((state) =>state.profile.data?.patient)

  const sendCallRequest = useCallback((id,type) => {
    dispatch(callRequestAction({id:id,type:type})).then((res) => {
      res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
  }, []);


  const navigateError = useCallback(async (action) => {
    action.errors?Alert.alert(action.errors[0]):Alert.alert("Network Error")
 }, []);

  
 const navigateAction = useCallback(async (res) => {
  // Alert.alert(res.payload.data.message)
  }, []);



  useEffect(() => {
    dispatch(enrolmentsAction(profile?.profileAbleID))
  }, [])

  
  const onPress= (route:any,type:any) => {
      route && navigate(route);
      if(!route){
        enrolProgram&&CallRequest(type)
        !enrolProgram&&Alert.alert("You are not enroll in any program!!")
      }
   }

   
   const CallRequest = useCallback((type) => {
    let Type= type=="video"?"Video":"Phone"
    Alert.alert(
      "Request a "+Type+" Call",
      "Are you sure you want to request a "+type+" call?",
      [
   
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () =>  sendCallRequest(enrolProgram[0].id,type), }
      ]
    );

  }, []);

  return (
    <Container style={styles.container}>
      {mainFeature.map(({route, img, title,type}) => (
        // <FeatureItem {...item} key={item.title} />
        <TouchableOpacity
        activeOpacity={0.54}
        style={[styles.container1, {backgroundColor: theme.backgroundItem}]}
        onPress={()=>onPress(route,type)}>
        <View style={{width: `${(88 / 156) * 100}%`}}></View>
        <ImageBackground
          style={{width: scale(56), height: scale(56)}}
          source={img}
          resizeMode="cover">
       
        </ImageBackground>
        <Text marginTop={16} size={13} lineHeight={18} center>
          {title}
        </Text>
      </TouchableOpacity>
      ))}
    </Container>
  );
});

export default MainControl;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexDirection,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 45,
  },
  container1: {
    paddingHorizontal: 16,
    width: (width - 64) / 2,
    height: (width - 64) / 2,
    ...Theme.center,
    marginBottom: 16,
    borderRadius: 16,
    ...Theme.shadow,
  },
});
