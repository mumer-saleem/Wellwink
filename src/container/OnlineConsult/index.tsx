import React, {memo, useLayoutEffect,useEffect,useCallback} from 'react';
import {View, StyleSheet, FlatList,Alert} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import ButtonArrowRight from 'components/OnlineConsult/ButtonArrowRight';
import ContactDoctorItem from 'components/EnrolProgram';
import {IN_NETWORK} from 'configs/Data';
import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Colors from 'configs/Colors';
import keyExtractor from 'utils/keyExtractor';
import {useTheme} from 'configs/ChangeTheme'
import {enrolmentsAction} from "Actions/Enrolments";
import {callRequestAction} from "Actions//VideoCall/callRequestAction";

import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import Container from 'elements/Layout/Container';
import ListWidget from 'elements/ListWidget';

const OnlineConsult = memo(() => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) =>state.profile.data?.patient)
  const enrolProgram = useAppSelector((state) =>state.enrolProgram)

  const {navigate, setOptions} = useNavigation();
  const {theme} = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{flex: 1, backgroundColor: theme.background}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);
  const listHeaderComponent = React.useCallback(() => {
    return (
      <View>
        <ButtonArrowRight
          header={'Private Care Service'}
          content={
            'Consult instantly via live chat/voice/video call from doctors available now.'
          }
          noteCost={'Starting from $45 per visit'}
          onPress={() => navigate(Routes.SelectSpecial)}
        />
        <ButtonArrowRight
          header={'Ask a Free Health Question'}
          content={'Get the answers from top doctor in 140 precialties.'}
          noteCost={'Starting from $45 per visit'}
          onPress={() => navigate(Routes.SelectSpecial)}
        />
        <Text
          size={17}
          lineHeight={20}
          bold
          marginTop={scale(32)}
          marginBottom={scale(8)}>
          Available Care Team
        </Text>
      </View>
    );
  }, []);
  useEffect(() => {
     dispatch(enrolmentsAction(profile?.profileAbleID))
   }, [])

   const phoneCallRequest = useCallback((item) => {

    
 
  }, []);

  const CallRequest = useCallback((id,type) => {
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
        { text: "Yes", onPress: () =>  sendCallRequest(id,type), }
      ]
    );

  }, []);

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

  const renderItem = React.useCallback(({item}) => {
    return <ContactDoctorItem style={styles.item}  item={item}   CallRequest={CallRequest}   />;
  }, []);
  return (
    <Container style={styles.container} isVisible={enrolProgram.fetching} >
      <Text
        size={24}
        lineHeight={28}
        bold
        marginBottom={scale(8)}
        marginTop={scale(24)}>
       Enrol programs
      </Text>
      <ListWidget
        data={enrolProgram.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: scale(16),
          paddingBottom: getBottomSpace() + scale(16),
        }}
      />
  
    </Container>
  );
});

export default OnlineConsult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  frame: {
    paddingBottom: scale(24),
  },
  item: {
    marginTop: scale(16),
  },
});
