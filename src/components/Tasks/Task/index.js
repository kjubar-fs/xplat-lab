/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:26:51 PM
 *  Last update: 3 Jul 2024, 2:35:08 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import {
    View, Text, Switch, Pressable,
    TouchableHighlight, Modal, TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from "./styles";
import { primaryColor } from "../../../includes/variables";
import { useState } from "react";

export default function Task({ id, description, completed, setCompleted, deleteTask }) {
    const [showDetailModal, setShowDetailModal] = useState(false);

    /**
     * Toggle the completed status of this task.
     */
    const toggleCompleted = () => {
        setCompleted(id, !completed);
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
        deleteTask(id);
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