import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from "../../context/AuthContext"; // Importing AuthContext
import { useRouter } from "expo-router";

export default function SalesDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== 2) {
            router.replace("/login"); // Redirect if not sales
        }
    }, [user, router]); // Only run when user changes

    if (user?.role !== 2) {
        return null; // Render nothing if the user is not a sales user
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sales Dashboard</Text>
        </View>
    );
}
