/*
 *  Author: Kaleb Jubar
 *  Created: 15 Jul 2024, 10:02:16 AM
 *  Last update: 
 *  Copyright (c) 2024 Kaleb Jubar
 */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");

module.exports = config;
