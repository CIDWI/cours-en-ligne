import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MyTabs from './MyTabs';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MyTabs />
    </NavigationContainer>
  );
}

