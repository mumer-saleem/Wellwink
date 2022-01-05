import React, {memo, useCallback, useState,useRef,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Animated,
  PermissionsAndroid,
} from 'react-native';
import Text from 'elements/Text';
import {Colors, Routes} from 'configs';
import Theme from 'style/Theme';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {AVATAR} from 'images/Avatar';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import {ICON} from 'images/Icon';
import {IMAGE} from 'images/Image';
import VideoCallFooter from 'components/PrivateCareService/VideoCallFooter';
import useModalAnimation from 'hooks/useModalAnimation';
import IncomingCallFooter from 'components/PrivateCareService/IncomingCallFooter';
import ModalSlideBottom from 'components/ModalSlideBottom';
import {FILE_EXAMPLES} from 'configs/Data';
import ModalSharedFiles from 'components/ModalSharedFiles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import PrivateCareLiveChat from '../PrivateCareLiveChat';
import {height} from 'configs/Const';
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';
 import {GetVideoCallPermissions} from 'utils';
 import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
var Sound = require('react-native-sound');
import KeepAwake from 'react-native-keep-awake';
import  { useAppDispatch,useAppSelector } from "Redux/ReduxPresist/ReduxPersist";
 import {cancelCallAction} from 'Actions/VideoCall/cancelCallAction';
 import {getAuthToken} from 'Actions/VideoCall/getAuthToken';


var call = new Sound('call.mp3', Sound.MAIN_BUNDLE, (error:any) => {
  if (error) {
      console.log('failed to load the sound', error);
      return;
  }
  
  // loaded successfully
  console.log('duration in seconds: ' + call.getDuration() + 'number of channels: ' + call.getNumberOfChannels());

});
export default memo(() => {
  const videoCallbject = useAppSelector((state) =>state.videoCall.videoCallbject)
  const profile = useAppSelector((state) =>state.profile.data?.patient)

  const dispatch=useAppDispatch();

  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [typeModal, setTypeModal] = useState<number>();
  const [fileList, setFileList] = useState<any>([]);
  const {visible, open, close, transY} = useModalAnimation();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
   const twilioRef = useRef(null);
 
   const _onConnectButtonPress = () => {
    setStatus('connecting');
     dispatch(getAuthToken()).then((res:any) => {
     res.type=="/fulfilled"&&
        twilioRef.current.connect({roomName: videoCallbject.roomNme, accessToken: res.payload.data.token })
    })
    call.stop();
    setAccepted(!accepted);
  }
  
  const _onEndButtonPress = () => {
    twilioRef.current.disconnect();
  };
  const _onMuteButtonPress = () => {
    
     twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled:any) => setIsAudioEnabled(isEnabled));
  };
  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

  const _onRoomDidConnect = ({roomName, error}:any) => {
    console.log('onRoomDidConnect: ', roomName);

    setStatus('connected');
  };


  const _onRoomDidDisconnect = ({ roomName, error }:any) => {
    console.log('[Disconnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect =(error:any)=> {
    console.log('[FailToConnect]ERROR: ', error);
    navigation.goBack();  
    KeepAwake.deactivate();
    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }:any) => {
     setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };
  const _onParticipantRemovedVideoTrack = ({ participant, track }:any) => {
    twilioRef.current.disconnect();
    const videoTracksLocal = videoTracks;

    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
    navigation.goBack();  
    KeepAwake.deactivate();
  };

  useFocusEffect(
    useCallback(() => {
      setFileList(FILE_EXAMPLES);
    }, [fileList]),
  );

  const onPressChat = () => {};
  const onPressAccept = () => {
    setAccepted(!accepted);
    _onConnectButtonPress()
  };
  const openChat = () => {
    setTypeModal(1);
    open();
  };
  const openAttach = () => {
    setTypeModal(2);
    open();
  };
  const onPressVideo = () => {
     twilioRef.current
    .setLocalVideoEnabled(!isVideoEnabled)
    .then(
      (isEnabled:any) =>{
       setIsVideoEnabled(isEnabled);
    } )
 
  };
  const onPressMute = () => {};
  const onPressDecline = () => {
      dispatch(cancelCallAction({userId:profile?.userId,callerId:videoCallbject?.callerId})).then((res) => {
      res.type=="/fulfilled"&&
      call.stop();
      navigation.goBack();  
      KeepAwake.deactivate();
      })
 
   };
  const onPressEnd = () => {
    // setEnded(true);
    navigation.goBack(); 
    _onEndButtonPress()
  };
  const onWriteReview = () => {
    navigate(Routes.ReviewDoctor);
  };
  const onGoToDashBoard = () => {
    // navigate(Routes.MainTab);
    navigation.goBack();  
    KeepAwake.deactivate();
  };

  useEffect(() => {
    KeepAwake.activate();
     call.play();

    GetVideoCallPermissions()
    
  }, []) 
  
  useEffect(() => {
  }, [videoCallbject]) 

  return (
    <Container style={styles.container}>
      {accepted && !ended ? (
        <>
          <Layout style={styles.header}>
            <View style={Theme.flexRow}>
               <Image  source={{uri:videoCallbject.callerProfile}} style={{ width: 40, height: 40, borderRadius: 10 }}   />

              <View>
                <Text
                  bold
                  size={15}
                  lineHeight={18}
                  marginLeft={8}
                  marginBottom={4}>
                  {videoCallbject.callerFullName} 
                </Text>
                <Text
                  size={11}
                  lineHeight={14}
                  color={Colors.GrayBlue}
                  marginLeft={8}>
                  25:12  
                </Text>
              </View>
            </View>
            <ButtonIconHeader
              borderColor={Colors.RedNeonFuchsia}
              backgroundColor={Colors.RedNeonFuchsia}
              tintColor={Colors.Red}
              icon="callOff"
              onPress={onPressEnd}
            />
          </Layout>

          
          {/* <ImageBackground source={IMAGE.doctor} style={styles.imgDoctor}>
            <Image source={IMAGE.patient} style={styles.imgPatient} />
          </ImageBackground> */}
         <View  style={styles.imgDoctor}>
           {
        (status === 'connected' || status === 'connecting') &&
          <View style={styles.imgDoctor}>
          {
            status === 'connected' &&
            <View style={styles.imgDoctor}>
              {
                Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={styles.imgDoctor}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  )
                })
              }
            </View>
          }
    
            <TwilioVideoLocalView enabled={true} style={styles.imgPatient} />
       
        </View>
      }

        <TwilioVideo
        ref={ twilioRef }
        onRoomDidConnect={ _onRoomDidConnect }
        onRoomDidDisconnect={ _onRoomDidDisconnect }
        onRoomDidFailToConnect= { _onRoomDidFailToConnect }
        onParticipantAddedVideoTrack={ _onParticipantAddedVideoTrack }
        onParticipantRemovedVideoTrack= { _onParticipantRemovedVideoTrack }
      />
           </View>

          <VideoCallFooter
            // onPressChat={openChat}
            onPressVideo={onPressVideo}
            isVideoEnabled={isVideoEnabled}
            onPressMute={_onMuteButtonPress}
            isAudioEnabled={isAudioEnabled}
            onPressAttach={_onFlipButtonPress}
          />
        </>
      ) : !accepted && !ended ? (
        <>
          <View style={styles.callView}>
            <Text size={15} lineHeight={24} marginBottom={120}>
            {videoCallbject.callerFullName} calling you.... 
            </Text>
            <View style={Theme.center}>
              <Animated.View style={styles.glow1} />
              <Animated.View style={styles.glow2} />
              <Animated.View style={styles.glow3} />
              <Image source={{uri:videoCallbject.callerProfile}} style={styles.avatar} />
            </View>
          </View>
          <IncomingCallFooter
            onPressAccept={_onConnectButtonPress}
            onPressDecline={onPressDecline}
            // onPressChat={onPressChat}
          />
        </>
      ) : (
        <View style={styles.callView}>
          <Text center size={15} lineHeight={24} marginBottom={80}>
            Call Ended
          </Text>
          <Image  source={{uri:videoCallbject.callerProfile}} style={styles.avatar} />
          <Text bold size={20} lineHeight={24} marginVertical={48}>
          {videoCallbject.callerFullName}
          </Text>
          {/* <ButtonBorder
            title="Write a review"
            color={Colors.GrayBlue}
            style={styles.endedButton}
            onPress={onWriteReview}
          /> */}
          <ButtonLinear white 
            title="Go to Home Dashboard"
            styleButton={styles.endedButton}
            width={270}
            onPress={onGoToDashBoard}
          />
        </View>
      )}
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSlideBottom onClose={close} transY={transY}>
          {typeModal == 1 ? (
            <PrivateCareLiveChat isLiveChat={false} style={styles.chat} />
          ) : (
            <ModalSharedFiles fileList={fileList} />
          )}
        </ModalSlideBottom>
      </Modal>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: getStatusBarHeight(),
    ...Theme.flexRowSpace,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  callView: {
    ...Theme.center,
    flex: 1,
    paddingBottom: 100,
  },
  imgDoctor: {
    flex: 1,
  },
  imgPatient: {
    position: 'absolute',
    width: 80,
    height: 120,
    top: 24,
    left: 24,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  endedButton: {
    width: 300,
    marginBottom: 16,
  },
  chat: {
    height: (height * 2) / 3,
  },
  glow1: {
    width: 160,
    height: 160,
    backgroundColor: Colors.RedNeonFuchsia,
    borderRadius: 40,
    opacity: 0.4,
    position: 'absolute',
  },
  glow2: {
    width: 240,
    height: 240,
    backgroundColor: Colors.RedNeonFuchsia,
    borderRadius: 40,
    opacity: 0.16,
    position: 'absolute',
  },
  glow3: {
    width: 320,
    height: 320,
    backgroundColor: Colors.RedNeonFuchsia,
    borderRadius: 40,
    opacity: 0.04,
    position: 'absolute',
  },
});
