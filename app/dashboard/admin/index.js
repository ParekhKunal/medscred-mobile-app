import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Import Auth context
import { useRouter } from 'expo-router'; // Import router to handle redirects

export default function AdminDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== 1) {
            router.replace('/login');  // Redirect to login if not an admin
        }
    }, [user, router]);

    if (user?.role !== 1) {
        return null;  // Do not render if the user is not an admin
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Admin Dashboard</Text>
        </View>
    );
}
