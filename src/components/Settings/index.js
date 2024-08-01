/*
 *  Author: Kaleb Jubar
 *  Created: 1 Aug 2024, 11:00:36 AM
 *  Last update: 1 Aug 2024, 11:42:06 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Pressable, Switch, Text, View } from "react-native";
import styles from "./styles";

export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={styles.settingContainer}>
                <Text style={styles.settingName}>Notifications</Text>
                <Text style={styles.settingDetail}>Set a reminder to update tasks daily.</Text>

                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{ false: "#DDD", true: "#B38B9D" }}
                        ios_backgroundColor="#DDD"
                        thumbColor="white"
                    />
                    <Pressable>
                        <Text>Send Daily Reminder</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}