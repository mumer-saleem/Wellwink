import React, {useCallback, Dispatch, SetStateAction, useRef} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Text from 'elements/Text';
import {Colors, Constants} from 'configs';
import Theme from 'style/Theme';
import fillNumberLength from 'utils/convert/fillNumberLength';
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';
interface InputCodeOtpProps {
  style?: ViewStyle;
  codeLength?: number;
  code: string;
  isVerified: boolean;
  // setCode: Dispatch<SetStateAction<string>>;
  verification: (string:string)=>void;
}

const InputCodeOtp = ({
  style,
  codeLength = 6,
  code,
  isVerified,
  verification,
}: InputCodeOtpProps) => {
  const _code = fillNumberLength(code, codeLength);
  const inputRef: any = useRef();
  const renderInputBox = useCallback(() => {
    let arrBox = [];
    for (let i = 0; i < _code.length; i++) {
      arrBox.push(
        <Layout
          key={i.toString()}
          style={[
            styles.box,
            i !== codeLength - 1 && styles.space,
            _code.charAt(i) !== '#' && styles.alreadyEnter,
          ]}>
          {_code.charAt(i) !== '#' && (
            <Text size={25} semiBold center lineHeight={30}>
              {_code.charAt(i)}
            </Text>
          )}
        </Layout>,
      );
    }
    return arrBox;
  }, [_code]);

  const onPressInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const onChangeText = useCallback(
    (text: string) => {
      let _text = text;
      if (text.length > codeLength) {
        _text = text.substring(0, codeLength);
      }
      verification(_text);
    },
    [codeLength],
  );

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPressInput}>
      {renderInputBox()}
      {isVerified && (
        <Image
          source={require('images/Icon/ic_accept.png')}
          style={styles.iconAccept}
        />
      )}
      <TextInput
        placeholderTextColor={'red'}
        placeholder={'1 1 1 11111'}
        autoFocus
        value={code}
        onChangeText={onChangeText}
        style={styles.fakeInput}
        ref={inputRef}
        keyboardType={'numeric'}
      />
    </TouchableOpacity>
  );
};

export default InputCodeOtp;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    alignSelf: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderColor: Colors.DarkJungleGreen,
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.center,
  },
  space: {
    marginRight: 8,
  },
  iconAccept: {
    position: 'absolute',
    right: -32,
    width: 24,
    height: 24,
  },
  fakeInput: {
    position: 'absolute',
    right: -Constants.width * 2,
  },
  alreadyEnter: {
    borderColor: Colors.Malachite,
  },
});
