/*
 *  Author: Kaleb Jubar
 *  Created: 1 Aug 2024, 11:00:40 AM
 *  Last update: 1 Aug 2024, 1:14:28 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        gap: 15,
    },

    error: {
        color: "#C00",
    },

    settingContainer: {
        flexDirection: "column",
        gap: 7,
    },

    settingName: {
        fontWeight: "bold",
        fontSize: 20,
    },

    settingDetail: {
        color: "#444",
    },

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Platform.OS === "ios" ? 10 : 5,
        marginTop: 10,
    },
});