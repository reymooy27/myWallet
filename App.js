import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from './screens/AddTransactionScreen';
import Homescreen from './screens/HomeScreen';
import ContextWraper from './context';
import SetInitialBalanceScreen from './screens/SetInitialBalanceScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ContextWraper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={Homescreen} />
          <Stack.Screen
            name="AddTransactionScreen"
            component={AddTransactionScreen}
          />
          <Stack.Screen
            name="SetInitialBalanceScreen"
            component={SetInitialBalanceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextWraper>
  );
};

export default App;
