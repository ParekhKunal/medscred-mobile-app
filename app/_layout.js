import React from 'react';
import { View } from 'react-native';
import { useRouter, Stack, Slot } from 'expo-router';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider to wrap app

export default function RootLayout() {


    return (
        <AuthProvider>
            {/* <Stack screenOptions={{ headerShown: false }} ></Stack> */}
            <Slot />
        </AuthProvider>
    );
}
