/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:32 PM
 *  Last update: 31 May 2024, 5:46:51 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { useState } from "react";
import { View, Text, TextInput, Switch, Pressable, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function Form({ addTaskCallback }) {
    // create state for inputs and error message
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");

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

        // call up to the root to add the task to the list
        addTaskCallback(description, completed);

        // reset form fields
        setError("");
        setDescription("");
        setCompleted(false);
    }

    return (
        <View style={styles.container}>
            {/* conditionally display the error message if it exists */}
            {error &&
                <View style={styles.errorContainer}>
                    <Text style={styles.errorTitle}>Invalid data:</Text>
                    <Text style={styles.errorItem}>{error}</Text>
                </View>}

            <TextInput
                style={styles.textInput}
                value={description}
                placeholder="Enter a task description"
                multiline={true}
                onChangeText={(description) => setDescription(description)}
            />

            <View style={styles.switch}>
                {/* pressable wrapper for the label to trigger the switch on tap */}
                <Pressable onPress={() => setCompleted(!completed)}>
                    <Text style={styles.switchText}>Completed:</Text>
                </Pressable>
                <Switch
                    value={completed}
                    onValueChange={(completed) => setCompleted(completed)}
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