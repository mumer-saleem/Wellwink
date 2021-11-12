import React, { memo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "configs";
import MyRecord from "container/MyRecord/MyRecord";

const Stack = createNativeStackNavigator();

const MyRecordStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.MyRecordStack}
        component={MyRecord}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default MyRecordStack;
