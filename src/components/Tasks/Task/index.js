/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:51 PM
 *  Last update: 15 Jul 2024, 10:48:15 AM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import {
    View, Text, Switch, Pressable,
    TouchableHighlight, Modal, TouchableOpacity, Alert
} from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

import { setTaskCompleted, deleteTask } from "../../../data/state/taskSlice";

import styles from "./styles";
import { primaryColor } from "../../../includes/variables";

export default function Task({ id, description, completed }) {
    // modal state tracking
    const [showDetailModal, setShowDetailModal] = useState(false);

    // dispatch for state
    const dispatch = useDispatch();

    /**
     * Toggle the completed status of this task.
     */
    const toggleCompleted = () => {
        dispatch(setTaskCompleted({
            id,
            completed: !completed,
        }));
    };

    /**
     * Toggle whether the modal is shown
     */
    const toggleModal = () => {
        setShowDetailModal(!showDetailModal);
    };

    /**
     * Delete this task from the list
     */
    const deleteThisTask = () => {
        // show the user an alert to confirm if they want to delete
        Alert.alert("Delete Task?", "Are you sure you want to delete this task?", [
            {
                // no button does nothing
                text: "No",
                style: "cancel"
            },
            {
                // yes button deletes the task
                text: "Yes",
                onPress: () => {
                    dispatch(deleteTask(id));
                }
            }
        ]);
    };

    return (
        <>
            <Pressable style={styles.container} onPress={toggleModal}>
                <Text style={styles.title}>{description}</Text>
                <Text style={styles.info}>Completed? {completed ? "Yes" : "No"}</Text>
                <Text style={styles.info}>ID: {id}</Text>
            </Pressable>

            <Modal visible={showDetailModal} animationType="fade" transparent={true}>
                {/* make the container pressable so you can click outside the
                    modal to close it */}
                <Pressable style={styles.modalContainer} onPress={toggleModal}>
                    {/* this also needs to be a pressable so we can cancel
                        bubbling of events to the parent pressable
                        this makes the modal only close when clicking the overlay,
                        not the modal itself */}
                    <Pressable style={styles.modal} onPress={(e) => e.preventDefault}>
                        <Text style={styles.title}>{description}</Text>
                        
                        <View style={styles.actions}>
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

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={deleteThisTask}
                            >
                                <MaterialIcons name="delete-outline" size={24} color="white" />
                                <Text style={styles.deleteButton.text}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                        {/* close button, placed using position: absolute */}
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={toggleModal}
                            underlayColor="#CCC"
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableHighlight>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}