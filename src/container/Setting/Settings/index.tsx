import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from 'elements/Text';
import {Colors, Routes} from 'configs';
import Theme from 'style/Theme';
import {AVATAR} from 'images/Avatar';
import {ICON} from 'images/Icon';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import AccountItem from 'components/AccountItem';
import {IMAGE} from 'images/Image';
import {useTheme} from 'configs/ChangeTheme';
import Content from 'elements/Layout/Content';
import scale from 'utils/scale';
import {height} from 'configs/Const';
import Layout from 'elements/Layout/Layout';
import Container from 'elements/Layout/Container';
import ProfileHeader from 'elements/Headers/profileHeader';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import { CommonActions } from '@react-navigation/native';


export const ACCOUNT_SAMPLE = {
  id: 1,
  name: 'Devin Shelton',
  email: 'DevinShelton@patientPlus.com',
  accountType: 'Standard Account',
}; 
const Account = memo(() => {
  const {navigate, setOptions} = useNavigation();
  const [account, setAccount] = useState<any>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      setAccount(ACCOUNT_SAMPLE);
    }, []),
  );
  const {theme, toggleTheme} = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };
  const signOut = () => {
    navigation.dispatch({
      ...CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
      }),
    })
   };
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {height: 0},
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerBackground: () => (
        <Container style={{flex: 1, backgroundColor: theme.background}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
    
    {/* <ProfileHeader/> */}
    <Content
      style={styles.content}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
   
      <Layout style={styles.layout}> 
      <AccountItem
          route={Routes.AccountPaymentMethod}
          style={styles.middleView}
          icon={ICON.payment}
          name="Payment Method"
       
        />  
          <AccountItem
          style={styles.middleView}
          icon={ICON.payment}
          name="Sign Out"
          onPress={()=>signOut()}
        />  
        <AccountItem
          // onPress={toggleDarkMode}
          style={[styles.lastView, {borderBottomColor: theme.background}]}
          icon={ICON.themeMode}
          name="Dark Mode"
          isToggle={true}
          switchValue={darkMode}
          // onValueChange={toggleDarkMode}
        />
      </Layout> 
    </Content>
    </Container>
   );
});

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: getStatusBarHeight() + 52,
  }, 
  layout: {
    marginHorizontal: 24,
    marginVertical: 8,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    marginTop:30
  }, 
  middleView: {
    ...Theme.flexRowSpace,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  lastView: {
    ...Theme.flexRowSpace,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingRight: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  }, 
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
  },
  imageInvite: {
    marginRight: 18,
  },
});
