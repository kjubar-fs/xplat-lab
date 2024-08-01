/*
 *  Author: Kaleb Jubar
 *  Created: 1 Aug 2024, 11:00:36 AM
 *  Last update: 1 Aug 2024, 1:23:20 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState, useEffect } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

import styles from "./styles";
import { primaryColor } from "../../includes/variables";

const DAILY_REMINDER_TYPE = "todoDailyReminder";

export default function Settings() {
    const [dailyReminder, setDailyReminder] = useState(false);
    const [settingsErr, setSettingsErr] = useState(null);
 
    // check if a reminder is set
    useEffect(() => {
        (async () => {
            const reminderId = await getReminderId();
            if (reminderId) {
                setDailyReminder(true);
            }
        })();
    }, []);

    /**
     * Toggle the daily reminder.
     */
    const toggleDailyReminder = async () => {
        // if a reminder isn't set, check permissions and set one
        if (!dailyReminder) {
            try {
                // check for permission
                const perms = await Notifications.getPermissionsAsync();
                
                // ask for permission if we don't have permission
                if (!hasNotifPermission(perms)) {
                    const request = await Notifications.requestPermissionsAsync({
                        ios: {
                            allowAlert: true,
                            allowSound: true,
                            allowBadge: true,
                        },
                    });
                    
                    if (!hasNotifPermission(request)) {
                        setSettingsErr("Enable notifications in your phone settings to turn on reminders.")
                        return;
                    }
                }
            
                // schedule notification
                const id = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Post Reminder",
                        body: "Have you posted in your diary already?",
                        sound: true,
                        color: primaryColor,
                        data: {
                            type: DAILY_REMINDER_TYPE,
                        },
                    },
                    trigger: {
                        seconds: 10,
                        // hour: 13,
                        // minute: 6,
                        repeats: true,
                    },
                });
                
                if (!id) {
                    setSettingsErr("Unable to schedule reminder, try again later.");
                }

                // clear error and set switch to true
                setSettingsErr(null);
                setDailyReminder(true);
            } catch(err) {
                setSettingsErr(`Something went wrong scheduling reminder: ${err}`);
            }
        } else {
            // cancel notification
            const id = await getReminderId();

            // show an error if no reminder set
            if (!id) {
                setSettingsErr("Unable to cancel reminder: no reminder is set.");
                return;
            }
            
            // cancel and turn off switch
            await Notifications.cancelScheduledNotificationAsync(id);
            setDailyReminder(false);
        }
    };

    return (
        <View style={styles.container}>
            {settingsErr &&
                <View style={styles.settingContainer}>
                    <Text style={{
                        ...styles.error,
                        ...styles.settingName,
                    }}>
                        Error:
                    </Text>
                    <Text style={styles.error}>
                        {settingsErr}
                    </Text>
                </View>
                }
            <View style={styles.settingContainer}>
                <Text style={styles.settingName}>Notifications</Text>
                <Text style={styles.settingDetail}>Set a reminder to update tasks daily.</Text>

                <View style={styles.switchContainer}>
                    <Switch
                        value={dailyReminder}
                        onValueChange={toggleDailyReminder}
                        trackColor={{ false: "#DDD", true: "#B38B9D" }}
                        ios_backgroundColor="#DDD"
                        thumbColor="white"
                    />
                    <Pressable onPress={toggleDailyReminder}>
                        <Text>Send Daily Reminder</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

/**
 * Get the notification identifier of the currently active reminder, if there is one.
 * @returns notification ID, or null if none scheduled
 */
async function getReminderId() {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    
    // check if we have a reminder scheduled
    if (scheduled && scheduled.length !== 0) {
        const id = scheduled.find((notif) => notif.content.data.type === DAILY_REMINDER_TYPE).identifier;
        if (id) {
            return id;
        }
    }

    // none found, return null
    return null;
}

/**
 * Check if we have permission to send notifications.
 * This checks both general and iOS-specific status.
 * @param {Notifications.NotificationPermissionsStatus} status status returned from Notifications API
 */
function hasNotifPermission(status) {
    return status.granted || status.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}