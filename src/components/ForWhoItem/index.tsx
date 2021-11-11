import React, {memo, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Text from 'elements/Text';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import {Colors} from 'configs';
import Theme from 'style/Theme';
import {ICON} from 'images/Icon';
import Layout from 'elements/Layout/Layout';
import {useTheme} from 'configs/ChangeTheme';

interface ForWhoItemProps {
  moreAbout?: boolean;
  children?: any;
  dataPerson?: any;
  onPress?: (item: any) => void;
  multipleSelection?: boolean;
}

const ForWhoItem = memo(
  ({
    moreAbout,
    children,
    dataPerson,
    multipleSelection,
    onPress,
  }: ForWhoItemProps) => {
    const {theme} = useTheme();
    const [selectedTaker, setSelectedTaker] = useState(dataPerson);
    const [show, setShow] = useState<boolean>(true);
    const onMoreAbout = () => {
      setShow(!show);
    };

    const onPressSomeoneElse = useCallback(() => {
      dataPerson.push({id: dataPerson.length, firstName: 'Name'});
    }, [dataPerson]);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.forWho}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          {dataPerson.map(
            (item: any, index: number) => {
              const {firstName} = item;
              return (
                <Layout style={styles.content} key={index}>
                  {item.id == selectedTaker.id ? (
                    <>
                      <ButtonIcon
                        icon="account"
                        width={72}
                        height={72}
                        tintColor={Colors.White}
                        backgroundColor={Colors.DodgerBlue}
                        borderRadius={16}
                        onPress={() => {
                          setSelectedTaker(item);
                          onPress && onPress(item);
                        }}
                      />
                      <Text center size={13} lineHeight={22} marginTop={16}>
                        {firstName}
                      </Text>
                    </>
                  ) : (
                    <View>
                      <ButtonIcon
                        icon="account"
                        width={72}
                        height={72}
                        tintColor={Colors.GrayBlue}
                        borderColor={Colors.GrayBlue}
                        backgroundColor={theme.backgroundItem}
                        borderRadius={16}
                        onPress={() => {
                          setSelectedTaker(item);
                        }}
                      />
                      <Text
                        center
                        size={13}
                        lineHeight={22}
                        color={Colors.GrayBlue}
                        marginTop={16}>
                        {firstName}
                      </Text>
                    </View>
                  )}
                </Layout>
              );
            },
            [dataPerson],
          )}
          <View style={styles.content}>
            <ButtonIcon
              icon="account"
              width={72}
              height={72}
              backgroundColor={theme.backgroundItem}
              tintColor={Colors.GrayBlue}
              borderColor={Colors.GrayBlue}
              borderRadius={16}
              onPress={onPressSomeoneElse}
            />
            <Text
              center
              size={13}
              lineHeight={22}
              color={Colors.GrayBlue}
              marginTop={16}>
              Someone Else
            </Text>
          </View>
        </ScrollView>
        {moreAbout ? (
          <View>
            <View style={Theme.flexRowSpace}>
              <Text bold size={15} lineHeight={18}>
                More About {selectedTaker.name}
              </Text>
              {show ? (
                <TouchableOpacity
                  style={styles.showIcon}
                  activeOpacity={0.54}
                  onPress={onMoreAbout}>
                  <Image
                    source={ICON.arrUp}
                    style={{tintColor: Colors.White}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.showIcon}
                  activeOpacity={0.54}
                  onPress={onMoreAbout}>
                  <Image
                    source={ICON.arrowDown}
                    style={{tintColor: Colors.White}}
                  />
                </TouchableOpacity>
              )}
            </View>
            {show ? <View>{children}</View> : <></>}
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  },
);

export default ForWhoItem;

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    maxHeight: 500,
  },
  forWho: {
    ...Theme.flexRow,
    flexWrap: 'wrap',
    paddingHorizontal: 32,
  },
  content: {
    marginHorizontal: 12,
    marginBottom: 24,
    ...Theme.center,
  },
  showIcon: {
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 4,
    padding: 4,
  },
});
