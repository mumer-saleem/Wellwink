import React, { memo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "configs";
import Account from "container/Setting/Account";

const Stack = createNativeStackNavigator();

const SettingStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.SettingStack}
        component={Account}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default SettingStack;
