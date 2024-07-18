/*
 *  Author: Kaleb Jubar
 *  Created: 26 Oct 1985, 4:15:00 AM
 *  Last update: 18 Jul 2024, 10:05:17 AM
 *  Copyright (c) 1985 - 2024 Kaleb Jubar
 */
// React Native/Expo components
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';

// toasts
import Toast from "react-native-toast-message";

// state and database
import { Provider } from "react-redux";
import { store } from "./src/data/state/store";
import DataLoader from "./src/components/DataLoader";

// local vars
import styles from "./src/styles/structure";
import { primaryColor } from "./src/includes/variables";

// custom components
import Header from "./src/components/Header";
import Tasks from "./src/components/Tasks";
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <>
            <Provider store={store}>
                <DataLoader />
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

            <Toast position="bottom" bottomOffset={120} />
        </>
    );
}