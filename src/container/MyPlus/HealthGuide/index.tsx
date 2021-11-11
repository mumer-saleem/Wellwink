import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'configs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {HEALTH_GUIDE} from 'configs/Data';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Text from 'elements/Text';
import ScrollableTab from 'elements/ScrollableTab';
import All from 'components/MyPlus/All';
import Healthy from 'components/MyPlus/Healthy';
import Conditions from 'components/MyPlus/Conditions';
import Children from 'components/MyPlus/Children';
import Parents from 'components/MyPlus/Parents';
import Theme from 'style/Theme';
import ButtonText from 'elements/Buttons/ButtonText';
import SearchBox from 'elements/SearchBox';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useTheme} from 'configs/ChangeTheme'

import Container from 'elements/Layout/Container';

export default memo(() => {
  const {setOptions, navigate} = useNavigation();
  const [searchKey, setSearchKey] = React.useState<string>('');
  const [all, setAll] = React.useState<any[]>();
  const [searchView, setShowSearchView] = React.useState<boolean>(false);
  const {theme} = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      setAll(HEALTH_GUIDE);
    }, []),
  );

  const handleSearch = React.useCallback(() => {
    setShowSearchView(true);
  }, []);

  const handleCancelSearch = React.useCallback(() => {
    setShowSearchView(false);
  }, []);

  const headerStyle = searchView
    ? {...Theme.headerStyle, backgroundColor: theme.background}
    : {...Theme.headerStyle, backgroundColor: theme.background};

  

  const renderHeader = React.useCallback(() => {
    return (
      <Text marginTop={24} marginLeft={24} bold size={24} lineHeight={28}>
        Health Guides
      </Text>
    );
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleCancelSearch}
      style={[styles.container, {backgroundColor: theme.backgroundItem}]}>
      <View style={[styles.header, headerStyle]}>
        {searchView ? (
          <SearchBox
            placeholder={'Find Health Guides'}
            value={searchKey}
            onChangeText={setSearchKey}
            style={styles.search}
            autoFocus={true}
          />
        ) : (
          <ButtonIconHeader tintColor={theme.text} />
        )}
        {searchView ? (
          <ButtonText
            onPress={handleCancelSearch}
            marginLeft={24}
            title={'Cancel'}
          />
        ) : (
          <Container style={{flexDirection: 'row'}}>
            <ButtonIconHeader
              icon={'search'}
              tintColor={Colors.DodgerBlue}
              borderColor={Colors.DodgerBlue}
              marginLeft={24}
              onPress={handleSearch}
            />
          </Container>
        )}
      </View>

      {!searchView && (
        <ScrollableTab
          titles={['All', 'Healthy', 'Conditions', 'Children', 'Parents']}
          labelStyle={styles.labelStyle}
          renderHeader={renderHeader}>
          <All data={all} />
          <Healthy />
          <Conditions />
          <Children />
          <Parents />
        </ScrollableTab>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  search: {
    flex: 1,
    borderWidth: 0,
  },
  header: {
    paddingTop: getStatusBarHeight() + 24,
    paddingBottom: 12,
    minHeight: 108,
    paddingHorizontal: 24,
    ...Theme.flexRowSpace,
  },
});
