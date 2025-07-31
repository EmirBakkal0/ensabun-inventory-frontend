import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
export default function MainMenuButton(props) {
  const { label, href, color } = props;
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(href)} className={`rounded-lg ${color} py-8 px-4 h-24 justify-center`}>
      <Text className="text-center text-xl font-semibold text-white">{label}</Text>
    </Pressable>
  );
}
