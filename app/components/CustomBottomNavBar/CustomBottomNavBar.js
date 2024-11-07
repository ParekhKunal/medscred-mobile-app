// components/CustomBottomNavBar/CustomBottomNavBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomBottomNavBar = ({
    onHomePress,
    onHospitalPress,
    onPatientPress,
    showAdminOptions,
    showSalesOptions,
}) => {
    return (
        <View style={styles.bottomNavBar}>
            {showAdminOptions && <>
                <TouchableOpacity onPress={onHomePress} style={styles.navItem}>
                    <Icon name="home" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onHospitalPress} style={styles.navItem}>
                    <Icon name="building" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onPatientPress} style={styles.navItem}>
                    <Icon name="user" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onHospitalPress} style={styles.navItem}>
                    <Icon name="bar-chart" size={24} color="#fff" />
                </TouchableOpacity>
            </>
            }

            {showSalesOptions && (
                <>
                    <TouchableOpacity onPress={onHomePress} style={styles.navItem}>
                        <Icon name="home" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onHospitalPress} style={styles.navItem}>
                        <Icon name="building" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPatientPress} style={styles.navItem}>
                        <Icon name="user" size={24} color="#fff" />
                    </TouchableOpacity>
                </>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    bottomNavBar: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#008aff',
        height: 60,
        borderRadius: 20,
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    navItem: {
        padding: 10,
    },
    navText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomBottomNavBar;
