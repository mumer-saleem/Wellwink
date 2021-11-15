import React, { memo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "configs";
import Search from "container/Search/Search";

const Stack = createNativeStackNavigator();

const SearchStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.SearchStack}
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default SearchStack;
