/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:32 PM
 *  Last update: 18 Jul 2024, 11:10:10 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
// React Native components
import { View, Text, TextInput, Switch, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";

// hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// toasts
import Toast from "react-native-toast-message";

// database
import { addTask } from "../../data/db";

// local vars
import styles from "./styles";
import { primaryColor } from "../../includes/variables";

export default function Form({ navigation }) {
    // create state for inputs and error message
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // dispatch for redux
    const dispatch = useDispatch();

    /**
     * Handler for add button press.
     * Checks if the description is filled out and shows an error
     * if blank, otherwise adds the task to the list and resets
     * the form.
     */
    const addTodo = () => {
        // check if we have a description
        if (description.trim() === "") {
            // we don't, so error
            setError("Description is required.");
            return;
        }

        // async IIFE for adding task
        (async () => {
            // call add task db function
            setSaving(true);
            const success = await addTask({
                description,
                completed,
            }, dispatch);
            setSaving(false);

            if (!success) {
                setError("Add failed, try again later.");
                return;
            }
    
            // reset form fields
            setError("");
            setDescription("");
            setCompleted(false);
    
            // navigate back to task list
            navigation.navigate("TasksScreen");

            // show a toast
            Toast.show({
                type: "success",
                text1: "Add Succeeded",
                text2: `Successfully added "${description}" to the list!`,
            });
        })();
    }

    if (saving) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryColor} />
                <Text style={styles.loadingText}>Saving, please wait...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* conditionally display the error message if it exists */}
            {error &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorTitle}>Error:</Text>
                    <Text style={styles.errorItem}>{error}</Text>
                </View>}

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.textInput}
                value={description}
                multiline={true}
                onChangeText={setDescription}
            />

            <View style={styles.switch}>
                {/* pressable wrapper for the label to trigger the switch on tap */}
                <Pressable onPress={() => setCompleted(!completed)}>
                    <Text style={styles.switchText}>Completed:</Text>
                </Pressable>
                <Switch
                    value={completed}
                    onValueChange={setCompleted}
                    trackColor={{ false: "#DDD", true: "#B38B9D" }}
                    ios_backgroundColor="#DDD"
                    thumbColor="white"
                />
            </View>
            
            {/* I use a TouchableOpacity here instead of Button to control the style
                better, since the dark form background makes it difficult to have
                both platforms look decent */}
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={addTodo}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}