import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Camera from './components/Camera';
import AllPictures from './components/AllPictures';
import Folders from './components/Folders';
import PicturesInFolder from './components/PicturesInFolder';
import React from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FolderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MesDossiers" 
        component={Folders} 
        options={{ title: 'Mes Dossiers' }} 
      />
      <Stack.Screen 
        name="PicturesInFolder" 
        component={PicturesInFolder} 
        options={({ route }) => ({ title: route.params?.folderName || 'Dossier' })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          <Tab.Screen 
            name="Capture" 
            component={Camera} 
            options={{ title: 'Prendre une photo' }}
          />
          <Tab.Screen 
            name="Galerie" 
            component={AllPictures} 
            options={{ title: 'Toutes les photos' }}
          />
          <Tab.Screen 
            name="DossiersTab" 
            component={FolderStack} 
            options={{ title: 'Dossiers', headerShown: false }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

