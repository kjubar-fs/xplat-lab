/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 15 Jul 2024, 10:51:40 AM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';

// toasts
import Toast from "react-native-toast-message";

import { store } from "./src/data/state/store";

import styles from "./src/styles/structure";
import Header from "./src/components/Header";
import Tasks from "./src/components/Tasks";
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";
import { primaryColor } from "./src/includes/variables";
import { Provider } from "react-redux";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <>
            <Provider store={store}>
                <NavigationContainer>
                    <View style={styles.container}>
                        <StatusBar style="light" />
                        
                        <Header />

                        <Tab.Navigator screenOptions={{
                            tabBarActiveTintColor: primaryColor,
                            tabBarStyle: {
                                paddingTop: 3,
                                paddingBottom: 7,
                            },
                        }}>
                            <Tab.Screen
                                name="TasksScreen"
                                options={{
                                    title: "Tasks",
                                    headerShown: false,
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialIcons
                                            name="checklist"
                                            size={size}
                                            color={color}
                                        />
                                    ),
                                }}
                                component={Tasks}
                            />

                            <Tab.Screen
                                name="AddTaskScreen"
                                options={{
                                    title: "Add Task",
                                    tabBarIcon: ({ color, size }) => (
                                        <MaterialIcons
                                            name="playlist-add"
                                            size={size}
                                            color={color}
                                        />
                                    ),
                                }}
                                component={Form}
                            />
                        </Tab.Navigator>

                        <Footer />
                    </View>
                </NavigationContainer>
            </Provider>

            <Toast />
        </>
    );
}