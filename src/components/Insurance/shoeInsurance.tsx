import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,TouchableOpacity,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';  
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader'; 
import Container from 'elements/Layout/Container'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'configs/ChangeTheme'
import Theme from 'style/Theme'; 
import {Colors} from 'configs';
import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import {getInsuranceAction} from "Actions/Insurance/getInsuranceAction";
import ListWidget from 'elements/ListWidget';
 import {getBottomSpace} from 'react-native-iphone-x-helper';
 import keyExtractor from 'utils/keyExtractor';

const shoeInsurance = memo(( ) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) =>state.profile.data?.patient)

  const { navigate, setOptions, goBack } = useNavigation();
  const { theme } = useTheme();
  const [insurance, setInsurance] = useState([
          { 
        "patient_insurance_id": "Fetching..", 
        "insurance_type": "Fetching..",
        "importance_type": "Fetching..",
        "insurance_name": "Fetching.."
    }
  ]);

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{ flex: 1, backgroundColor: theme.background }} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

   
  const getInsurance =() => {
    dispatch(getInsuranceAction(profile?.profileAbleID)).then((res) => {
       res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
  };


  const navigateError = useCallback(async (action) => {
    action.errors?Alert.alert(action.errors[0]):Alert.alert("Network Error")
 }, []);

  
 const navigateAction = useCallback(async (res) => {
   setInsurance(res.payload.data)
   }, []);

 

   
  
  useEffect(() => {
    getInsurance()
  }, [])
  useEffect(() => {
   }, [insurance])


   const renderItem = React.useCallback(({item}) => {
    return(
      <View   style={[styles.insuranceItem, {backgroundColor: theme.backgroundItem}]}>
  <View style={Theme.flexOne}>
        <Text
          size={scale(15)}
          lineHeight={scale(24)}
           color={ Colors.GrayBlue }>
          {item.insurance_name}
        </Text>
        <Text
          text_placeholder
          size={scale(13)}
          lineHeight={scale(16)}
          color={Colors.GrayBlue}
          marginTop={8}>
          {item.importance_type}
        </Text>
        <Text
          text_placeholder
          size={scale(13)}
          lineHeight={scale(16)}
          color={Colors.GrayBlue}
          marginTop={8}>
          {item.insurance_type}
        </Text>
        <Text
          text_placeholder
          size={scale(13)}
          lineHeight={scale(16)}
          color={Colors.GrayBlue}
          marginTop={8}>
          {item.id}
        </Text>
      </View>
      </View>
      )   
    //   {
    //     "id": 2225,
    //     "patient_id": 985,
    //     "insurance_id": 25,
    //     "patient_insurance_id": "215151",
    //     "created_at": "2022-02-15T03:57:46.441-05:00",
    //     "updated_at": "2022-02-15T03:57:46.441-05:00",
    //     "insurance_type": "medicaid",
    //     "importance_type": "primary",
    //     "insurance_name": "Blue east insurance"
    // }
  }, []);
 
  return (
    <Container style={styles.container}   >

       
     <Text
        size={24}
        lineHeight={28}
        bold
         marginTop={scale(24)}>
       Insurances
      </Text>
      <ListWidget
        data={insurance}
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

export default shoeInsurance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
 insuranceItem:{
  padding: 16,
  marginTop: scale(8),
  borderRadius: scale(16),
  justifyContent: 'space-between',
  flexDirection: 'row',
},
 
});
   