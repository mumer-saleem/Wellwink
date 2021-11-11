import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import {width} from 'configs/Const';
import Text from 'elements/Text';
import NumberAnswered from 'components/NumberAnswered';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import {useTheme} from 'configs/ChangeTheme';

import Layout from 'elements/Layout/Layout';
import Line from 'elements/Layout/Line';
interface Props {
  style?: any;
  subTitle?: string;
  question: string;
  numberOfAnswers: number;
  doctor: {
    avatar: ImageSourcePropType;
    name: string;
  };
  image: ImageSourcePropType;
  answer: string;
  onPress: () => void;
  onOptionPress: () => void;
}

export default memo(
  ({
    style,
    subTitle,
    question,
    numberOfAnswers,
    doctor,
    image,
    answer,
    onPress,
    onOptionPress,
  }: Props) => {
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {backgroundColor: theme.backgroundItem},
        ]}
        onPress={onPress}
        activeOpacity={0.54}>
        {subTitle && (
          <Text size={13} lineHeight={16}>
            {subTitle}
          </Text>
        )}
        <Text marginTop={4} size={17} lineHeight={25} semiBold>
          {question}
        </Text>
        <NumberAnswered {...{numberOfAnswers}} />
        <Line />
        <Layout style={{...Theme.flexRowSpace, paddingVertical: 12}}>
          <View style={{...Theme.flexRow}}>
            <Image style={styles.avatar} source={doctor.avatar} />
            <Text
              color={Colors.DodgerBlue}
              size={13}
              lineHeight={16}
              bold
              marginLeft={12}>
              Dr.{doctor.name}
            </Text>
            <Text size={13} lineHeight={16} marginLeft={4}>
              answered
            </Text>
          </View>

          <ButtonIcon
            backgroundColor={'transparent'}
            icon={'option'}
            tintColor={Colors.GrayBlue}
            onPress={onOptionPress}
          />
        </Layout>
        <Image
          source={image}
          style={{marginLeft: -16, width: width - 48, marginBottom: 12}}
        />
        <Text size={13} lineHeight={22}>
          {answer}
        </Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    ...Theme.shadow,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
});
