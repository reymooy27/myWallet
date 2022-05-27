import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTransactionScreen from './screens/AddTransactionScreen';
import Homescreen from './screens/HomeScreen';
import ContextWraper from './context';

const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <ContextWraper>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={Homescreen} />
          <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextWraper>
  );
};

export default App;
