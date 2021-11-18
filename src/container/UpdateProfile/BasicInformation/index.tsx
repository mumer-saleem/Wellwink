import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Image,Modal, Alert} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import {Routes} from 'configs';
import InputApp from 'elements/InputApp';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {useNavigation} from '@react-navigation/native';
import AvatarProfile from 'components/UpdateProfile/BasicInformation/AvatarProfile';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Colors from 'configs/Colors';
import {ICON} from 'images/Icon';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';
import Container from 'elements/Layout/Container';

import {CameraImage ,libraryImage,menuOptions} from 'utils/imagePiker';
import useModalAnimation from 'hooks/useModalAnimation';
import ModalSelect from 'components/ModalSelect';

const BasicInformation = memo(() => {

  const {visible, open, close} = useModalAnimation();
 
  const [firstName, setFirstName] = useState('Devin');
  const [lastName, setLastName] = useState('Sheton');
  const [avatarSource, setAvatarSource] = useState('');

  const {navigate, setOptions} = useNavigation();
  const {theme} = useTheme();


  const onGoToOtherInfo = useCallback(() => {
    navigate(Routes.OtherInformation);
  }, [navigate]);

  const onUploadAvatar = useCallback(async() => {
    let response =  await CameraImage()
   }, []);
  
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <Container
          style={[styles.headerBackground, {backgroundColor: theme.background}]}
        />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.activeTincolor} />
      ),
    });
  }, [setOptions]);

  const onPressItem = useCallback(async(result) => {
          switch (result.id) {
            case 0:
           let result= await libraryImage()
              uploadImage(result.assets)
              close()
              break;
           case 1:
            let result1= await CameraImage()
            uploadImage(result1.assets)
            close()
                break;
            default:
              break;
          } 
  }, []);

  const uploadImage = useCallback(async(result) => {
 
         if(result[0]){
         setAvatarSource(result[0].uri)
       }
    }  , [avatarSource]);
  
 
  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          size={scale(13)}
          lineHeight={scale(16)}
          bold
          marginTop={scale(32)}>
          Step 1 of 3
        </Text>
        <Text
          size={scale(24)}
          lineHeight={scale(28)}
          bold
          marginTop={scale(16)}>
          Your Profile
        </Text>
        <Text size={scale(13)} lineHeight={scale(22)} marginTop={scale(16)}>
          Update your profile to get better the answer from
          {'\n'}doctor.
        </Text>

        <AvatarProfile onPress={onUploadAvatar}  avatarSource={avatarSource} open={open} />

        <InputApp
          title={'First Name'}
          marginTop={scale(38)}
          value={firstName}
          onChangeText={setFirstName}
        />
        <InputApp
          title={'Last Name'}
          marginTop={scale(24)}
          value={lastName}
          onChangeText={setLastName}
        />
        <ButtonLinear
          white
          title={'Continue'}
          children={<Image source={ICON.next} style={styles.buttonChildren} />}
          onPress={onGoToOtherInfo}
          style={styles.buttonLinear}
        />
      </ScrollView>
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSelect choices={menuOptions} close={close} onPressItem={onPressItem} />
      </Modal>
    </Container>
  );
});

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  inputApp: {
    marginTop: scale(24),
  },
  firstName: {
    marginTop: scale(38),
  },
  homeAddress: {
    marginTop: scale(32),
  },
  buttonLinear: {
    marginTop: scale(24),
  },
  genders: {
    marginTop: scale(24),
    ...Theme.flexRow,
    ...Theme.center,
  },
  headerBackground: {
    flex: 1,
  },
});
