import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,TouchableOpacity,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';  
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader'; 
import Container from 'elements/Layout/Container'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'configs/ChangeTheme'
import Theme from 'style/Theme'; 
import {Colors, Routes} from 'configs';
import  {useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import {getPatientContacts} from "Actions/Contacts/getContactsAction";
import {deletePatientContactAction} from "Actions/Contacts/delectContactAction";

import ListWidget from 'elements/ListWidget';
 import {getBottomSpace} from 'react-native-iphone-x-helper';
 import keyExtractor from 'utils/keyExtractor';
 import {ICON} from 'images/Icon';
 import {useFocusEffect} from '@react-navigation/native';

const showEmerrgencyContacts = memo(( ) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) =>state.profile.data?.patient)

  const { navigate, setOptions, goBack } = useNavigation();
  const { theme } = useTheme();
  const [contsacts, setContacts] = useState([
          
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
      headerRight: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text}   icon={'add'} onPress={()=>navigate(Routes.AddEmerrgencyContacts)}  />
      ),
    });
  }, [setOptions]);

   
  const getContacts =() => {
    dispatch(getPatientContacts(profile?.profileAbleID)).then((res) => {
       res.type=="/fulfilled"?navigateAction(res): navigateError(res.payload)})
  };


  const navigateError = useCallback(async (action) => {
    action.errors?Alert.alert(action.errors[0]):Alert.alert("Network Error")
 }, []);

  
 const navigateAction = useCallback(async (res) => {
  setContacts(res.payload.data)

    }, []);

 
 
    const deleteContact =(item:any) => {
      dispatch(deletePatientContactAction(item.id)).then((res) => {
         res.type=="/fulfilled"?getContacts(): navigateError(res.payload)})
    };
   
  
  useEffect(() => {
    getContacts()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getContacts()
    }, []),
  );
  useEffect(() => {
    
   }, [contsacts])


   const renderItem = React.useCallback(({item}) => {
    return(
      <View   style={[styles.insuranceItem, {backgroundColor: theme.backgroundItem}]}>
      <View style={Theme.flexOne}>
      <Text
          size={scale(18)}
          style={{marginBottom:5}}
           color={Colors.GrayBlue}>
       {item.name}
        </Text>
       <View style={[ Theme.flexRow]}> 
       <Image
          source={ICON.follow}
          style={{width: scale(16), height: scale(16),marginRight:5 }}
        />
        <Text
          size={scale(12)}
           color={Colors.GrayBlue}>
           {item.contact_number?.value}
         </Text>
        </View>
        <View style={[ Theme.flexRow]}> 
       <Image
          source={ICON.follow}
          style={{width: scale(16), height: scale(16),marginRight:5 }}
        />
        <Text
          size={scale(12)}
          
          color={Colors.GrayBlue}>
       {item.relationship_name}
        </Text>
        </View>
       
      </View>
      <TouchableOpacity onPress={()=>deleteContact(item)} >
        <Image
          source={ICON.cancelSearch} 
          style={{width: scale(20), height: scale(20),  }}
        />
      </TouchableOpacity>


      </View>
      )   
 
  }, []);
 
  return (
    <Container style={styles.container}   >

       
     <Text
        size={24}
        lineHeight={28}
        bold
         marginTop={scale(24)}>
       Emergency Contacts
      </Text>
      <ListWidget
        data={contsacts}
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

export default showEmerrgencyContacts;

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
   