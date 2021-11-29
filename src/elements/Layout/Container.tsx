import React from 'react';
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from 'react-native';
import {useTheme} from 'configs/ChangeTheme'
import  LoaderAbsolute from 'elements/Loader/LoaderAbsolute'

interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
  shoeActivityIndicator:Boolean|null 
}
 

const Container = (props: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultView style={[{backgroundColor: theme.background}, props.style]}>
      {props.children}
      {
        props.isVisible&&(
        <LoaderAbsolute/>
       )
       }
    </DefaultView>
  );
};
Container.defaultProps = {
  shoeActivityIndicator: false,
 
}
export default Container;
