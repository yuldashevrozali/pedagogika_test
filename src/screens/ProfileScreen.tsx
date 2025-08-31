import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../store/AuthContext';


export default function ProfileScreen() {
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
const { user, logout, setPremium } = useAuth();

const handleUpgrade = async () => {
  // Click.uz to'lov sahifasiga yo'naltirish (demo URL)
  const url = 'https://click.uz/';
  try {
    await Linking.openURL(url);
    // Demo uchun: qaytgach premium ni true deb qo'yishingiz mumkin
    await setPremium(true);
  } catch (error) {
    Alert.alert('Xatolik', 'URL ochib bo\'lmadi');
  }
};


return (
<View style={{ flex: 1, padding: 16 }}>
<Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>Profil</Text>


{!user ? (
<>
<Text style={{ color: '#6b7280', marginBottom: 12 }}>Kirish qilmagansiz. Iltimos, avval ro'yxatdan o'ting yoki kiring.</Text>
<TouchableOpacity onPress={() => navigation.navigate('Signin', {})} style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 12 }}>
<Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Kirish</Text>
</TouchableOpacity>
<View style={{ height: 8 }} />
<TouchableOpacity onPress={() => navigation.navigate('Signup', undefined)} style={{ backgroundColor: '#10b981', padding: 14, borderRadius: 12 }}>
<Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Ro'yxatdan o'tish</Text>
</TouchableOpacity>
</>
) : (
<>
<View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 }}>
<Text style={{ fontSize: 18, fontWeight: '600' }}>{user.username}</Text>
<Text style={{ marginTop: 6, color: '#6b7280' }}>{user.email}</Text>
<Text style={{ marginTop: 6 }}>Holat: {user.premium ? 'Premium' : 'Oddiy'}</Text>
</View>


{!user.premium ? (
<TouchableOpacity onPress={handleUpgrade} style={{ backgroundColor: '#b7791f', padding: 14, borderRadius: 12, marginBottom: 8 }}>
<Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Upgrade (Click.uz)</Text>
</TouchableOpacity>
) : (
<View style={{ backgroundColor: '#fff7ed', borderRadius: 12, padding: 14, marginBottom: 8 }}>
<Text style={{ color: '#b7791f', fontWeight: '600', textAlign: 'center' }}>Premium faollashtirilgan ✅</Text>
</View>
)}


<TouchableOpacity onPress={logout} style={{ backgroundColor: '#ef4444', padding: 14, borderRadius: 12 }}>
<Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Chiqish</Text>
</TouchableOpacity>
</>
)}
</View>
);
}