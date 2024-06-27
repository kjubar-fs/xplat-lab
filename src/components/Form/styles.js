/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:42:19 PM
 *  Last update: 3 Jun 2024, 3:15:28 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform, StyleSheet } from "react-native";

import { primaryColor } from "../../includes/variables";

export default StyleSheet.create({
    container: {
        backgroundColor: primaryColor,
        padding: 10,
    },

    errorContainer: {
        backgroundColor: "white",
        padding: 7,
        gap: 4,
        borderWidth: 1,
        borderColor: "red",
        borderLeftWidth: 7,
        marginBottom: 10,
    },

    errorTitle: {
        color: "red",
        fontWeight: "bold",
    },

    errorItem: {
        color: "red",
    },

    textInput: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 7,
    },

    switch: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
    },

    switchText: {
        color: "white",
        marginRight: Platform.OS === "ios" ? 10 : 4,
    },

    button: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowColor: "#444",
    },

    buttonText: {
        fontSize: 18,
        textAlign: "center",
    },
});