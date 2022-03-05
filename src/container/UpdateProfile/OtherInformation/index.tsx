import React, {memo, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import scale from 'utils/scale';
import InputApp from 'elements/InputApp';
import {Colors, Routes} from 'configs';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import GenderItem from 'components/UpdateProfile/BasicInformation/GenderItem';
import {useNavigation} from '@react-navigation/native';
import {ICON} from 'images/Icon';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {useTheme} from 'configs/ChangeTheme'
import Container from 'elements/Layout/Container';
import useModalAnimation from 'hooks/useModalAnimation';
import ModalSlideBottom from 'components/ModalSlideBottom';
import Calendar from 'components/Schedule/Calendar';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
import  { basicInfo, otherInfo } from "Redux/Reducers/signUp/signUp";

interface OtherInformationProps {}
const genders = [
  {
    id: 2,
    title: 'Male',
    value: 'male',
    icon: require('images/Icon/ic_male.png'),
  },
  {
    id: 1,
    title: 'Female',
    value: 'female',
    icon: require('images/Icon/ic_female.png'),
  },
  {
    id: 0,
    title: 'Others',
    value: 'others',
    icon: require('images/Icon/others.png'),
  },
];
const OtherInformation = memo((props: OtherInformationProps) => {

  const dispatch=useAppDispatch()

  const [ motherName,setMotherName] = useState('');
   const [gender, setGender] = useState<{
    id?: number | null;
    title?: string | null;
    icon: any;
    value: string | null;
  }>({id: null, title: null, value: null,  icon: null,});
   
  const [state, setState] = useState({
    motherName:"",
    motherNameError:"",
    date:'Select Date',
    dateError:"",
    genderError:""
   
 
  });


  const {navigate, setOptions} = useNavigation();
  const {  visible,  open: dateOpen,  close: dateClose,  transY: dateTransY, } = useModalAnimation();

  const onPickDatePress = useCallback(day => {
      setState(  prevState => ({
      ...prevState,
      date:day.dateString,
      dateError:""

  }))
  
  dateClose();
  }, [state]);
 
  const isvalidate=useCallback(() => {
    const {motherName,motherNameError,date,dateError}=state
     
     if(motherName==''||  date=='Select Date'||gender.id==null){
      
       setState(  prevState => ({...prevState, 
        motherNameError:motherName==""?"Required":"",
        dateError:date=='Select Date'?"Required":"",
        genderError:gender.id==null?"Required":"",
        })  )
    
        return false
   }
   return true
   },[state])


  const onGotoFollowTopic = useCallback(() => {
    const validation =  isvalidate()
    validation&& navigate(Routes.SignUp);
    validation && dispatch(otherInfo({
      gender:gender.value, 
      db:state.date, 
      motherName:state.motherName,  
  }))
  }, 
  [state]); 
   const {theme} = useTheme();

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text size={13} lineHeight={16} bold marginTop={32}>
          Step 2 of 5
        </Text>
        <Text size={24} lineHeight={28} bold marginTop={16}>
          Others Information
        </Text>
        <Text size={13} lineHeight={22} marginTop={16}>
          Update your profile to get better the answer from
          {'\n'}doctor.
        </Text>
        <View style={styles.genders}>
        {genders.map((i, index) => {
            const onPress = () => {
              setGender(i);   
              setState(  prevState => ({
                ...prevState,
                genderError:""
        
            }))
            };
          
            return (
              <GenderItem
                {...i}
                isChoose={i.id == gender.id}
                isLastItem={index === genders.length - 1}
                onPress={onPress}
                key={i.id.toString()}
              />
            );
          })}
        </View>
        <View style={{height:scale(24)}}> 
        {state.genderError!=""&&<Text style={{ color:"red",   }}>{state.genderError}</Text>}
         </View>
        <InputApp
          title={'Birthday'}
          marginTop={scale(24)}
          value={state.date}
           iconLeft={<Image source={ICON.calendar} style={Theme.icons} />}
          isShowIconLeft
          onPress={()=>dateOpen()}
          editable={false}
        />

            <View style={styles.BirthdayView}>
          
        </View> 
        <View style={{height:scale(24)}}> 

        {state.dateError!=""&&<Text style={{ color:"red",   }}>{state.dateError}</Text>}
       </View>
  
         <InputApp
          title={'Mother Name'}
          placeholder={"Mother Name"}
          // marginTop={scale(24)}
          value={state.motherName}
          onChangeText={(text)=>{
            setState(  prevState => ({
              ...prevState,
              motherName:text,
              motherNameError:state.motherName.length<1?"At least two characters":""
      
          }))
        }}
        />
        <View style={{height:scale(24)}}> 

        {state.motherNameError!=""&&<Text style={{ color:"red",   }}>{state.motherNameError}</Text>}
       </View>   
        <ButtonLinear white 
          white
          title={'Continue'}
          children={
            <Image
              source={require('images/Icon/ic_next.png')}
              style={styles.buttonChildren}
            />
          }
          onPress={onGotoFollowTopic}
          style={styles.buttonLinear}
        />
      </ScrollView>
      <Modal
        visible={visible}
        onRequestClose={dateClose}
        transparent
        animationType="fade">
        <ModalSlideBottom onClose={dateClose} transY={dateTransY}>
          <Calendar onPress={onPickDatePress}  value={state.date=='Select Date'?"1999-01-01":state.date}/>
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});

export default OtherInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  genders: {
    marginTop: scale(40),
    ...Theme.flexRow,
    ...Theme.center,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  buttonLinear: {
    marginTop: scale(24),
  },
  BirthdayView:{
    ...Theme.flexRow,
    marginTop: 4,
  }
});
 