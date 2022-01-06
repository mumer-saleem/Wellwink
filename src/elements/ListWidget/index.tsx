import React, {memo} from 'react';
import {
  View,
  StyleSheet,FlatList,
  TouchableOpacity,
  ViewStyle,
  Image,
  ColorValue,
} from 'react-native';
import Text from 'elements/Text';
import {Colors} from 'configs';
import Theme from 'style/Theme';

interface ListWidgetProps {
  data:any[] | null | undefined,
  renderItem?: any,
  keyExtractor?: any,
  onEndReached?:any, 
  refreshing?: boolean
  showsVerticalScrollIndicator?: boolean,
  scrollEventThrottle?: number | undefined,
  headerComponent?:any,
  footerComponent?:any,
  onRefresh?:any,
  contentContainerStyle:any
 }

const ListWidget = memo((props: ListWidgetProps) => {
   const { data, renderItem, onEndReached, onRefresh, headerComponent, footerComponent,showsVerticalScrollIndicator, scrollEventThrottle,contentContainerStyle} = props

  return (
     <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item:any, index:any) => index}
      ListEmptyComponent={() => <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}><Text> Nothing to display</Text></View>}
      ListFooterComponent={footerComponent}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      scrollEventThrottle={scrollEventThrottle}
      refreshing={false}
      onRefresh={onRefresh}
      ListHeaderComponent={headerComponent}
      contentContainerStyle={contentContainerStyle}
    />
 
  );
});

export default ListWidget;

const styles = StyleSheet.create({
  container: {},
});
