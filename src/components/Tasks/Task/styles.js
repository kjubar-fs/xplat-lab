/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 6:33:29 PM
 *  Last update: 3 Jul 2024, 2:42:04 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform, StyleSheet } from "react-native";

import { secondaryColor } from "../../../includes/variables";

const iOSSwitchTransform = [
    {
        scaleX: 0.8,
    },
    {
        scaleY: 0.8,
    },
];

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        gap: 4,
        borderRadius: 10,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowColor: "#444",
    },

    closeButton: {
        position: "absolute",
        top: 7,
        right: 7,
        borderRadius: 5,
    },

    title: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 5,
        marginRight: 20,
    },
    
    switch: {
        flexDirection: "row",
        alignItems: "center",
    },

    switchText: {
        marginRight: 4,
    },

    switchSizing: {
        transform: Platform.OS === "ios" ? iOSSwitchTransform : "",
    },

    info: {
        color: secondaryColor,
        opacity: 0.7,
        fontSize: 12,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    deleteButton: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginVertical: 4,
        paddingRight: 7,
        borderRadius: 5,
        gap: 5,

        text: {
            color: "white",
        },
    },

    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    },

    modal: {
        backgroundColor: "white",
        padding: 10,
        width: "70%",
        borderRadius: 10,

        // Android
        elevation: 5,

        // iOS
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowColor: "#000", // also applies to Android
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
});