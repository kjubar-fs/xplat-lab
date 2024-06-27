/*
 *  Author: Kaleb Jubar
 *  Created: 29 May 2024, 5:34:39 PM
 *  Last update: 31 May 2024, 5:41:17 PM
 *  Copyright (c) 2024 Kaleb Jubar
 */
import { Platform, StyleSheet } from "react-native";

import { primaryColor, secondaryColor } from "../../includes/variables";

export default StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 60 : 35,
        backgroundColor: primaryColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: secondaryColor,
    },

    logo: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 7,
    },

    title: {
        fontSize: 25,
        color: "white",
        paddingLeft: 10,
        fontWeight: "bold",
    },

    tagLine: {
        paddingRight: 10,
        color: secondaryColor,
    },
});