import React, {memo, useCallback} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Text from 'elements/Text';
import scale from 'utils/scale';
import Theme from 'style/Theme';
import {Colors} from 'configs';
import DoctorInformation from 'components/DoctorInformation';
import Container from 'elements/Layout/Container';

interface ModalShowDoctorAgreeProps {
  data: any;
}

const ModalShowDoctorAgree = memo(({data}: ModalShowDoctorAgreeProps) => {
  const renderItem = useCallback(({item}) => {
    const onPress = () => {};
    return <DoctorInformation {...item} nameColor={Colors.DodgerBlue} />;
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text bold size={17} lineHeight={20}>
          Doctors agree
        </Text>
        <Text size={15} lineHeight={18} color={Colors.GrayBlue} marginLeft={8}>
          {data.length}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
});

export default ModalShowDoctorAgree;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: scale(561, true),
  },
  header: {
    ...Theme.flexRow,
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
    paddingBottom: 24,
    paddingLeft: 24,
  },
  contentContainerStyle: {
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
  },
});
