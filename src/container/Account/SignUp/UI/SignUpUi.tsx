import React, {memo, Dispatch,useState, SetStateAction,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Theme from 'style/Theme';
import Text from 'elements/Text';
import scale from 'utils/scale';
import {Colors} from 'configs';
import InputApp from 'elements/InputApp';
import TextInput from 'elements/TextInput';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import ButtonChangeCode from 'components/ButtonChangeCode';
import {TcodeArea} from 'type/codeArea';
import Content from 'elements/Layout/Content';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import { useField, useFormikContext, ErrorMessage } from "formik";
import {PasswordValidationCases} from "utils/validation";


interface SignUpUiProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isValidEmail: boolean;
  codeArea: TcodeArea;
  phoneNumber: string;
  // setPhoneNumber: Dispatch<SetStateAction<string>>;
  password: string;
  // setPassword: Dispatch<SetStateAction<string>>;
  visiblePassword: boolean;
  onShowHidePassword: () => void;
  handleSubmit: () => void;
  onTermOfUse: () => void;
  onPrivacyPolicy: () => void;
  onGoToLogin: () => void;
  openModalChange: () => void;
  onLogInFacebook: () => void;
  onLogInTwitter: () => void;
  values:any;
  errors:any;
  touched:any;
}

const SignUpUi = memo(
  ({
    email,
    setEmail,
    isValidEmail,
    codeArea,
    phoneNumber,
    // setPhoneNumber,
    password,
    // setPassword,
    visiblePassword,
    onShowHidePassword,
    handleSubmit,
    onTermOfUse,
    onPrivacyPolicy,
    onGoToLogin,
    openModalChange,
    onLogInFacebook,
    onLogInTwitter,
    values,
    errors,
    touched,
  }: SignUpUiProps) => {
    const { handleChange, handleBlur, } = useFormikContext();
    const [state, setState] = useState({
      upperCase:false,
      lowerCase:false,
      minimumCase:false,
      numberCase:false,
      specialCases:false
    });


    const MobileNumberFormate=(text:string)=>{

      var cleaned = ('' + text).replace(/\D/g, '')
              var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
              if (match) {
                   let number = ['(', match[2], ') ', match[3], '-', match[4]].join('');
                  return number;
               }
               else {
                var ret = text.replace('(','');
                var ret1 = ret.replace(') ','');
                var ret2 = ret1.replace('-','');
                return ret2
               }

    }

    useEffect(() => {
     const object = PasswordValidationCases(password)
      setState(  prevState => ({
      ...prevState,
      upperCase:object.upperCase,
      lowerCase:object.lowerCase,
      minimumCase:object.minimumCase,
      numberCase:object.numberCase,
      specialCases:object.specialCases
  }))
    
    }, [password])
 
    
  
    return (
      <Content style={styles.container} showsVerticalScrollIndicator={false}>
    
         <Text size={13} lineHeight={16} bold  >
          Step 3 of 5
        </Text>
        <Text size={24} lineHeight={28} bold marginTop={16}>
          Account 
        </Text>
        <Text size={13} lineHeight={22} marginTop={16}>
        Give your email address and phone number for your account verification.
        </Text>
        <InputApp
          value={email}
          onChangeText={handleChange('email')}
          title={'Email'}

          marginTop={scale(16)}
          placeholder={'email@gmail.com'}
          isShowIcon={isValidEmail}
          icon={
            <Image
              source={require('images/Icon/ic_accept.png')}
              style={Theme.icons}
            />
          }
        />
             <View style={{height:scale(24)}}>  
             {errors.email==undefined &&  setEmail(values.email) }     
            {errors.email && touched.email&& <Text style={{ color:"red",   }}>{errors.email}</Text> }
           </View>
        <Text size={13} lineHeight={16}  >
          Mobile Phone
        </Text>
        <View style={styles.phoneView}>
          <ButtonChangeCode codeArea={codeArea} onPress={openModalChange} />
          <TextInput
            value={phoneNumber}
            placeholder={"0000000000"}
            onChangeText={handleChange('phoneNumber')}
            style={styles.phoneNumber}
            borderColor={Colors.Isabelline}
            editable
            keyboardType="numeric"
            maxLength={10}


          />
        </View> 
        <View style={{height:scale(24)}}>  
            {errors.phoneNumber && touched.phoneNumber&& <Text style={{ color:"red",   }}>{errors.phoneNumber}</Text> }
           </View>
        <InputApp
          title={'Password'}
          placeholder={"******"}
          value={password}
          onChangeText={handleChange("password") }
          secureTextEntry={!visiblePassword}
          // marginTop={24}
          icon={
            <Image
              source={require('images/Icon/ic_eye_on.png')}
              style={Theme.icons}
            />
          }
          isShowIcon
          iconPress={onShowHidePassword}
        />
               <View style={{paddingVertical:5}}>  
            {errors.password && touched.password&& (
            <View> 
            <Text   style={{ color:password.length>=8 ?Colors.TealBlue:"red", }}>Minimum eight characters</Text>
            <Text   style={{ color:state.upperCase?Colors.TealBlue:"red", }}>At least one uppercase letter</Text>
            <Text   style={{ color:state.lowerCase?Colors.TealBlue:"red", }}>At least one lowercase letter</Text>
            <Text   style={{ color:state.numberCase?Colors.TealBlue:"red", }}>At least one number</Text>
            <Text   style={{ color:state.specialCases?Colors.TealBlue:"red", }}>At least one special character</Text>
            </View>
            )}
           </View>
        <ButtonLinear
          white
          white
          title={'Sign Up'}
          onPress={handleSubmit}
          style={{marginTop: scale(24)}}
        />
      

        <Text
          type="P6"
          color={Colors.DarkJungleGreen}
          center
          marginTop={scale(30)}>
          By clicking sign up you are agreeing to the{'\n'}
          <Text
            blueLight
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onTermOfUse}
            center>
            Terms of use
          </Text>{' '}
          and the{' '}
          <Text
            blueLight
            type="P6"
            color={Colors.BlueCrayola}
            onPress={onPrivacyPolicy}
            center>
            Privacy policy
          </Text>
        </Text>
      </Content>
    );
  },
);

export default SignUpUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
  },
  password: {
    marginTop: 24,
  },
  phoneNumber: {
    marginLeft: 8,
    flex: 1,
  },
  emailInput: {
    marginTop: scale(34),
  },
  bottom: {
    ...Theme.flexOne,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flag: {
    width: 32,
    height: 20,
  },
  changePhoneCode: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  phoneView: {
    ...Theme.flexRow,
    marginTop: 4,
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  loginSocial: {
    marginTop: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameLoginSocial: {
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonFacebook: {
    flexDirection: 'row',
    marginTop: scale(15),
    width: scale(152),
    height: scale(50),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bDazzledBlue,
  },
  buttonTwitter: {
    flexDirection: 'row',
    marginTop: scale(15),
    width: scale(152),
    height: scale(50),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.MediumTurquoise,
  },
});
