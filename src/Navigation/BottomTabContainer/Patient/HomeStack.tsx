import React, { memo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "configs";
import Home from "container/HomeDashboard/Home";

 
const Stack = createNativeStackNavigator();
const HomeStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default HomeStack;
