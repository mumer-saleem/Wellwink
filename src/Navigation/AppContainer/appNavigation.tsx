import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {memo} from 'react';
 
import {Routes} from '../../configs';
import Login from '../../container/Account/Login';
import OnBoarding from '../../container/OnBoarding';
import ForgetPassword from '../../container/Account/ForgetPassword';
import RecoveryPassword from '../../container/Account/RecoveryPassword';
import ChangePasswordSuccessful from '../../container/Account/ChangePasswordSuccessful';
import SignUp from '../../container/Account/SignUp';
import VerifyPhoneNumber from '../../container/Account/VerifyPhoneNumber';
import BasicInformation from '../../container/UpdateProfile/BasicInformation';
import SignUpSuccessful from '../../container/Account/SignUpSuccessful';
import FollowTopic from '../../container/UpdateProfile/FollowTopic';
import OtherInformation from '../../container/UpdateProfile/OtherInformation';
import SentVerifySuccessful from '../../container/UpdateProfile/SentVerifySuccessful';
 
import Notification from '../../container/HomeDashboard/Notification';
import TodayTasks from '../../container/TodayTasks/TodayTasks';
import TodayTasksDetail from '../../container/TodayTasks/TodayTasksDetail';
 import DoctorProfile from '../../container/DoctorProfile';
import AccountFiles from '../../container/Setting/AccountFiles';
import AccountPaymentMethod from '../../container/Setting/AccountPaymentMethod';
import MyRecord from '../../container/MyRecord/MyRecord';
import MyRecordBasicInformation from '../../container/MyRecord/MyRecordBasicInformation';
import MyRecordHealthMetric from '../../container/MyRecord/MyRecordHealthMetric';
import MyRecordCondition from '../../container/MyRecord/MyRecordCondition';
import HealthQuestion from '../../container/AskFreeQuestion/HealthQuestion';
import HealthSearch from '../../container/HealthSearch';
import InviteFriendsForFriend from '../../container/Setting/InviteFriendForFriend';

const Stack = createNativeStackNavigator();

const AppNavigation = memo(() => {
  return (
    <NavigationContainer> 
    <Stack.Screen name={Routes.OnBoarding} component={OnBoarding} options={{headerShown: false}} />
      
     
      <Stack.Screen name={Routes.Login} component={Login} options={{headerShown: false}} />
      <Stack.Screen name={Routes.ForgetPassword} component={ForgetPassword} />
      <Stack.Screen name={Routes.RecoveryPassword}  component={RecoveryPassword} />
      <Stack.Screen  name={Routes.ChangePasswordSuccessful}  component={ChangePasswordSuccessful} options={{headerShown: false}} />
      <Stack.Navigator initialRouteName={Routes.ForgetPassword}>
    
      <Stack.Screen name={Routes.SignUp} component={SignUp} />
      <Stack.Screen name={Routes.VerifyPhoneNumber} component={VerifyPhoneNumber}  />
      <Stack.Screen name={Routes.BasicInformation}  component={BasicInformation} />

      <Stack.Screen name={Routes.OtherInformation}  component={OtherInformation} />
      <Stack.Screen name={Routes.FollowTopic}  component={FollowTopic} />
      <Stack.Screen name={Routes.SignUpSuccessful}  component={SignUpSuccessful} />
      <Stack.Screen name={Routes.SentVerifySuccessful}  component={SentVerifySuccessful} /> 
      
      <Stack.Screen name={Routes.Notification} component={Notification} />
      <Stack.Screen name={Routes.TodayTask} component={TodayTasks} />
      <Stack.Screen  name={Routes.TodayTaskDetails} component={TodayTasksDetail}  />
      <Stack.Screen name={Routes.DoctorProfile} component={DoctorProfile} />
      <Stack.Screen name={Routes.AccountFile} component={AccountFiles} />
      <Stack.Screen name={Routes.HealthQuestion} component={HealthQuestion} />
      <Stack.Screen name={Routes.HealthSearch} component={HealthSearch} /> 
      <Stack.Screen  name={Routes.AccountPaymentMethod} component={AccountPaymentMethod} />
      <Stack.Screen  name={Routes.MyRecord} component={MyRecord}  options={{headerShown: false}} />
      <Stack.Screen name={Routes.MyRecordBasicInformation} component={MyRecordBasicInformation} />
      <Stack.Screen  name={Routes.MyRecordHealthMetric}  component={MyRecordHealthMetric} />
      <Stack.Screen   name={Routes.MyRecordCondition}  component={MyRecordCondition} />
      <Stack.Screen  name={Routes.InviteFriendForFriend}  component={InviteFriendsForFriend} />
 

    </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigation;

 