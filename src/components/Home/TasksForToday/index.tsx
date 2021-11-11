import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'elements/Text';
import Theme from 'style/Theme';
import {Colors} from 'configs';
import ImageBackgroundCustom from 'components/TodayTasks/ImageBackgroundCustom';
import Container from 'elements/Layout/Container';

interface ConsultForTodayProps {
  step: number;
  onPress?: () => void;
}

const TaskstForToday = memo((props: ConsultForTodayProps) => {
  return (
    <Container style={styles.container}>
      <Container>
        <Text size={24} lineHeight={28} bold={true}>
          Tasks
          <Text size={24} lineHeight={28}>
            {' '}
            for today
          </Text>
        </Text>
        <Text
          size={13}
          lineHeight={16}
          color={Colors.GrayBlue}
          marginTop={8}
          text_placeholder>
          {props.step || 5} of 9 completed
        </Text>
      </Container>
      <ImageBackgroundCustom number={10 - props.step} onPress={props.onPress} />
    </Container>
  );
});

export default TaskstForToday;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    justifyContent: 'space-between',
  },
});
