import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function HospitalForm() {
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        permission_name: 'create_hospital',
        first_name: '',
        email: '',
        phone_number: '',
        account_type: [],
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        pin_code: '',
    });
    const [errors, setErrors] = useState({});
    const accountTypeOptions = ['Reimbursement', 'Cashless', 'Aesthetic'];

    const handleSelectAccountType = (value) => {
        setFormData((prev) => ({
            ...prev,
            account_type: prev.account_type.includes(value)
                ? prev.account_type.filter((type) => type !== value)
                : [...prev.account_type, value],
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) {
            newErrors.first_name = 'First Name is required';
        }
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const dataToSend = {
            ...formData,
            account_type: formData.account_type.join(','),
        };

        try {
            const response = await axios.post('https://api.medscred.com/api/v1/hospitals/create-hospital', dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            Alert.alert('Form Submitted Successfully!', 'Hospital data has been saved.');
            setFormData({
                first_name: '',
                email: '',
                phone_number: '',
                account_type: [],
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                pin_code: '',
            });
        } catch (error) {
            Alert.alert('Error', 'There was an issue submitting the form. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Hospital Onboarding Form</Text>
                    <View style={styles.formContainer}>
                        <InputField
                            label="First Name"
                            value={formData.first_name}
                            onChangeText={(text) => setFormData({ ...formData, first_name: text })}
                            error={errors.first_name}
                        />
                        <InputField
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            keyboardType="email-address"
                        />
                        <InputField
                            label="Phone Number"
                            value={formData.phone_number}
                            onChangeText={(text) => setFormData({ ...formData, phone_number: text })}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.label}>Account Type</Text>
                        <View style={styles.checkboxContainer}>
                            {accountTypeOptions.map((type, index) => (
                                <View key={index} style={styles.checkboxItem}>
                                    <Checkbox
                                        status={formData.account_type.includes(type) ? 'checked' : 'unchecked'}
                                        onPress={() => handleSelectAccountType(type)}
                                    />
                                    <Text style={styles.checkboxLabel}>{type}</Text>
                                </View>
                            ))}
                        </View>

                        <InputField
                            label="Address Line 1"
                            value={formData.address_line_1}
                            onChangeText={(text) => setFormData({ ...formData, address_line_1: text })}
                        />
                        <InputField
                            label="Address Line 2"
                            value={formData.address_line_2}
                            onChangeText={(text) => setFormData({ ...formData, address_line_2: text })}
                        />
                        <InputField
                            label="City"
                            value={formData.city}
                            onChangeText={(text) => setFormData({ ...formData, city: text })}
                        />
                        <InputField
                            label="State"
                            value={formData.state}
                            onChangeText={(text) => setFormData({ ...formData, state: text })}
                        />
                        <InputField
                            label="Pincode"
                            value={formData.pin_code}
                            onChangeText={(text) => setFormData({ ...formData, pin_code: text })}
                            keyboardType="numeric"
                        />

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.submitButton}
                            labelStyle={styles.submitButtonText}
                        >
                            Submit
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

function InputField({ label, value, onChangeText, keyboardType, error }) {
    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                placeholder={`Enter ${label}`}
                keyboardType={keyboardType || 'default'}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    inputGroup: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d1d5db',
        fontSize: 16,
        color: '#111827',
    },
    inputError: {
        borderColor: '#f87171',
    },
    label: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
    },
    checkboxContainer: {
        marginBottom: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#374151',
    },
    submitButton: {
        backgroundColor: '#4f46e5',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 20,
    },
    submitButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 12,
        color: '#f87171',
        marginTop: 4,
    },
});

export default HospitalForm;
