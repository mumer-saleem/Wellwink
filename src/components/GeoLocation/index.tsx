import React, {memo, useState, useEffect,useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList, 
  TouchableOpacity,
} from 'react-native';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import scale from 'utils/scale';
import Theme from 'style/Theme';
import {Colors} from 'configs';
 import changeAlias from 'utils/stringAlias';
import Layout from 'elements/Layout/Layout';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {useTheme} from 'configs/ChangeTheme'
import {GeoLocationAddress} from 'type'

interface geoLocationProps {
  onSelect: (GeoLocationAddress:GeoLocationAddress) => void;
 
}

const GeoLocation = memo(
  ({onSelect}: geoLocationProps) => {
    const {theme} = useTheme();
  

 const setAddressApi = (selectedAddress:any) => {
      let add = selectedAddress.address_components
      let addressIs = {
          'complete_address': selectedAddress.formatted_address,
          'street_no': '',
          'route': '',
          'city': '',
          'state': '',
          'zip_code': '',
          'placeID': selectedAddress.place_id,
          'lat':selectedAddress.geometry.location.lat,
          'lng':selectedAddress.geometry.location.lng,

      }
 
      for (let a = 0; a < add.length; a++) {
          let item = add[a].types[0];

          if (item == "street_number") {

              addressIs.street_no = add[a].long_name;
          }
          else if (item == "route") {
              addressIs.route = add[a].long_name;

          }
          else if (item == "locality") {
              addressIs.city = add[a].long_name;

          }
          else if (item == "administrative_area_level_1") {
              addressIs.state = add[a].long_name;
          }
          else if (item == "postal_code") {
              addressIs.zip_code = add[a].long_name;
          }

      }
       onSelect(addressIs)

  }
    return (
      <Layout style={styles.container}>
 
                           <GooglePlacesAutocomplete
                                 placeholder='Enter Location'
                                 fetchDetails={true}
                                 listViewDisplayed={false}
                                 keyboardShouldPersistTaps={'always'}
                                 textInputProps={{
                                // selectionColor: textColor,
                                    onChangeText: (text) => { 
                                      console.log(text,"text")
                                    }
                                  }}
                                onPress={(data, details = null) => {
 
                                    setAddressApi(details)

                                }}
                                query={{
                                    key: 'AIzaSyCrmmZrqsmOk4TxUWBUlrhta1wm-UDsiZg',
                                    language: 'en',
                                    // components: 'country:us',

                                }}
                                styles={{
                                  textInputContainer: {...styles.touchRow, borderColor: theme.borderColor},
                                  textInput: {
                                    flex: 1,
                                    fontSize: 15,
                                    height: '100%',
                                    color: Colors.DarkJungleGreen,
                                    fontFamily: 'Mulish-SemiBold',
                                  },

                              }}
                    
                            />
                  
       </Layout>
    );
  },
);

export default GeoLocation;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 24,
    height: scale(493, true),
  },
 
  touchRow: {
    ...Theme.flexRow,
    borderRadius: 8,
    borderWidth: 1,
    padding: 2,
 
  },
  
 
});
