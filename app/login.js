import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);  // State for password visibility toggle
    const router = useRouter();
    // Handle login form submission
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please fill in both fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://4035-152-59-32-229.ngrok-free.app/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Login Failed', errorData.message || 'Invalid credentials');
                return;
            }

            const data = await response.json();

            if (data.status === 'OK') {
                login({ name: data.data.first_name, role: data.data.role }, data.accessToken);
                if (data.data.role == 1) {
                    router.replace('/dashboard');  // Navigate to admin dashboard
                } else if (data.data.role == 2) {
                    router.replace('/dashboard');  // Navigate to sales dashboard
                } else {
                    router.replace('/dashboard');  // Default user dashboard (adjust as needed)
                }
            } else {
                Alert.alert('Login Failed', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error("Login failed", error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo-blue.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Login to your Account!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.togglePasswordButton}
                    onPress={() => setShowPassword(prevState => !prevState)}
                >
                    <Text style={styles.togglePasswordText}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 220,
        height: 220,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
        textAlign: 'left'
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 15,
        paddingLeft: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 14,
    },
    passwordContainer: {
        position: 'relative',
    },
    togglePasswordButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    togglePasswordText: {
        fontSize: 14,
        color: '#008aff',
    },
    button: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#008aff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    footer: {
        width: '100%',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#000',
        marginVertical: 5,
    },
});
