import React, {memo} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import Text from 'elements/Text';

import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Colors} from 'configs';
import scale from 'utils/scale';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {ICON} from 'images/Icon';
import {DATA_SUGGEST_SIMILAR_QUESTION} from 'configs/Data';
import Line from 'elements/Layout/Line';
interface DataSuggest {
  id: number;
  title: string;
  numberAnswer: number;
}
interface Modal {
  open: () => void;
  close: () => void;
  gotoSendSuccess: () => void;
}

const ModalSuggestSimilarQuestion = memo(
  ({open, close, gotoSendSuccess}: Modal) => {
    function renderSuggest(item: DataSuggest) {
      return (
        <View style={styles.frameFlatList}>
          <View style={styles.flatList}>
            <Text type="H5" color={Colors.DodgerBlue}>
              {item.title}
            </Text>
            <View style={styles.question}>
              <Image source={ICON.doctorAnswer} />
              <Text type="H6" bold marginLeft={scale(8)}>
                {item.numberAnswer}
              </Text>
              <Text type="H6" marginLeft={scale(4)}>
                doctor answered
              </Text>
            </View>
          </View>
          <Line />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <Text size={17} lineHeight={20} bold>
            We may find similar your question
          </Text>
          <Text type="H5" marginTop={scale(8)}>
            Our doctor have answerd similar questions
          </Text>
        </View>
        <Line />
        <FlatList
          data={DATA_SUGGEST_SIMILAR_QUESTION}
          renderItem={({item}) => renderSuggest(item)}
        />

        <View style={styles.frameButton}>
          <Text type="H5" center>
            Did'nt find what you are looking for?
          </Text>
          <ButtonLinear
            white
            styleButton={styles.styleButton}
            style={{marginTop: scale(16)}}
            title={'Send your question'}
            onPress={gotoSendSuccess}
          />
        </View>
      </View>
    );
  },
);

export default ModalSuggestSimilarQuestion;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(22),
    paddingBottom: scale(42) + getBottomSpace(),
    height: scale(650),
  },
  frame: {
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  frameButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    paddingLeft: scale(24),
    paddingRight: scale(24),
  },
  styleButton: {
    marginLeft: scale(24),
    marginRight: scale(24),
    width: '100%',
  },
  frameFlatList: {
    paddingLeft: scale(32),
    paddingRight: scale(32),
    paddingTop: scale(16),
    paddingBottom: scale(16),
  },
  flatList: {
    width: '100%',
    paddingLeft: scale(8),
    paddingRight: scale(8),
    paddingBottom: scale(16),
    
  },
  question: {
    marginTop: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
