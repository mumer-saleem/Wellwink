import {
  ActionCable,
  Cable,
} from '@kesha-antonov/react-native-action-cable'

import {handleReceived,handleConnected,handleDisconnected} from './videoActions';
import  {apiConstants} from 'configs/Const';


const cable = new Cable({});

 

export const UnSubscribeVideoChannle =  async () => {
  const channel = cable.channel(apiConstants.videChannelName)
 if (channel) {
   channel
     .removeListener( 'received', handleReceived )
     .removeListener( 'connected', handleConnected )
     .removeListener( 'rejected', handleDisconnected )
     .removeListener( 'disconnected', handleDisconnected )
   channel.unsubscribe()
   delete( cable.channels[apiConstants.videChannelName] )
 }
};

export const SubscribeVideoChannle =  async (userId:string|undefined,navigation:any,) => {

  const connectActionCable = ActionCable.createConsumer(apiConstants.videoURl+'?aaaa=33333&user_id='+userId,apiConstants.videChannelName, { user_id:  userId });
 ActionCable.startDebugging()
  const channel = cable.setChannel(
    apiConstants.videChannelName,
    connectActionCable.subscriptions.create(
     {
       channel:apiConstants.videChannelName,
       user_id: userId,
     },
     {
       updatePresence() {
         this.perform('update_presence');
       },
     },
   ),
   
 );
 channel
 .on( 'UserChannel',(date:any)=> handleReceived(date,navigation) )
 .on( 'connected', handleConnected )
 .on( 'rejected',  handleDisconnected )
 .on( 'disconnected', handleDisconnected )
}

export const disConnectActionCale =  async (userId:string|undefined,) => {
  const connectActionCable = ActionCable.createConsumer(apiConstants.videoURl+'?aaaa=33333&user_id='+userId,apiConstants.videChannelName, { user_id:  userId });
  console.log(connectActionCable.connection.isOpen(),"connectActionCable")
  connectActionCable.disconnect()

} 
export const connectActionCale =  async (userId:string|undefined,) => {
  const connectActionCable = ActionCable.createConsumer(apiConstants.videoURl+'?aaaa=33333&user_id='+userId,apiConstants.videChannelName, { user_id:  userId });
  connectActionCable.open()
}