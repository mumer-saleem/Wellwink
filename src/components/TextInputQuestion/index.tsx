import React, {memo, Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';
import Text from 'elements/Text';
import {Colors} from 'configs';
import scale from 'utils/scale';
import {useNavigation} from '@react-navigation/native';
import {ICON} from 'images/Icon';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';
import Line from 'elements/Layout/Line';
import Theme from 'style/Theme';

interface Props {
  lengthText: number;
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  setLengthText: Dispatch<SetStateAction<number>>;
  minChar: number;
  addAttachments?: boolean;
}

const TextInputQuestion = memo(
  ({
    lengthText,
    question,
    setQuestion,
    setLengthText,
    minChar,
    addAttachments,
  }: Props) => {
    const {navigate} = useNavigation();
    const onChangeText = React.useCallback((text: string) => {
      setQuestion(text);
      setLengthText(text.length);
    }, []);
    const {theme} = useTheme();
    return (
      <Layout style={styles.container}>
        <View style={styles.contentHeader}>
          <Image source={ICON.account} style={styles.contentHeaderIcon} />
          <Text marginLeft={16} bold size={15}>
            What is your question?
          </Text>
        </View>
        <Line />
        <View style={{padding: scale(24)}}>
          <TextInput
            placeholderTextColor={theme.text_placeholder}
            style={{
              width: scale(295),
              height: scale(104),
              borderRadius: scale(8),
              backgroundColor: theme.borderColor,
              padding: scale(16),
              color: theme.text,
            }}
            placeholder="Describe your isssue in detail…"
            textAlignVertical="top"
            maxLength={1000}
            multiline
            value={question}
            onChangeText={onChangeText}
            disableFullscreenUI={true}></TextInput>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              right
              size={scale(11)}
              lineHeight={scale(14)}
              marginTop={scale(8)}
              color={Colors.GrayBlue}>
              Min {minChar} Char
            </Text>
            <Text
              marginLeft={scale(16)}
              right
              size={scale(11)}
              lineHeight={scale(14)}
              marginTop={scale(8)}
              color={Colors.GrayBlue}>
              {lengthText}/1000
            </Text>
          </View>
          {addAttachments ? (
            <ButtonIconText
              icon={'attachBlue'}
              iconStyle={styles.iconstyle}
              title={'Add Attachments'}
              titleColor={Colors.GrayBlue}
              textProps={{bold: true, size: 15, lineHeight: 18, marginLeft: 8}}
              style={styles.styleButton}
            />
          ) : null}
        </View>
      </Layout>
    );
  },
);

export default TextInputQuestion;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
    marginBottom: scale(16),
  },
  frameImg: {
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'center',
  },
  img: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(16),
    marginLeft: scale(8),
  },
  iconstyle: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8),
  },
  styleButton: {
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(16),
    borderWidth: 1,
    borderColor: Colors.Platinum,
  },
  contentHeaderIcon: {
    tintColor: Colors.TiffanyBlue,
    backgroundColor: Colors.TiffanyBlueOpacity,
    borderRadius: 4,
  },
  contentHeader: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'center',
  },
});
