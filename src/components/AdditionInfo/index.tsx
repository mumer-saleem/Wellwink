import React, {Dispatch, memo, SetStateAction} from 'react';
import {View, StyleSheet, Image, ViewStyle} from 'react-native';
import Text from '../../elements/Text';
import {Colors} from '../../configs';
import scale from '../../utils/scale';
import SettingItem from '../AskFreeQuestion/SettingItem';
import {dataAddition} from '../../type/healthyQuestion';
import {ICON} from '../../images/Icon';
import {condition} from '../../type/condition';
import ButtonIconText from '../../elements/Buttons/ButtonIconText';
import Theme from '../../style/Theme';
import Layout from '../../elements/Layout/Layout';
import Line from '../../elements/Layout/Line';
import {themes, useTheme} from '../../configs/ChangeTheme';

interface Props {
  data: Array<dataAddition>;
  onPress: (item: dataAddition) => void;
  onPressAdd: () => void;
  onPressMore: Dispatch<SetStateAction<condition>>;
  setModalMore: Dispatch<SetStateAction<number>>;
  openModalMore: () => void;
  selectHealthyData?: boolean;
}

const AdditionInfo = memo((props: Props) => {
  const {theme} = useTheme();
  return (
    <Layout style={styles.container}>
      <View style={styles.contentHeader}>
        <Image source={ICON.account} style={styles.contentHeaderIcon} />
        <Text marginLeft={16} bold size={15}>
          Additional Information
        </Text>
      </View>
      <Line />
      <View style={{padding: scale(24)}}>
        {props.data.map((item: dataAddition, index) => {
          return (
            <SettingItem
              style={{marginTop: index == 0 ? scale(24) : scale(36)}}
              enable={item.check}
              onSwitch={() => {
                props.onPress(item);
              }}
              title={item.title}
              isSwitch={true}
              condisitons={item.conditions}
              onPressAdd={() => {
                props.onPressAdd();
              }}
              onPressMore={props.onPressMore}
              setModalMore={props.setModalMore}
              openModalMore={props.openModalMore}
            />
          );
        })}
      </View>
      {props.selectHealthyData ? (
        <View style={styles.frameHealth}>
          <Text size={13} lineHeight={16} bold>
            Sync with Health Services
          </Text>
          <Text size={13} lineHeight={22} marginTop={scale(16)}>
            By importing your health data from Smart{'\n'}Devices, Doctor can
            better help you.
          </Text>
          <ButtonIconText
            borderColor={theme.text_placeholder}
            icon={'healthyBlue'}
            iconStyle={styles.iconstyle}
            title={'Add Attachments'}
            titleColor={Colors.GrayBlue}
            textProps={{bold: true, size: 15, lineHeight: 18, marginLeft: 8}}
            style={styles.styleButton}
          />
          <View style={styles.buttonSecurity}>
            <Image style={styles.iconSecurity} source={ICON.security} />
            <Text size={11} lineHeight={14}>
              {'HIPAA Secure'}
            </Text>
          </View>
        </View>
      ) : null}
    </Layout>
  );
});

export default AdditionInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
  },
  frameImg: {
    flexDirection: 'row',
    padding: scale(16),
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: Colors.WhiteSmoke,
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
    marginTop: scale(24),
    borderWidth: 1,
  },
  iconSecurity: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(8),
  },
  frameHealth: {
    marginTop: scale(12),
    padding: scale(24),
    borderTopWidth: scale(1),
    borderTopColor: Colors.WhiteSmoke,
  },
  buttonSecurity: {
    ...Theme.flexRowCenter,
    marginTop: scale(8),
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
