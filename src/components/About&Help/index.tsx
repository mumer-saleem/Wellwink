import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,TouchableOpacity,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';  
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader'; 
import Container from 'elements/Layout/Container';
import { getBottomSpace } from 'react-native-iphone-x-helper';   
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import useBackButton from 'hooks/useBackButton';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'configs/ChangeTheme'
import Theme from 'style/Theme';
import {ICON} from 'images/Icon';
import {Colors} from 'configs';

import Layout from 'elements/Layout/Layout';
import Line from 'elements/Layout/Line';
const AboutHelp = memo((props) => {
 
  const { navigate, setOptions, goBack } = useNavigation();
  const { theme } = useTheme();

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

 

   
  
 
 
  return (
    <Container style={styles.container}   >

      {props?.route.params.comming=="About"?
      
      <>
      <Text size={20} lineHeight={24} bold  marginTop={scale(24)}  >About Wellwink</Text>
      <Text size={14} lineHeight={16} marginTop={scale(10)}>WellWink LLC, is a healthcare information technology company helping patients, physicians and healthcare organizations establish and maintain stronger relationships.  </Text>
      <Text size={14} lineHeight={16} marginTop={scale(10)}>Headquarters in New Jersey, USA, WellWink develops solutions for patient engagement, practice management and health record that integrates with other practice management and EHR systems as well. Cloud-based platform enable healthcare stakeholder get access to real-time online scheduling, automated appointment reminders, telehealth, patient communication, practice marketing, e-Note, clinical templates, and much more.</Text>

      </>:
      <>
      {/* <Text size={20} lineHeight={24} bold  marginTop={scale(24)}  >Help & Support</Text> */}

      <View
           style={styles.item}>
            <View style={styles.iconFollow}>
            <Image
              source={ICON.location_icon}
              style={{ 
                width: scale(90, true),
                height: scale(90, true), 
                ...Theme.alignSelfCenter,}}
            />
          </View>
          <Text size={15} lineHeight={24} color={Colors.BlueCrayola} marginTop={20} medium>
            {"414 Hackensack Ave, Hackensack, NJ 07601"}
          </Text>
        
        </View>
         <View
           style={styles.item}>
            <View style={styles.iconFollow}>
            <Image
              source={ICON.call_icon}
              style={{ 
                width: scale(90, true),
                height: scale(90, true), 
                ...Theme.alignSelfCenter,}}
            />
          </View>
          <Text size={15} lineHeight={24} color={Colors.BlueCrayola} marginTop={20} medium>
            {"+1-646-854-5400 "}
          </Text>
        
        </View>

        <View
           style={styles.item}>
            <View style={styles.iconFollow}>
            <Image
              source={ICON.email_icon}
              style={{ 
                width: scale(90, true),
                height: scale(90, true), 
                ...Theme.alignSelfCenter,}}
            />
          </View>
          <Text size={15} lineHeight={24} color={Colors.BlueCrayola} marginTop={20} medium>
            {"sales@wellwink.com "}
          </Text>
        
        </View>
    
      </>}

 
    </Container>

  );
});

export default AboutHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  item: {
    padding: 24,

    ...Theme.center,
  },
  iconFollow: {
    ...Theme.center,
     borderRadius: 12,
    width: scale(90, true),
    height: scale(90, true), 
  },
});
   