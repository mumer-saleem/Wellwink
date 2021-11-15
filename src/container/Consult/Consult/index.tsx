import React, {useLayoutEffect} from 'react';
import {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollableTab from 'elements/ScrollableTab';
import {Colors, Routes} from 'configs';
import PastConsults from 'components/Consults/PastConsults';
import {useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Theme from 'style/Theme';
import NextConsults from 'components/Consults/NextConsults';
import {useTheme} from 'configs/ChangeTheme';
import Container from 'elements/Layout/Container';

export default memo(() => {
  const {setOptions, navigate} = useNavigation();
  const onCalendar = () => {
    navigate(Routes.ConsultCalendar);
  };
  const onAddNew = () => {};
  const {theme} = useTheme();

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        backgroundColor: theme.background,
        shadowColor: 'transparent',
        elevation: 0,
        marginBottom: 16,
      },
      headerLeft: () => (
        <ButtonIconHeader marginLeft={24} tintColor={theme.text} />
      ),
      headerRight: () => (
        <View style={Theme.flexRow}>
          <ButtonIconHeader
            onPress={onCalendar}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            icon="calendar"
            marginRight={24}
          />
          <ButtonIconHeader
            onPress={onAddNew}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            icon="plus"
            marginRight={24}
          />
        </View>
      ),
    });
  });

  return (
    <Container style={styles.container}>
      <ScrollableTab
        titles={[`Next Consults`, `Past Consult`]}
        labelStyle={styles.labelStyle}>
        <View style={Theme.flexRow}>
          <NextConsults />
        </View>
        <View style={Theme.flexRow}>
          <PastConsults />
        </View>
      </ScrollableTab>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 28,
  },
  calendar: {},
});
