/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:51 PM
 *  Last update: 5 Jun 2024, 12:48:55 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { View, Text, Switch, Pressable, TouchableHighlight } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import styles from "./styles";
import { primaryColor } from "../../../includes/variables";

export default function Task({ id, description, completed, setCompleted, deleteTask }) {
    /**
     * Toggle the completed status of this task.
     */
    const toggleCompleted = () => {
        setCompleted(id, !completed);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{description}</Text>
            <View style={styles.switch}>
                {/* like on the form, pressable around the label to toggle switch */}
                <Pressable onPress={toggleCompleted}>
                    <Text style={styles.switchText}>Completed?</Text>
                </Pressable>
                <Switch
                    style={styles.switchSizing}
                    value={completed}
                    onValueChange={toggleCompleted}
                    trackColor={{ false: "#DDD", true: primaryColor }}
                    ios_backgroundColor="#DDD"
                    thumbColor="white"
                />
            </View>
            <Text style={styles.info}>ID: {id}</Text>
            {/* delete button, placed using position: absolute */}
            <TouchableHighlight
                style={styles.closeButton}
                onPress={() => deleteTask(id)}
                underlayColor="#CCC"
            >
                <Ionicons name="close" size={24} color="black" />
            </TouchableHighlight>
        </View>
    );
}