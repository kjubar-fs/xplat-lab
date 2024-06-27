/*
 *  Author: Kaleb Jubar
 *  Created: 31 May 2024, 2:46:04 PM
 *  Last update: 31 May 2024, 2:52:52 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform, StyleSheet } from "react-native";
import { secondaryColor } from "../../includes/variables";

export default StyleSheet.create({
    container: {
        backgroundColor: secondaryColor,
        paddingTop: 5,
        paddingBottom: Platform.OS === "ios" ? 30 : 10,
    },

    text: {
        textAlign: "center",
        color: "white",
    },
});