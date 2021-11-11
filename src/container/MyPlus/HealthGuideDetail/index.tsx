import React, {memo, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Colors} from 'configs';
import {useNavigation} from '@react-navigation/native';
import Theme from 'style/Theme';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {width} from 'configs/Const';
import Text from 'elements/Text';
import {ICON} from 'images/Icon';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import ScrollViewAnimatedHeader from 'components/ScrollViewAnimatedHeader';
import Container from 'elements/Layout/Container';
import Layout from 'elements/Layout/Layout';
import scale from 'utils/scale';
import Content from 'elements/Layout/Content';
import {useTheme} from 'configs/ChangeTheme'
import SearchBox from 'elements/SearchBox';
import ButtonText from 'elements/Buttons/ButtonText';

export default memo(({route}: any) => {
  const {navigate, goBack} = useNavigation();
  const {
    image,
    title,
    quantity,
    avatar,
    name,
    faculty,
    action,
    category,
    gender,
    age,
    content,
  } = route?.params;
  const [searchView, setShowSearchView] = React.useState<boolean>(false);
  const [searchKey, setSearchKey] = React.useState<string>('');
  const handleSearch = React.useCallback(() => {
    setShowSearchView(true);
  }, []);

  const handleCancelSearch = React.useCallback(() => {
    setShowSearchView(false);
  }, []);
  const {theme} = useTheme();
  const {setOptions} = useNavigation();
  React.useLayoutEffect(() => {
    setOptions({
      title: null,
      header: () => (
        <Container style={styles.header}>
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
        </Container>
      ),
    });
  }, [searchView]);

  return (
    <Container style={styles.container}>
      <Content>
        <ImageBackground style={styles.image} source={image} />
        <Container style={styles.content}>
          <View style={styles.label}>
            <Image
              style={{tintColor: Colors.White, marginRight: 4}}
              source={ICON.rateFull}
            />
            <Text marginTop={4} size={10} bold color={Colors.Snow}>
              RECOMMENDED
            </Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text>{quantity}</Text>
          <View style={styles.createBy}>
            <Text>Created by</Text>
            <View style={{...Theme.flexRow}}>
              <Image style={styles.avatar} source={avatar} />
              <View>
                <Text color={Colors.DodgerBlue} bold={true}>
                  {name}
                </Text>
                <Text size={13} lineHeight={16} marginTop={4}>
                  {faculty}
                </Text>
              </View>
            </View>
            <Text>
              {action} a health guide on
              <Text color={Colors.DodgerBlue}> {category}</Text>
            </Text>
          </View>
          <View style={styles.scroll}>
            <View style={{...Theme.flexRow}}>
              <Image style={styles.icon} source={ICON.accountNormal} />
              <Text style={styles.contentTitle}>For Patient who</Text>
            </View>
            <View style={styles.detail}>
              <Text>are {gender}</Text>
              <Text>over {age} years of age </Text>
            </View>
            <View style={{...Theme.flexRow}}>
              <View style={styles.icon}>
                <Image
                  style={{tintColor: Colors.TiffanyBlue}}
                  source={ICON.checkMark}
                />
              </View>
              <Text style={styles.contentTitle}>What Patient will do</Text>
            </View>
            <View style={styles.detail}>
              {content &&
                content.map((item: any, index: number) => {
                  const {frequency, description} = item;
                  return (
                    <View key={index} style={styles.contentStyle}>
                      <Text size={15} marginBottom={4}>
                        {description}
                      </Text>
                      <Text color={Colors.GrayBlue}>{frequency}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </Container>
      </Content>
      <Layout style={styles.buttonView}>
        <ButtonLinear white  style={styles.unEnroll} title={'Enroll'} />
      </Layout>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    marginBottom: getBottomSpace() + scale(102),
  },
  label: {
    backgroundColor: Colors.Orange,
    height: 16,
    borderRadius: 2,
    maxWidth: 100,
    ...Theme.flexRow,
    ...Theme.center,
  },
  image: {
    width: '100%',
    height: 264,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
    width: '100%',
  },
  title: {
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 24,
  },
  createBy: {
    marginTop: 32,
    marginBottom: 48,
  },
  avatar: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  detail: {
    marginLeft: 48,
    marginBottom: 40,
    marginTop: 16,
    marginRight: 24,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: Colors.TealBlue20,
    ...Theme.center,
  },
  button: {
    backgroundColor: Colors.DodgerBlue,
  },
  search: {
    flex: 1,
    borderWidth: 0,
  },
  advice: {
    marginVertical: 24,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 12,
  },
  contentStyle: {
    marginBottom: 16,
  },

  contentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  header: {
    paddingTop: getStatusBarHeight() + 24,
    paddingBottom: 12,
    minHeight: 108,
    paddingHorizontal: 24,
    ...Theme.flexRowSpace,
  },
  unEnroll: {
    marginTop: 12,
  },

  buttonOpacity: {
    opacity: 0.2,
    backgroundColor: Colors.DarkJungleGreen,
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
