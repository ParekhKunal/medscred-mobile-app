import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Platform, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ionicons for icons
import { useNavigation } from '@react-navigation/native'; // For navigation

import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, token, logout } = useAuth();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleLogout = () => {
        setIsModalVisible(false);
        // Add your logout logic here
        logout();
        console.log("Logout pressed");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleModal} style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={28} color="#000" />
                </TouchableOpacity>

                {/* Dropdown Modal */}
                {isModalVisible && (
                    <Modal transparent={true} animationType="fade" visible={isModalVisible}>
                        <Pressable style={styles.overlay} onPress={toggleModal}>
                            <View style={styles.dropdown}>
                                <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                                    <Text style={styles.dropdownText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </Modal>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 20,
        marginTop: 20,
    },
    iconButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: 'white',
        width: 150,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 5,
        position: 'absolute',
        right: 10,
        top: Platform.OS === 'ios' ? 70 : 90, // Adjust for platform differences
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
});
