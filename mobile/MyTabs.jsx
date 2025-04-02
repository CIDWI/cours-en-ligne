import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FormScreen from './HomeStack';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator 
        screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ size }) => {
                let iconName;
                switch(route.name){
                    case('Accueil'): iconName = 'home-outline';
                    break;
                    case('Formulaire'): iconName = 'newspaper-outline';
                    break;
                }
            
                return <Ionicons name={iconName} size={size} color="red" />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: '#7f8c8d',
                tabBarLabelStyle: { fontSize: 10, fontWeight: 700 },
            })
            
        }
      >
      <Tab.Screen name="Accueil" component={HomeStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Formulaire" component={FormScreen} />
    </Tab.Navigator>
  );
}
