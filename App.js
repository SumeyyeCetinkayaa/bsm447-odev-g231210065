
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ListScreen from "./screens/ListScreen";
import DetailScreen from "./screens/DetailScreen";
import SavedScreen from "./screens/SavedScreen";

import { SavedProvider } from "./context/SavedContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#16a34a",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          title: "Karakterler",
          tabBarLabel: "Liste",
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: "Kaydedilenler",
          tabBarLabel: "Kaydedilenler",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SavedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                title: "Karakter Detayı",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SavedProvider>
    </SafeAreaProvider>
  );
}
