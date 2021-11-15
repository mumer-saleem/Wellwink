import React, {memo, useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Image} from 'react-native';
import {Colors, Routes} from 'configs';
import Theme from 'style/Theme';
import HeaderButton from 'elements/HeaderButton';
import scale from 'utils/scale';
import Text from 'elements/Text';
import ItemPage from 'components/TodayTasks/ItemPage';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import {Tasks} from 'type/tasks';
import {ICON} from 'images/Icon';
import {useLayoutEffect} from 'react';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';

const TodayTasksDetail = memo(({route}: any) => {
  const {navigate, setOptions} = useNavigation();
  const [data, setData] = useState<Tasks>();
  const {theme} = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      setData(route.params);
    }, []),
  );
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <View style={{backgroundColor: theme.background, flex: 1}} />
      ),
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
    });
  }, [setOptions]);
  function onDoneTasks() {
    const params = {id: data?.id, check: true};
    navigate(Routes.TodayTask, params);
  }
  return (
    <Layout style={styles.container}>
      <View>
        <Text size={scale(24)} lineHeight={scale(28)} bold={true}>
          {data?.content}
        </Text>
        <Text
          size={scale(13)}
          lineHeight={scale(16)}
          color={Colors.GrayBlue}
          marginTop={scale(16)}>
          Health Guide:
          <Text
            size={scale(13)}
            lineHeight={scale(16)}
            color={Colors.MediumTurquoise}>
            {' '}
            Caring for Your Toodler
          </Text>
        </Text>
        <ItemPage
          image={ICON.calendar}
          header={'Start Date'}
          content={data?.start_date || 'As soon as the Health Guide begins'}
        />
        <ItemPage
          image={ICON.calendar}
          header={'End Date'}
          content={data?.end_date || 'Never'}
        />
        <ItemPage
          image={ICON.time}
          header={'Frequency'}
          content={data?.frequency || 'undefined'}
        />
        <ItemPage
          image={ICON.topic}
          header={'Description'}
          content={data?.decription || 'undefined'}
        />
        {data?.check ? null : (
          <ButtonLinear white 
            title={"I'm Done!"}
            leftChildren={
              <Image source={ICON.checkMark} style={styles.buttonChildren} />
            }
            style={styles.buttonLinear}
            onPress={onDoneTasks}
          />
        )}
      </View>
    </Layout>
  );
});
export default TodayTasksDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(24),
    paddingTop: scale(40),
  },
  buttonChildren: {
    ...Theme.icons,
    marginRight: scale(8),
  },
  buttonLinear: {
    marginTop: scale(68),
  },
});
