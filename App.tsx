import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './src/store/AuthContext';
import { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TestSelectionScreen from './src/screens/TestSelectionScreen';
import TestScreen from './src/screens/TestScreen';
import ResultScreen from './src/screens/ResultScreen';
import { initializeAdMob } from './src/utils/admob';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();


function Tabs() {
return (
<Tab.Navigator
screenOptions={({ route }) => ({
headerShown: false,
tabBarIcon: ({ color, size }) => {
const map: Record<string, any> = {
Home: 'home',
About: 'information-circle',
Profile: 'person',
Tests: 'school'
};
const name = map[route.name] || 'ellipse';
return <Ionicons name={name as any} size={size} color={color} />;
},
})}
>
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Tests" component={TestSelectionScreen} />
<Tab.Screen name="About" component={AboutScreen} />
<Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
);
}

function AppNavigator() {
const { user } = useAuth();

if (!user) {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
<Stack.Screen name="Signin" component={SigninScreen} />
<Stack.Screen name="Signup" component={SignupScreen} />
</Stack.Navigator>
);
}

return (
  <Stack.Navigator>
    <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    <Stack.Screen name="TestSelection" component={TestSelectionScreen} options={{ title: 'Testlar' }} />
    <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Test' }} />
    <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Natija' }} />
  </Stack.Navigator>
);
}


function AppContent() {
  const scheme = useColorScheme();

  useEffect(() => {
    initializeAdMob();
  }, []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
return (
<AuthProvider>
<AppContent />
</AuthProvider>
);
}