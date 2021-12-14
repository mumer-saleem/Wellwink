import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  PermissionsAndroid, TouchableHighlight
} from 'react-native';
import TwilioVoice from 'react-native-twilio-programmable-voice';

// make sure you install vector icons and its dependencies
// import MIcon from 'react-native-vector-icons/MaterialIcons';
// import normalize from 'react-native-normalize';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen'

 
export default class Example extends Component {
  state = {
    twilioInited: false

    }
    getMicrophonePermission = () => {
      const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
      
      return PermissionsAndroid.check(audioPermission).then(async result => {
          if (!result) {
            const granted = await PermissionsAndroid.request(audioPermission, {
              title: 'Microphone Permission',
              message: 'App needs access to you microphone ' + 'so you can talk with other users.',
            });
          }
      });
  }
  initTwilio = async () => {
    const token = "Sdjbefbeib  4hbnjhec h jhc jh cjhbehcbreb b hbjc ej  e ";
    if (Platform.OS === 'android') {
        await this.getMicrophonePermission();
    }
    await TwilioVoice.initWithToken(token);
    TwilioVoice.addEventListener('deviceReady', () => {
        this.setState({ twilioInited: true });
    });
    if (Platform.OS === 'ios') { //required for ios
        TwilioVoice.configureCallKit({
            appName: 'ReactNativeTwilioExampleApp',
        });
    }
};
makeCall = () => TwilioVoice.connect({ To: 'Alice' });
  
  componentDidMount() {
    SplashScreen.hide();
    // on start we are asking the permisions
   }
  

 
getUser = async () => {
  // await checkInternet()
  
   
  fetch('http://192.168.4.92:3000/api/v1/video/auth_token', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'uid':"kamela.parker@mailinator.com",
          'client':'brdZPq9MKYf9XJeOhLLkxw',
          "access-token": "33RxwnuMgIB3NlHj-gIjlA"
      },
  }).then((response) => response.text())
      .then(async (responseText) => {
          let responseData = JSON.parse(responseText);

          console.log(responseData, "responseData")
         this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: responseData.token})
         this.setState({token:responseData.token})

      })
      .catch((error) => {
          this.setState({ isAnimating: false, isDisabled: false });
          console.log(error, 'error from getUser APi');

      });
}

 render() {
      return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => this.initTwilio()}>
                <View>
                    <Text>Init Twilio</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={!this.state.twilioInited} onPress={() => this.makeCall()}>
                <View>
                    <Text>Make call ({this.state.twilioInited ? 'ready' : 'not ready'})</Text>
                </View>
            </TouchableOpacity>
      </View>
      )
  }
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white'
},
callContainer: {
  flex: 1,
  position: "absolute",
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  minHeight:"100%"
},
welcome: {
  fontSize: 30,
  textAlign: 'center',
  paddingTop: 40
},
input: {
  height: 50,
  borderWidth: 1,
  marginRight: 70,
  marginLeft: 70,
  marginTop: 50,
  textAlign: 'center',
  backgroundColor: 'white'
},
button: {
  marginTop: 100
},
localVideoOnButtonEnabled: {
  bottom: ("40%"),
  width: "35%",
  left: "64%",
  height: "25%",
  zIndex: 2,
},
localVideoOnButtonDisabled: {
  bottom: ("30%"),
  width: "35%",
  left: "64%",
  height: "25%",
  zIndex: 2,
},
remoteGrid: {
  flex: 1,
  flexDirection: "column",
},
remoteVideo: {
  width: "100%",
  height:"100%",
  zIndex: 1,
},
optionsContainer: {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  height: 100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  zIndex: 2,
},
optionButton: {
  width: 60,
  height: 60,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 100 / 2,
  backgroundColor: 'grey',
  justifyContent: 'center',
  alignItems: "center"
},
spacing: {
  padding: 10
},
inputLabel: {
  fontSize: 18
},
buttonContainer: {
  height:  "20%",
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
  width: "90%",
  borderRadius: 30,
},
loginButton: {
  backgroundColor: "#1E3378",
  width : "90%",
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 20,
  marginTop: 10
},
Buttontext: {
  color: 'white',
  fontWeight: '500',
  fontSize: 18
},
inputBox: {
  borderBottomColor: '#cccccc',
  fontSize: 16,
  width: "95%",
  borderBottomWidth:1
},
});