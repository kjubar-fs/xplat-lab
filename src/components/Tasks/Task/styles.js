/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 6:33:29 PM
 *  Last update: 3 Jun 2024, 6:34:31 PM
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
});