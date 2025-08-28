import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-red-500 items-center justify-center">
      <Text className="text-4xl font-bold text-white mb-4">
        TESTE NativeWind
      </Text>
      <View className="bg-blue-600 p-6 rounded-lg">
        <Text className="text-yellow-300 text-xl font-semibold">
          Se você vê cores, está funcionando!
        </Text>
      </View>
    </View>
  );
}