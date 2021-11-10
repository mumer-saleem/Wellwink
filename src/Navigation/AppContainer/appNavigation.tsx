import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 


const Stack = createNativeStackNavigator();

function appNavigation() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default appNavigation;

 