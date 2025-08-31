import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Selection: React.FC = () => {
    const navigateToCustomerLogin = () => {
        router.push('/(client)/login');
    };

    const navigateToAdminLogin = () => {
        router.push('/(administrator)/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center items-center px-6">

                    {/* Logo da Clínica */}
                    <View className="mb-12 items-center mt-12">
                        <Image 
                            source={require('../assets/images/logo.png')}
                            className="w-80 h-64"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-xl font-semibold text-gray-800 mb-8 text-center">
                        Como você deseja acessar?
                    </Text>

                    {/* Botões de seleção */}
                    <View className="w-full max-w-xs space-y-4">
                        {/* Botão Cliente */}
                        <TouchableOpacity
                            onPress={navigateToCustomerLogin}
                            className="bg-blue-500 px-8 py-4 rounded-xl shadow-lg active:bg-blue-600 mb-4"
                        >
                            <View className="items-center">
                                <Text className="text-white text-lg font-semibold mb-1">
                                    CLIENTE
                                </Text>
                                <Text className="text-blue-100 text-sm">
                                    Acesso para pacientes
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Botão Administrador */}
                        <TouchableOpacity
                            onPress={navigateToAdminLogin}
                            className="bg-gray-600 px-8 py-4 rounded-xl shadow-lg active:bg-gray-700"
                        >
                            <View className="items-center">
                                <Text className="text-white text-lg font-semibold mb-1">
                                    ADMINISTRADOR
                                </Text>
                                <Text className="text-gray-200 text-sm">
                                    Acesso para funcionários
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-56">
                        <Text className="text-gray-400 text-sm text-center">
                            © 2025 BM Espaço Saúde - Todos os direitos reservados
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Selection;
