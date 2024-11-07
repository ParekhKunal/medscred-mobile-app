import React from 'react';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider to wrap app
import { Stack } from 'expo-router';  // Import Stack for screen management

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} ></Stack>
        </AuthProvider>
    );
}
