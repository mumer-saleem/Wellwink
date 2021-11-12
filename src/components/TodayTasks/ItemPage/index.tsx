import React, {memo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../../../elements/Text';
import Theme from '../../../style/Theme';
import scale from '../../../utils/scale';

interface ItemProps {
  image: string;
  header: string;
  content: string;
}

const ItemPage = memo((props: ItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        // @ts-ignore
        source={props.image}
        style={styles.img}
      />
      <View style={Theme.flexOne}>
        <Text size={scale(15)} lineHeight={scale(24)} bold>
          {props.header}
        </Text>
        <Text size={scale(13)} lineHeight={scale(16)} marginTop={scale(8)}>
          {props.content}
        </Text>
      </View>
    </View>
  );
});

export default ItemPage;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(32),
    borderRadius: scale(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  isRead: {
    opacity: 0.5,
  },
  img: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(16),
    margin: scale(3),
  },
});
