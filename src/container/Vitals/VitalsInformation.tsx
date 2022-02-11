import React, { memo, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Alert,Image } from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale'; 
import Container from 'elements/Layout/Container'; 
import { getBottomSpace } from 'react-native-iphone-x-helper'; 
import ButtonLinear from 'elements/Buttons/ButtonLinear'; 
import Theme from 'style/Theme';

interface VitalsConnectionProps {
  title?: string | undefined;
  description?: string;
  image?:any;
  onPress?:(() => void) | undefined,
  buttonTitle?: string | undefined;
}

const VitalsConnection = memo(({description,image,onPress,title,buttonTitle}:VitalsConnectionProps) => {

  return (
    <Container style={styles.container}   >
      
    {title&&  <Text size={22} lineHeight={24} bold marginBottom={scale(8)} marginTop={scale(24)}>{title}</Text>}
    
    {description &&<Text size={16} lineHeight={19} marginBottom={scale(16)} >{description}</Text>}
     {image&&
      <Image
        source={image}
        style={styles.successImage}
      />
     }
        <ButtonLinear
          white
          children={
            <Image
              source={require('images/Icon/ic_next.png')}
              style={styles.buttonChildren}
            />
          }
          title={buttonTitle}
          onPress={onPress}
          style={styles.buttonLinear}
        />
        
    </Container>

  );
});

export default VitalsConnection;

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
 
  successImage: {
    width: scale(160, true),
    height: scale(160, true), 
    ...Theme.alignSelfCenter,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: 8,
  },
  buttonLinear: {
    marginTop: scale(24),
    width:scale(280),
    ...Theme.alignSelfCenter,
  },
});
   