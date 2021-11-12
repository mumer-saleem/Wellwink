import React, { memo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "configs";
import MyPlus from "container/MyPlus/MyPlus";
 
const Stack = createNativeStackNavigator();
const MyPlusStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.MyPlusStack}
        component={MyPlus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default MyPlusStack;
