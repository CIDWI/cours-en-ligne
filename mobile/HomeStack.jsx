// HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './pages/Form';
import { View, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Formulaire" onPress={() => navigation.navigate('Formulaire')}/>
    </View>
  );
}

function FormScreen() {
  return (
    <Form />
  );
}

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="FormMain" component={FormScreen} options={{ title: 'Form' }} />
    </Stack.Navigator>
  );
}
