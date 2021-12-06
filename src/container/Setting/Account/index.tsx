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


export const ACCOUNT_SAMPLE = {
  id: 1,
  name: 'Devin Shelton',
  email: 'DevinShelton@patientPlus.com',
  accountType: 'Standard Account',
};

const Account = memo(() => {
  const {navigate} = useNavigation();
  const [account, setAccount] = useState<any>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

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

  const onInvite = () => {
    navigate(Routes.InviteFriendForYou);
  };

  const onEditButton = () => {};

  return (
    <Container style={styles.container}>
    {/* <View style={[styles.infoView, {backgroundColor: theme.background}]}>
        <View style={Theme.flexRow}>
          <Image source={AVATAR.avatar2} style={styles.avatar} />
          <View>
            <Text size={15} bold marginBottom={4}>
              {account.name}
            </Text>
            <Text style={styles.email}>{account.email}</Text>
            <Text style={styles.type}>{account.accountType}</Text>
          </View>
        </View>
        <Image source={ICON.arrDown} />
        {/* <ButtonIcon icon="edit" style={styles.icon} onPress={onEditButton} /> */}
      {/* </View> */}
    <ProfileHeader/>
    <Content
      style={styles.content}
      scrollEventThrottle={16}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
   
      <Layout style={styles.layout}>
        <AccountItem
          route={Routes.MyRecordBasicInformation}
          style={styles.firstView}
          icon={ICON.additional}
          name="Demographics"
        />
        {/* <AccountItem
          route={Routes.AccountPaymentMethod}
          style={styles.middleView}
          icon={ICON.payment}
          name="Payment Method"
        /> */}
          <AccountItem
          style={styles.middleView}
          icon={ICON.clinicVital}
          name="Emergerncy cnontact"
        />
            <AccountItem
          style={styles.middleView}
          icon={ICON.addedCareTeam}
          name="Insurance"
        />
          <AccountItem
          style={styles.middleView}
          icon={ICON.accountNormal}
          name="Family"
        />

        <AccountItem
          style={styles.middleView}
          icon={ICON.setting}
          name="Setting"
          route={Routes.Settings}

        />
        {/* <AccountItem
          onPress={toggleDarkMode}
          style={[styles.lastView1, {borderBottomColor: theme.background}]}
          icon={ICON.themeMode}
          name="Dark Mode"
          isToggle={true}
          switchValue={darkMode}
          onValueChange={toggleDarkMode}
        /> */}
      </Layout>

      <Layout style={styles.content}>
        <AccountItem
          style={styles.firstView}
          icon={ICON.home}
          name="About Doctor Plus"
        />
        <AccountItem
          style={styles.middleView}
          icon={ICON.help}
          name="Help & Support"
        />
        <AccountItem
          style={styles.middleView}
          icon={ICON.term}
          name="Privacy and Policy"
        />
        <View
          style={[
            styles.lastView,
            {
              backgroundColor: theme.backgroundItem,
              marginBottom: scale(127, true),
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onInvite}
            style={Theme.flexRow}>
            <Image style={styles.imageInvite} source={IMAGE.inviteFriend} />
            <View>
              <Text style={styles.text}>
                Invite friend to give a friend $15 of and get $10 credit for
                you!!
              </Text>
              <TouchableOpacity style={styles.button} onPress={onInvite}>
                <Text white color={Colors.White} size={12} center>
                  Invite Now!
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
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
  infoView: {
    ...Theme.flexRowSpace,
    marginHorizontal: 24,
    marginBottom: 32,
   paddingTop: getStatusBarHeight(),

  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  icon: {
    tintColor: Colors.White,
    backgroundColor: Colors.DodgerBlue,
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    marginBottom: 8,
  },
  type: {
    fontSize: 13,
    color: Colors.GrayBlue,
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
  firstView: {
    ...Theme.flexRowSpace,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
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
  button: {
    width: 90,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.DodgerBlue,
    justifyContent: 'center',
    marginTop: 8,
  },
  text: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
    lineHeight: 25,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
  },
  imageInvite: {
    marginRight: 18,
  },
});
